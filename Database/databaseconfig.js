const { Pool } = require("pg");

// Only load dotenv in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Use DATABASE_URL if available, otherwise use individual variables
const dbConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    };

console.log("🔍 Using DATABASE_URL:", !!process.env.DATABASE_URL);

const dbconnection = new Pool(dbConfig);

dbconnection.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database!");
});

dbconnection.on("error", (err) => {
  console.error("❌ Database connection error:", err.message);
});

module.exports = dbconnection;
