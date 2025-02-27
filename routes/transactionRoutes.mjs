import express from "express";
import Transaction from "../models/transactions.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

//Get Transactions
router.get("/", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Server error - Transaction", err: err.message });
    }
});

//Create Transaction
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { type, category, amount, note } = req.body;

        // Ensure required fields are provided
        if (!type || !category || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTransaction = new Transaction({ 
            userId: req.userId, // Use authenticated user's ID
            type, 
            category, 
            amount, 
            note 
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: "Server error - Transaction", err: err.message });
    }
});

//Update Transaction
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { type, category, amount, note } = req.body;

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId }, // Ensure user can only edit their own transactions
            { type, category, amount, note },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(updatedTransaction);
    } catch (err) {
        res.status(500).json({ message: "Server error - Transaction", err: err.message });
    }
});

//Delete Transaction
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.userId 
        });

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error - Transaction", err: err.message });
    }
});

export default router;
