import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [action, setAction] = useState("summarize");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWorkflows();
  }, []);

  // 🔹 Fetch workflows
  const fetchWorkflows = async () => {
    try {
      const res = await axios.get(
        "https://ai-workflow-engine-hntb.onrender.com/api/workflows",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWorkflows(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Create workflow
  const createWorkflow = async () => {
    // ✅ Validation
    if (!name) return alert("Enter workflow name");

    try {
      await axios.post(
        "https://ai-workflow-engine-hntb.onrender.com/api/workflows",
        {
          name,
          steps: [
            { type: "input" },
            { type: "ai", action: action },
            { type: "output" },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName("");
      fetchWorkflows();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create workflow");
    }
  };

  // 🔹 Execute workflow
  const executeWorkflow = async (id) => {
    // ✅ Validation
    if (!input) return alert("Enter input");

    setLoading(true);

    try {
      const res = await axios.post(
        `https://ai-workflow-engine-hntb.onrender.com/api/workflows/${id}/execute`,
        { input },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResult(res.data.result);
    } catch (err) {
      alert(err.response?.data?.error || "Execution failed");
    }

    setLoading(false);
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Workflow Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Create Workflow */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Create Workflow</h2>

        <div className="flex gap-2 mb-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="summarize">Summarize</option>
            <option value="rewrite">Rewrite</option>
          </select>

          <button
            onClick={createWorkflow}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Enter Input</h2>

        <input
          className="border p-2 rounded w-full"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Workflows */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Your Workflows</h2>

        {workflows.length === 0 ? (
          <p className="text-gray-500">No workflows yet</p>
        ) : (
          workflows.map((wf) => (
            <div
              key={wf._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{wf.name}</span>

              <button
                onClick={() => executeWorkflow(wf._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {loading ? "Processing..." : "Execute"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}