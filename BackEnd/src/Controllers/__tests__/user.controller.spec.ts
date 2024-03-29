import mssql from "mssql";
import {
  registerUser,
  getOneUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../user.Controller";

//test for createUser

describe("Account created successfully", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Account created successfuly", async () => {
    const req = {
      body: {
        Fname: "Sharon",
        Lname: "Cherotich",
        email: "sharon@gmail.com",
        phone_number: "0716013980",
        password: "test12345",
      },
    };
    
    const mockedInput = jest.fn().mockReturnThis;

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
      message: "Sharon Account was created successfully",
      
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// test for getAllUsers

describe('Get all categories', () => {
    let res: any;
    
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
    })
    
    it('Gets all users', async () => {
      
      const req = {}
      const mockedExecute = jest.fn().mockResolvedValue({recordSet: [1]})
      
      const mockedRequest = {
        execute: jest.fn().mockReturnValue(mockedExecute)
      }
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      }
      
      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
      
      await getUsers(req as any, res)
      
      // expect(res.json).toHaveBeenCalledWith({success: "No Users"})
      expect(res.status).toHaveBeenCalledWith(200)
      
    })
   
})

// test for getUser

describe("Gets a single user", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      params: {
        id: "353545-43495835-458347575",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("Successful fetch one user", async () => {
    const mockedResult = [
      {
        id: "353545-43495835-458347575",
        Fname: "Amanda",
        Lname: "Chepkoech",
        email: "amanda@gmail.com",
        phone_number: "071738438",
        password: "test12345",
      },
    ];
    // console.log("This is working here", +mockedResult)
    
    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest
      .fn()
      .mockResolvedValue({ recordset: mockedResult[0] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await getOneUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith(mockedResult);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// test for deleteUser

// test for updateUser
