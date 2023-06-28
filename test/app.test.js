const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/userModel')

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

afterAll(async ()=>{
  await mongoose.connection.close() // programmatic ctrl+c
  mongoServer.stop() //getting rid of our MongoDB instance itself
  server.close()
})
describe('POST /users', () => {
    it('should create a new user', async () => {
        const user = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123'
        };
    
        const response = await request(app)
          .post('/users')
          .send(user);
    
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    
        const createdUser = await User.findOne({ email: user.email });
        expect(createdUser).toBeDefined();
        expect(createdUser.name).toBe(user.name);
        expect(createdUser.email).toBe(user.email);
        expect(createdUser.password).not.toBe(user.password);
      });
    })
    //   it('should return an error if required fields are missing', async () => {
    //     const user = {
    //       email: 'johndoe@example.com',
    //       password: 'password123'
    //     };
    
    //     const response = await request(app)
    //       .post('/users')
    //       .send(user);
    
    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe('User validation failed: name: Path `name` is required');
    //   });
    // });