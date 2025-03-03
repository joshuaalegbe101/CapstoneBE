import mongoose from "mongoose";
const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true }, // e.g., Food, Rent
    limit: { type: Number, required: true }, // Budget limit
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  });
  
const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;