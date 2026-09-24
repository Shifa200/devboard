import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./components/Column";

// Board columns used to organize job applications by status
const columns = [
  "wishlist",
  "applied",
  "online assessment",
  "interview",
  "offer",
  "rejected",
];

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("devboard-jobs");

    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("devboard-jobs", JSON.stringify(jobs));
  }, [jobs]);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "wishlist",
  });

  const [editingJobId, setEditingJobId] = useState(null);

  const handleEditJob = (job) => {
  setForm({
    company: job.company,
    role: job.role,
    status: job.status,
  });

  setEditingJobId(job.id);

  setErrors({
    company: "",
    role: "",
  });
};

  const [errors, setErrors] = useState({
    company: "",
    role: "",
  });

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    const newStatus = over.id;

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === active.id ? { ...job, status: newStatus } : job,
      ),
    );
  };

  const handleDeleteJob = (jobId) => {
  setJobs((currentJobs) =>
    currentJobs.filter((job) => job.id !== jobId)
   );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        DevBoard 🚀 Job Tracker
      </h1>
      <div className="mb-6 flex gap-3 items-center flex-wrap">
        {/* Company */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => {
              setForm({ ...form, company: e.target.value });

              if (e.target.value.trim()) {
                setErrors({ ...errors, company: "" });
              }
            }}
            className={`border p-2 rounded ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Job Role"
            value={form.role}
            onChange={(e) => {
              setForm({ ...form, role: e.target.value });

              if (e.target.value.trim()) {
                setErrors({ ...errors, role: "" });
              }
            }}
            className={`border p-2 rounded ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Status */}
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>

        {/* Add button */}
        <button
          onClick={() => {
            const newErrors = {
              company: "",
              role: "",
            };

            if (!form.company.trim()) {
              newErrors.company = "Please enter company name.";
            }

            if (!form.role.trim()) {
              newErrors.role = "Please enter job role.";
            }

            if (newErrors.company || newErrors.role) {
              setErrors(newErrors);
              return;
            }
            
            if (editingJobId !== null) {
      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === editingJobId
            ? {
                ...job,
                company: form.company.trim(),
                role: form.role.trim(),
                status: form.status,
              }
            : job
        )
      );

      setEditingJobId(null);
    } else { 
      const newJob = {
              id: Date.now(),
              company: form.company.trim(),
              role: form.role.trim(),
              status: form.status
            };

            setJobs((currentJobs) => [...currentJobs, newJob]);
          }
            setForm({
              company: "",
              role: "",
              status: "wishlist",
            });

            setErrors({
              company: "",
              role: "",
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            {editingJobId !== null ? "Update Job" : "Add Job"}

        </button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns.map((col) => (
            <Column
              key={col}
              column={col}
              jobs={jobs.filter((job) => job.status === col)}
              onDelete={handleDeleteJob}
              onEdit={handleEditJob}

            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
