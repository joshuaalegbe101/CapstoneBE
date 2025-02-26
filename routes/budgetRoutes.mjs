import express from "express";
import Budget from "../models/budget.mjs"; // Make sure the model exists

const router = express.Router();

//Get all Budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);

  } catch (error) {
        res.status(500).json({ message: "Error fetching budgets", error });
  }
});

//Get Budget
router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.json(budget);

  } catch (err) {
        res.status(500).json({ message: "Server error - Budget", err: err.message });
  }
});

//Create Budget
router.post("/", async (req, res) => {
    try {
        const { userId, category, limit, startDate, endDate } = req.body;
    
        // Validate required fields
        if (!userId || !category || !limit || !startDate || !endDate) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        // Ensure startDate is before endDate
        if (new Date(startDate) >= new Date(endDate)) {
          return res.status(400).json({ message: "startDate must be before endDate" });
        }
    
        const newBudget = new Budget({ userId, category, limit, startDate, endDate });
        await newBudget.save();
    
        res.status(201).json(newBudget);
      } catch (err) {
        console.error("Error creating budget:", error);
        res.status(500).json({ message: "Server Error", err: err.message });
      }
    });

//Update Budget
router.put("/:id", async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBudget) return res.status(404).json({ message: "Budget not found" });
    res.json(updatedBudget);

  } catch (err) {
        res.status(500).json({ message: "Server error - Budget", err: err.message });
  }
});

//Delete Budget
router.delete("/:id", async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ message: "Budget not found" });
    res.json({ message: "Budget deleted successfully" });

  } catch (err) {
        res.status(500).json({ message: "Server error - Budget", err: err.message });
  }
});

export default router;
