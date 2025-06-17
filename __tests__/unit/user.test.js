const CreateUserUseCase = require("../../src/application/usecases/createUser.usecase");
const UserController = require("../../src/interfaces/controllers/user.controller");
const UserRepository = require("../../src/infrastructure/repositories/user.repository");

// Mocks
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const validRequest = {
  body: {
    name: "Test User",
    email: "test@example.com",
    password: "plaintext_password",
  },
};

describe("UserController - createUser", () => {
  let userRepository;
  let createUserUseCase;
  let userController;

  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks();

    userRepository = new UserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    userController = new UserController(createUserUseCase);

    // Stub repository methods
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null); // Giả sử user chưa tồn tại

    jest
      .spyOn(userRepository, "create")
      .mockImplementation(async (userEntity) => ({
        id: "123",
        name: userEntity.name,
        email: userEntity.email,
        createdAt: "2023-01-01",
        password: "hashed_password", // Không nên xuất hiện trong response
      }));
  });

  it("should return 200 and not expose password in response", async () => {
    await userController.createUser(validRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();

    const responseData = mockResponse.json.mock.calls[0][0];
    expect(responseData).toHaveProperty("message", "User created successfully");
    expect(responseData).toHaveProperty("metadata");

    const metadata = responseData.metadata;

    expect(metadata).toMatchObject({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      createdAt: "2023-01-01",
    });

  });
});
