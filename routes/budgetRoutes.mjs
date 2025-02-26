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

  } catch (error) {
        res.status(500).json({ message: "Error fetching budget", error });
  }
});

//Create Budget
router.post("/", async (req, res) => {
  try {
    const { userId, name, amount } = req.body;
    const newBudget = new Budget({ userId, name, amount });
    await newBudget.save();
    res.status(201).json(newBudget);

  } catch (error) {
        res.status(500).json({ message: "Error creating budget", error });
  }
});

//Update Budget
router.put("/:id", async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBudget) return res.status(404).json({ message: "Budget not found" });
    res.json(updatedBudget);

  } catch (error) {
        res.status(500).json({ message: "Error updating budget", error });
  }
});

//Delete Budget
router.delete("/:id", async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ message: "Budget not found" });
    res.json({ message: "Budget deleted successfully" });
    
  } catch (error) {
        res.status(500).json({ message: "Error deleting budget", error });
  }
});

export default router;
