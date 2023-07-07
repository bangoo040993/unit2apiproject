const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(9000, () => console.log("Testing on PORT 9000"));
const User = require("../models/userModel");
const Item = require("../models/itemModel");
const Cart = require("../models/cartOfUserModel");
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

describe("Http request for /carts", () => {
    test("it should create a cart", async () => {
        const user = new User({
            name: "test1",
            email: "test1",
            password: "test1",
        });
        await user.save();
        const item1 = await Item.create({
            name: "test1",
            price: 1,
            description: "1",
        });
        await item1.save();
        const cart = await Cart.create({
            user: `${user._id}`,
            items: `${item1._id}`,
        });
        console.log(cart);
    });
});
describe("Test the all carts endpoint", () => {
    test("It should create and show the cart", async () => {
        const user = new User({
            name: "test2",
            email: "test2",
            password: "test2",
        });
        await user.save();
        const token = await user.generateAuthToken();
        const itemOne = await Item.create({
            name: "test2",
            price: 2,
            description: "2",
        });
        await itemOne.save();
        const cart = await Cart.create({
            user: `${user._id}`,
            items: `${itemOne._id}`,
        });
        await user.save();
        await cart.save();
        const response = await request(app)
            .get(`/carts/${cart._id}`)
            .set(`Authorization`, `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Cart retrieved successfully");
    });
});
test("It should add and remove an item. and deletes", async () => {
    const user = new User({ name: "test3", email: "test3", password: "test3" });
    await user.save();
    const token = await user.generateAuthToken();
    const item1 = await Item.create({ name: "3", price: 3, description: "3" });
    await item1.save();
    const item2 = await Item.create({ name: "4", price: 4, description: "4" });
    await item2.save();
    const cart = await Cart.create({
        user: `${user._id}`,
        items: `${item1._id}`,
    });

    await user.save();
    await cart.save();
    const response = await request(app)
        .put(`/carts/${cart._id}/edit`)
        .set(`Authorization`, `Bearer ${token}`)
        .send({ item: `${item2._id}` });
    await cart.save();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Item added to cart successfully");
    const response2 = await request(app)
        .put(`/carts/${cart._id}/remove`)
        .set(`Authorization`, `Bearer ${token}`)
        .send({ item: `${item2._id}` });
    await cart.save();
    expect(response2.statusCode).toBe(200);
    expect(response2.body.message).toBe("Item remove from cart successfully");

    const response3 = await request(app)
        .delete(`/carts/${cart._id}/delete`)
        .set(`Authorization`, `Bearer ${token}`);
    expect(response3.statusCode).toBe(200);
    expect(response3.body.message).toBe("Cart deleted successfully");
});
