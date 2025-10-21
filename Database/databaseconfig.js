const { Pool } = require("pg");

// Only load dotenv in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// DEBUG: Log what we're trying to connect with
console.log("🔍 Database Config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "***" : "MISSING",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

const dbconnection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

dbconnection.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database!");
});

dbconnection.on("error", (err) => {
  console.error("❌ Database connection error:", err.message);
  console.error("Full error:", err);
});

module.exports = dbconnection;
