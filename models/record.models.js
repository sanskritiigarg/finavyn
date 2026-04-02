import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0.01, "Amount must be greater than 0"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Please provide a type"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
      default: Date.now(),
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// exclude soft-deleted records by default
recordSchema.pre(/^find/, function () {
  this.where({ deletedAt: null });
});

const Record = mongoose.model("Record", recordSchema);

export default Record;