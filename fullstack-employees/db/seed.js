import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

const dropTables = `
  DROP TABLE IF EXISTS employees;
`;

const createTables = `
  CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  );
`;

async function seedEmployees() {
  try {
    console.log("Dropping and creating tables...");
    await db.query(dropTables);
    await db.query(createTables);
    console.log("Tables created successfully.");

    console.log("Seeding employees data...");
    for (const employee of seedData) {
      await db.query(
        `
        INSERT INTO employees (first_name, last_name, email)
        VALUES ($1, $2, $3);
      `,
        [employee.first_name, employee.last_name, employee.email]
      );
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

(async () => {
  try {
    console.log("Connecting to the database...");
    await db.connect();

    // Call the seeding function.
    await seedEmployees();

    console.log("Closing database connection...");
    await db.end();
  } catch (error) {
    console.error("Error during database operation:", error);
    if (db) {
      await db.end();
    }
  }
})();

export default seedEmployees;
