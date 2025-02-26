import express from 'express';

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
router.post("/", async (req, res))

//Update Transaction
router.put("/:userId")


//Delete Transaction
router.delete("/:userId", async (req, res))