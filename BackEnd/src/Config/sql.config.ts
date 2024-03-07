import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const sqlConfig = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "37853801",
  database: process.env.DB_NAME || "Shopit",
  server: process.env.DB_SERVER || "DESKTOP-QO3AGRF",

  SECRET: "IUTR87GMHXLYNR",

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let connect = async () => {
  let pool = await mssql.connect(sqlConfig);

  if (pool.connected) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
};

connect();
