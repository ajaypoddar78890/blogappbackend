const { registerController } = require("../Controller/UserController");
const userModel = require("../Models/UserModel"); // Import userModel (assuming it's properly exported)

// Mock the userModel
jest.mock("../Models/UserModel");

describe("registerController", () => {
  it("should send a success response when user is registered", async () => {
    // Create a mock request object with sample data
    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "secretpassword",
        phone: "1234567890",
      },
    };

    // Create a mock response object with Jest spy functions
    const res = {
      status: jest.fn(() => res), // Chainable status function
      send: jest.fn(),
    };

    // Mock the behavior of userModel.findOne to simulate a new user
    userModel.findOne.mockResolvedValue(null); // User does not exist

    // Mock the userModel constructor to simulate user creation
    const mockSave = jest.fn();
    userModel.mockImplementation(() => ({
      save: mockSave.mockResolvedValue({ _id: "user123", ...req.body }),
    }));

    // Call the registerController function
    await registerController(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(mockSave).toHaveBeenCalledWith();

    // Expect a 201 status code
    expect(res.status).toHaveBeenCalledWith(201);

    // Expect a success response
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: "User Register Successfully",
      user: expect.objectContaining({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }),
    });
  });

  it("should send a 200 response when user already exists", async () => {
    // Create a mock request object with sample data
    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "secretpassword",
        phone: "1234567890",
      },
    };

    // Create a mock response object with Jest spy functions
    const res = {
      status: jest.fn(() => res), // Chainable status function
      send: jest.fn(),
    };

    // Mock the behavior of userModel.findOne to simulate an existing user
    userModel.findOne.mockResolvedValue({ _id: "user123", ...req.body });

    // Call the registerController function
    await registerController(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });

    // Expect a 200 status code
    expect(res.status).toHaveBeenCalledWith(200);

    // Expect a response indicating that the user already exists
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "already register !! please login",
    });
  });

  it("should send a 500 response on error", async () => {
    // Create a mock request object with sample data
    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "secretpassword",
        phone: "1234567890",
      },
    };

    // Create a mock response object with Jest spy functions
    const res = {
      status: jest.fn(() => res), // Chainable status function
      send: jest.fn(),
    };

    // Mock the behavior of userModel.findOne to simulate an error
    userModel.findOne.mockRejectedValue(new Error("Database error"));

    // Call the registerController function
    await registerController(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });

    // Expect a 500 status code
    expect(res.status).toHaveBeenCalledWith(500);

    // Expect an error response
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Errro in Registeration", // Note the typo in "Errro"
    });
  });
});
