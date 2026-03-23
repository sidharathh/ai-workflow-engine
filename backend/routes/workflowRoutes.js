const express = require("express");
const router = express.Router();

const { createWorkflow,executeWorkflow, getExecutions, getWorkflows } = require("../controllers/workflowController");

router.post("/", createWorkflow);
router.get("/", getWorkflows);
router.post("/:id/execute", executeWorkflow);
router.get("/executions", getExecutions);

module.exports = router;