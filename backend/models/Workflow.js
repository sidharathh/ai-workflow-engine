const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["input", "ai", "output"],
    required: true,
  },
  action: {
    type: String, // summarize, rewrite, etc.
  },
});

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    steps: [stepSchema],
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Workflow", workflowSchema);