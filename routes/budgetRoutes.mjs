import express from "express";
import Budget from "../models/budget.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

// All Budgets for Auth User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId }); 
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error - Budget", error: err.message });
  }
});

// Create Budget with Auth
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, limit, startDate, endDate } = req.body;

    // Validate required fields
    if (!category || !limit || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure startDate is before endDate
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "startDate must be before endDate" });
    }

    const newBudget = new Budget({
      userId: req.userId, 
      category,
      limit,
      startDate,
      endDate,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Update Budget with Auth
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.userId }, 
      req.body,
      { new: true }
    );

    if (!updatedBudget) return res.status(404).json({ message: "Budget not found or unauthorized" });
    res.json(updatedBudget);
  } catch (err) {
    res.status(500).json({ message: "Server error - Budget", error: err.message });
  }
});

// Delete Budget with Auth
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findOneAndDelete({ _id: id, userId: req.userId });

    if (!deletedBudget) return res.status(404).json({ message: "Budget not found or unauthorized" });
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error - Budget", error: err.message });
  }
});

export default router;
