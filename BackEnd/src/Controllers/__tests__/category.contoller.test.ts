// import { createCategory } from "../category.Controller"; // Replace with your controller path
// import { Request, Response } from "express";
// import supertest from "supertest";
// import { v4 } from "uuid"; // Used for generating IDs

// // Assuming you have a separate database setup for testing purposes
// // Replace with your actual database connection and configuration logic
// // const sqlConfig = {
// //   // ... your database configuration details ...
// // };

// describe("createCategory", () => {
//   let app: any; // Your Express application instance

//   beforeEach(async () => {
//     // Create a new Express app for each test
//     app = require("./your-app-file"); // Replace with your app entry point

//     // Clear any existing data from the database before each test (optional)
//     // ... your database clearing logic ...
//   });

//   afterEach(async () => {
//     // Close the database connection after each test (optional)
//     // ... your database connection close logic ...
//   });

//   it("should successfully create a new category", async () => {
//     const mockRequest: Request = {
//       body: {
//         categoryname: "New Category",
//         image: "images/new-category.jpg",
//       },
//     };
//     const mockResponse: Response = {}; // We don't need to mock the response for this test

//     const id = v4(); // Generate a random ID for the category
//     mockRequest.body.category_id = id; // Add the ID to the request body

//     const response = await supertest(app)
//       .post("/api/create-category")
//       .send(mockRequest);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       message: "New Category was added succesfully.",
//     });

//     // Additional assertions to verify if the category was actually created in the database
//     // ... your logic to check the database for the created category ...
//   });

//   it("should return an error if the category already exists", async () => {
//     const mockRequest: Request = {
//       body: {
//         categoryname: "Existing Category", // Same name as in the database (replace with actual existing category)
//         image: "images/existing.jpg",
//       },
//     };
//     const mockResponse: Response = {}; // We don't need to mock the response for this test

//     const id = v4(); // Generate a random ID for the category
//     mockRequest.body.category_id = id; // Add the ID to the request body

//     const response = await supertest(app)
//       .post("/api/create-category")
//       .send(mockRequest);

//     expect(response.status).toBe(201); // Assuming your API returns 201 even for existing categories
//     expect(response.body).toEqual({
//       messageerror: "This Category Name already Exist",
//     });
//   });

//   // Add a test for handling database errors (if applicable)
//   it("should handle errors during database operations", async () => {
//     // Modify your application code to intentionally cause a database error (e.g., by modifying connection details)
//     // Run the test and observe the expected behavior (e.g., logging errors, returning appropriate responses)
//     // ... adjust your test based on the expected error handling behavior ...
//   });
// });
