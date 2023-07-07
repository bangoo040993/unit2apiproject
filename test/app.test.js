const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(9001, () => console.log("Testing on PORT 9001"));
const User = require("../models/userModel");
const Item = require("../models/itemModel");
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.close();
    mongoServer.stop();
    server.close();
});

describe("Http request for /users", () => {
    test("it should create a new user", async () => {
        const user = {
            name: "McAfee",
            email: "iDidNotKMS@gmail.com",
            password: "sameforepstein",
        };
        const response = await request(app).post("/users").send(user);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User created successfully");
        const createdUser = await User.findOne({ email: user.email });
        expect(createdUser).toBeDefined();
        expect(createdUser.name).toBe(user.name);
        expect(createdUser.email).toBe(user.email);
        expect(createdUser.password).not.toBe(user.password);
    });
});
test("it should get a user by id", async () => {
    const user = new User({
        name: "McAfee",
        email: "iDidNotKMS1@gmail.com",
        password: "sameforepstein",
    });
    await user.save();
    const response = await request(app).get(`/users/${user._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User retrieved successfully");
    expect(response.body.user.name).toBe("McAfee");
    expect(response.body.user.email).toBe("iDidNotKMS1@gmail.com");
});

test("it should return all users", async () => {
    const response = await request(app).get("/users");
    console.log(response.body);
    expect(response.body.message).toBe("we in Neo");
});

test("it should return a token if login is successful", async () => {
    const response = await request(app).post("/users/login").send({
        email: "iDidNotKMS1@gmail.com",
        password: "sameforepstein",
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
});

test("It should delete a user", async () => {
    const user = new User({
        name: "bao",
        email: "bao",
        password: "bao",
    });
    await user.save();
    const token = await user.generateAuthToken();
    const response = await request(app)
        .delete(`/users/${user._id}`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
});

test("It should log out a user", async () => {
    const user = new User({
        name: "gun",
        email: "AkGun@gmail.com",
        password: "baoisawesome",
    });
    await user.save();
    const token = await user.generateAuthToken();
    const response = await request(app)
        .post("/users/logout")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Logout successful");
});

test("It should update a user", async () => {
    const user = new User({
        name: "gun",
        email: "AkGun1@gmail.com",
        password: "baoisawesome",
    });
    await user.save();
    const token = await user.generateAuthToken();
    const updatedUser = {
        name: "updatedName",
        email: "updatedEmail@gmail.com",
        password: "updatedPassword",
    };
    const response = await request(app)
        .put(`/users/${user._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.updatingUser.name).toBe(updatedUser.name);
    expect(response.body.updatingUser.email).toBe(updatedUser.email);
});
