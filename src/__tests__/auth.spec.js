import { registerUser } from "../controllers/auth.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js"; 
import { registerUserValidator } from "../validators/auth.js";

jest.mock("../models/User");
jest.mock("bcrypt");
jest.mock("../validators/auth");

describe("registerUser controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Mock validation result
    registerUserValidator.validate.mockReturnValue({
      error: null,
      value: req.body,
    });
  });

  it("should register a new user successfully", async () => {
    // Mock user not existing
    UserModel.findOne.mockResolvedValue(null);

    // Mock bcrypt hash
    bcrypt.hashSync.mockReturnValue("hashedPassword");

    // Mock user creation
    UserModel.create.mockResolvedValue({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
    });

    await registerUser(req, res, next);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [{ name: "John Doe" }, { email: "john@example.com" }],
    });

    expect(UserModel.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with validation error if validation fails", async () => {
    registerUserValidator.validate.mockReturnValue({
      error: { details: ["Invalid data"] },
      value: null,
    });

    await registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      status: 400,
      message: "Validation failed",
      details: ["Invalid data"],
    });

    expect(res.status).not.toHaveBeenCalled();
  });

  it("should call next if user already exists", async () => {
    UserModel.findOne.mockResolvedValue({ email: "john@example.com" });

    await registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      status: 400,
      message: "Email already in use. Please log in or use a different email.",
    });

    expect(UserModel.create).not.toHaveBeenCalled();
  });

  it("should call next with error on unexpected failure", async () => {
    const error = new Error("DB error");
    UserModel.findOne.mockRejectedValue(error);

    await registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
