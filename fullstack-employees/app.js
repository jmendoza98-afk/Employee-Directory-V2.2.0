import express from "express";
const app = express();
app.use(express.json());
import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
  } from "./db/queries/employees.js";

// GET /
app.get("/", (req, res) => {
    res.send("Welcome to the Fullstack Employees API.");
  });
  
  // GET /employees
  app.get("/employees", async (req, res, next) => {
    try {
      const employees = await getEmployees();
      res.json(employees);
    } catch (err) {
      next(err);
    }
  });

  // POST /employees
app.post("/employees", async (req, res, next) => {
    const { name, birthday, salary } = req.body;
    if (!req.body || !name || !birthday || !salary) {
      return res.status(400).send("Missing required fields.");
    }
    try {
      const newEmployee = await createEmployee({ name, birthday, salary });
      res.status(201).json(newEmployee);
    } catch (err) {
      next(err);
    }
  });

  // GET /employees/:id
app.get("/employees/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).send("Invalid ID");
    try {
      const employee = await getEmployee(id);
      if (!employee) return res.status(404).send("Employee not found");
      res.json(employee);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /employees/:id
app.delete("/employees/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).send("Invalid ID");
    try {
      const deleted = await deleteEmployee(id);
      if (!deleted) return res.status(404).send("Employee not found");
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
  
  // PUT /employees/:id
  app.put("/employees/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { name, birthday, salary } = req.body;
  
    if (!req.body || !name || !birthday || !salary) {
      return res.status(400).send("Missing required fields.");
    }
    if (isNaN(id) || id <= 0) return res.status(400).send("Invalid ID");
  
    try {
      const updated = await updateEmployee({ id, name, birthday, salary });
      if (!updated) return res.status(404).send("Employee not found");
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  });

export default app;
