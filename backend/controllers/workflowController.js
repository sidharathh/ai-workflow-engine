const Workflow = require("../models/Workflow");
const { runWorkflow } = require("../services/workflowService");
const aiService = require("../services/aiService");
const Execution = require("../models/Execution");

exports.executeWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const { input } = req.body;

    const workflow = await Workflow.findById(id);

    const result = await runWorkflow(workflow, input, aiService);

    if (workflow.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // ✅ Save success
    await Execution.create({
      workflowId: id,
      input,
      output: result,
      status: "success",
    });

    res.json({ result });
  } catch (err) {
    console.error(err);

    // ✅ Save failure
    await Execution.create({
      workflowId: req.params.id,
      input: req.body.input,
      status: "failed",
      error: err.message,
    });

    res.status(500).json({ error: err.message });
  }
};

exports.createWorkflow = async (req, res) => {
  try {
    const { name, steps } = req.body;

    const workflow = await Workflow.create({
      name,
      steps,
      user: req.user._id,
    });

    res.status(201).json(workflow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({
      user: req.user._id,   // 🔥 STEP 7.3 HERE
    });

    res.json(workflows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getExecutions = async (req, res) => {
  const data = await Execution.find().populate("workflowId");

  res.json(data);
};