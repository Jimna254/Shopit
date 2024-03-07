import bcrypt from "bcrypt";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { Request, request, response } from "express";
import { loginUser } from "../auth.Controller";

describe("Login Test  case", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

//   it("successfully registers a user", async () => {
//     let expectedUser = {
//       user_id: "62df57e4-f2d7-4ddd-898c-022f91582113",
//       name: "James Kariuki",
//       email: "jamesew2605@gmail.com",
//       phone_number: "0798678330",
//       Password: "$2b$05$BB8VD5zI2iqrXjOVBeonG.pD4y7r0rCc10tVmDkxFL05bHxjXgx6i",
//     };

//     const req = {
//       body: {
//         email: expectedUser.email,
//         password: expectedUser.Password,
//       },
//     };

//     jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] }),
//     } as never);

//     jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true as never);

//     await loginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({
//       message: "Logged in successfully",
//       token: "generated-token-gyegdsbiuedjsx-dwecbhsbdjs",
//     });
//   });
// });


//   it("should handle user not found", async () => {
//     // Mock your database pool and result here (if needed)
//     // ...

//     // Simulate no user found
//     const userNotFoundResult = null;
//     jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       execute: jest.fn().mockResolvedValueOnce({ recordset: userNotFoundResult }),
//     }as never);

//       await loginUser(request as Request, response)

//         expect(response.json).toHaveBeenCalledWith({
//             "error": "User not found"
//         }) 
//     })

//   it("Handles incorrect password scenario", async()=>{
//         const req={
//             body:{
//                 email: 'correct@gmail.com',
//                 password: 'wrongPassword'
//             }
//         }

//         jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
//             request: jest.fn().mockReturnThis(),
//             input: jest.fn().mockReturnThis(),
//             execute: jest.fn().mockResolvedValueOnce({recordset: [
//                 {
//                     email: 'correct@gmail.com', 
//                     password: 'hashedpwd-38698bf-fdnbnfdbnbdiiiyifds'
//                 }
//             ]})
//         } as never)

//         jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

//         await loginUser(req as Request, response)

//         expect(response.json).toHaveBeenCalledWith({
//             "error": "Incorrect password"
//         }) 

    })


  // it("should handle internal server error", async () => {
  //   // Mock your database pool and result here (if needed)
  //   // ...

  //   // Simulate an error during execution
  //   const mockError = new Error("Database error");
  //   await loginUser({ body: {} }, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  // });

