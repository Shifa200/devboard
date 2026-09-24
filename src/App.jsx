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

  const [errors, setErrors] = useState({
    company: "",
    role: "",
  });

  // Fill the form with the selected job when editing
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

  // Move a job to another column
  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    const newStatus = over.id;

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === active.id
          ? { ...job, status: newStatus }
          : job
      )
    );
  };

  // Delete a job
  const handleDeleteJob = (jobId) => {
    setJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== jobId)
    );

    // If we were editing this job, reset the form
    if (editingJobId === jobId) {
      setEditingJobId(null);

      setForm({
        company: "",
        role: "",
        status: "wishlist",
      });

      setErrors({
        company: "",
        role: "",
      });
    }
  };

  // Reset the form
  const handleCancelEdit = () => {
    setEditingJobId(null);

    setForm({
      company: "",
      role: "",
      status: "wishlist",
    });

    setErrors({
      company: "",
      role: "",
    });
  };

  // Add or update a job
  const handleSubmit = () => {
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

    // Update existing job
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
    }

    // Add new job
    else {
      const newJob = {
        id: Date.now(),
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
      };

      setJobs((currentJobs) => [...currentJobs, newJob]);
    }

    handleCancelEdit();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            🚀 DevBoard Job Tracker
          </h1>

          <p className="mt-2 text-gray-500">
            Track and manage your job applications in one place.
          </p>
        </div>

        {/* Add / Edit Job Form */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              {editingJobId !== null ? "Edit Job" : "Add New Job"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingJobId !== null
                ? "Update the details of this job application."
                : "Track a new job application."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* Company */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                placeholder="e.g. Google"
                value={form.company}
                onChange={(e) => {
                  setForm({
                    ...form,
                    company: e.target.value,
                  });

                  if (e.target.value.trim()) {
                    setErrors({
                      ...errors,
                      company: "",
                    });
                  }
                }}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                  errors.company
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {errors.company && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Job Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Role
              </label>

              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                value={form.role}
                onChange={(e) => {
                  setForm({
                    ...form,
                    role: e.target.value,
                  });

                  if (e.target.value.trim()) {
                    setErrors({
                      ...errors,
                      role: "",
                    });
                  }
                }}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                  errors.role
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {errors.role && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">

            {editingJobId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {editingJobId !== null ? "Update Job" : "Add Job"}
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((col) => (
              <Column
                key={col}
                column={col}
                jobs={jobs.filter(
                  (job) => job.status === col
                )}
                onDelete={handleDeleteJob}
                onEdit={handleEditJob}
              />
            ))}
          </div>
        </DndContext>

      </div>
    </div>
  );
}

export default App;