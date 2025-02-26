import express from 'express';
import Transaction from '../models/transactions.mjs';

const router = express.Router();

//Get Transaction
router.get("/:userId", async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1});

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

//Post Transaction
router.post("/", async (req, res) => {
    try {
        const {userId, type, category, amount, note } = req.body;

        if(!userId || !type || !category || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTransaction = new Transaction({ userId, type, category, amount, note });
        await newTransaction.save();

        res.status(201).json(newTransaction);
    }   catch (err) {
            res.status(500).json({ message: "Server error" });
    }
});



//Update Transaction
router.put("/:id", async (req, res) => {
    try {
        const { type, category, amount, note } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { type, category, amount, note },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(updatedTransaction);
    }   catch(err) {
            res.status(500).json({ message: "Server error "});
    }
});


//Delete Transaction
router.delete("/:userId", async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

        if(!deletedTransaction) {
            return res.status(404).json({ mesage: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted successfully" });
    }   catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

export default router;