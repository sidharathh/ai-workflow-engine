const runWorkflow = async (workflow, inputText, aiService) => {
  let data = inputText;

  for (let step of workflow.steps) {
    console.log("Running step:", step);

    if (step.type === "ai") {
      if (step.action === "summarize") {
        data = await aiService.summarize(data);
      }

      if (step.action === "rewrite") {
        data = await aiService.rewrite(data);
      }
    }
  }

  return data;
};

module.exports = { runWorkflow };