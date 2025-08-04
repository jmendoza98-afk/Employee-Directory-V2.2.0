import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res, next) => {
    try {
      const employees = await queries.getAllEmployees();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await queries.getEmployeeById(id);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found." });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { first_name, last_name, email } = req.body;
      const newEmployee = await queries.createEmployee({ first_name, last_name, email });
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, email } = req.body;
      const updatedEmployee = await queries.updateEmployee(id, { first_name, last_name, email });
      if (updatedEmployee) {
        res.json(updatedEmployee);
      } else {
        res.status(404).json({ message: "Employee not found." });
      }
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await queries.deleteEmployee(id);
      if (deleted) {
        res.status(204).end(); // 204 No Content for successful deletion.
      } else {
        res.status(404).json({ message: "Employee not found." });
      }
    } catch (error) {
      next(error);
    }
  });
