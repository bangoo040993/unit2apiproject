const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => console.log("Testing on PORT 8080"));
const User = require("../models/userModel");
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
describe("POST /users", () => {
    it("should create a new user", async () => {
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

describe("GET /users/:id", () => {
    it("should get a user by id", async () => {
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
});

describe("GET /users", () => {
    it("should return all users", async () => {
        const response = await request(app).get("/users");
        console.log(response.body);
        expect(response.body.message).toBe("we in Neo");
    });
});


describe('POST /users/login', () => {
    it('should return a token if login is successful', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({
            email: "iDidNotKMS1@gmail.com",
            password: "sameforepstein",
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    })
})