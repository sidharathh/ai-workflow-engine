const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
    },
    input: String,
    output: String,
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
    error: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Execution", executionSchema);