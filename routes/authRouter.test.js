import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import { deleteAllUsers, saveUser } from "../services/authServices.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/users/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await deleteAllUsers();
  });

  test("should return status 200, a token, and a user object with email and subscription fields", async () => {
    const signupData = {
      email: "test@gmail.com",
      password: "123456",
    };

    await saveUser(signupData);

    const loginData = {
      email: signupData.email,
      password: signupData.password,
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(loginData.email);
    expect(body.user.subscription).toBe("starter");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
