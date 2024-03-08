import mssql from "mssql";
import bcrypt from "bcrypt";
import {
  registerUser,
  getOneUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../user.Controller";
import Connection from "../../DBHelper/dbhelper";
jest.mock("../../DbHelper/dbhelper");

//test for createUser

describe("Account created successfully", () => {
  let res: any;

  beforeEach(() => {
    res = {
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("successfully registers a user", async () => {
    const req = {
      body: {
        Fname: "admin",
        Lname: "admin",
        email: "admin@yopmail.com",
        phone_number: "0787543219",
        password: "admin",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPwdkjshghgksjgkj" as never);

    const mockedInput = jest.fn().mockReturnThis(); //makes it chainable

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Account was created successfully.",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

});

//test for getAllUsers

describe("Get all users", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Gets all users", async () => {
    let expectedUser = {
      users: [
        {
          user_id: "47e0ebef-877d-4094-b500-af340654ecc8",
          Fname: "Kenny",
          Lname: "Maina",
          email: "kennynet66@gmail.com",
          role: "user",
          phone_number: "0700909090",
          password:
            "$2b$05$CuOaURVuIAad5uyYB.VhyOYMs9UyrvMrq0jeMs9R0piU27f3tUCuq",
          created_at: "2024-03-05T00:00:00.000Z",
          isdeleted: false,
          isWelcomed: false,
        },
      ],
    };

    const req = {};

          (Connection.execute as jest.Mock).mockResolvedValueOnce({
            recordset: expectedUser.users
          })

    await getUsers(req as any, res);

    expect(res.json).toHaveBeenCalledWith(expectedUser);
  });
});

//test for getUser

describe("Gets a single user", () =>{
  let res: any;
  let user: any

  beforeEach(()=>{
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      user = {
        user: [
          {
            id: "353545-43495835-458347575",
            Fname: "Amanda",
            Lname: "Chepkoech",
            email: "amanda@gmail.com",
            phone_number: "071738438",
            password: "test12345",
          },
        ],
      };
  })

    it("gets a single user", async()=>{

      const req={
        params:{
          id:'353545-43495835-458347575'
        }
      };
      (Connection.execute as jest.Mock).mockResolvedValueOnce({
        recordset: user.user
      })

      await getOneUser(req as any, res)

      expect(res.json).toHaveBeenCalledWith({user: user.user})
    })
  })


//DELETE USER

 describe("delete user", () =>{
  let res: any;
  let user: any

  beforeEach(()=>{
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

  })

    it("delete a user", async()=>{

      const req={
        params:{
          id:'353545-43495835-458347575'
        }
      };
      (Connection.execute as jest.Mock).mockResolvedValueOnce({
        // recordset: user
      })

      await deleteUser(req as any, res)

      expect(res.json).toHaveBeenCalledWith({
        message: "User Deleted Successfully",
      });
    })
  })

//UPDATES USER

 describe("delete user", () => {
   let res: any;
   let user: any;

   beforeEach(() => {
     res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn().mockReturnThis(),
     };
      user = {
        user: [
          {
            id: "353545-43495835-458347575",
            Fname: "Amanda",
            Lname: "Chepkoech",
            email: "amanda@gmail.com",
            phone_number: "071738438",
          },
        ],
      };
   });

   it("updates a user", async () => {
     const req = {
       params: {
         id: "353545-43495835-458347575",
       },
       body: {
         Fname:"john",
         Lname: "doe",
         email:"johndoe@gmail.com",
         phone_number:"12345678",
       },
     };
     (Connection.execute as jest.Mock).mockResolvedValueOnce({
     });

     await updateUser(req as any, res);

     expect(res.json).toHaveBeenCalledWith({
       message: "User updated successfully",
     });
   });
 });