const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(9002, () => console.log("Testing on PORT 9002"));
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

describe("POST /items/create", () => {
    it("should create a new item", async () => {
        const res = await request(app)
            .post("/items/create")
            .send({ name: "New Item", price: 10, description: "Test item" });
        expect(res.status).toBe(201);
        expect(res.body.createdItem.name).toBe("New Item");
        expect(res.body.createdItem.price).toBe(10);
        expect(res.body.createdItem.description).toBe("Test item");
        const item = await Item.findOne({ name: "New Item" });
        expect(item).toBeTruthy();
    });
});

describe("GET /items/:id", () => {
    it("should return a specific item", async () => {
        const createdItem = await Item.create({
            name: "Test Item3",
            price: 20,
            description: "Test item3",
        });
        const res = await request(app).get(`/items/${createdItem._id}`);
        expect(res.status).toBe(200);
        expect(res.body.item.name).toBe("Test Item3");
        expect(res.body.item.price).toBe(20);
        expect(res.body.item.description).toBe("Test item3");
    });
});

describe("GET /items", () => {
    it("should return all items", async () => {
        const response = await request(app).get("/items");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("we in Neo");
    });
});

describe("DELETE /items/:id", () => {
    it("should delete a specific item", async () => {
        const createdItem = await Item.create({
            name: "Test Item4",
            price: 20,
            description: "Test item4",
        });
        const res = await request(app).delete(`/items/${createdItem._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Item deleted successfully");
        const item = await Item.findOne({ name: "Test Item4" });
        expect(item).toBeFalsy();
    });
});

describe("POST /items/:id/favorite", () => {
    it("should favorite/unfavorite an item for a user", async () => {
        const createdItem = await Item.create({
            name: "Test Item5",
            price: 20,
            description: "Test item5",
        });
        const user = new User({
            name: "bao",
            email: "bao",
            password: "bao",
        });
        await user.save();
        const token = await user.generateAuthToken();
        const res = await request(app)
            .put(`/items/${createdItem._id}/favorite`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(
            "Item favorited/unfavorited successfully"
        );
        const updatedUser = await User.findOne({ _id: user._id });
        expect(updatedUser.favorites.length).toBe(1);
    });
});
