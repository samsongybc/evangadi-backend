const { Pool } = require("pg");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// SUPER DEBUG - Log everything
console.log("🔍 ALL ENV VARS:", Object.keys(process.env).sort());
console.log("🔍 DATABASE_URL exists?", "DATABASE_URL" in process.env);
console.log(
  "🔍 DATABASE_URL value?",
  process.env.DATABASE_URL ? "HAS VALUE" : "UNDEFINED"
);
console.log("🔍 DATABASE_URL length:", process.env.DATABASE_URL?.length);

// Also check individual vars
console.log("🔍 Individual vars:", {
  DB_HOST: process.env.DB_HOST || "MISSING",
  DB_USER: process.env.DB_USER || "MISSING",
  DB_PASSWORD: process.env.DB_PASSWORD ? "EXISTS" : "MISSING",
  DB_NAME: process.env.DB_NAME || "MISSING",
  DB_PORT: process.env.DB_PORT || "MISSING",
});

const dbConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432,
      ssl: { rejectUnauthorized: false },
    };

console.log(
  "🔍 Using config type:",
  process.env.DATABASE_URL ? "CONNECTION_STRING" : "INDIVIDUAL_VARS"
);

const dbconnection = new Pool(dbConfig);

dbconnection.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database!");
});

dbconnection.on("error", (err) => {
  console.error("❌ Database error:", err.message);
  console.error("Full error:", err);
});

module.exports = dbconnection;
