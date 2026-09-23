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
    const savedJobs= localStorage.getItem("devboard-jobs");

    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("devboard-jobs", JSON.stringify(jobs));
  },[jobs]);

  
  const [form, setForm] = useState({
  company: "",
  role: "",
  status: "wishlist",
});

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">DevBoard 🚀 Job Tracker</h1>
       <div className= "mb-6 flex gap-3 items-center flex-wrap">
        <input 
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="border p-2 rounded"
        />

         <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="border p-2 rounded"
          />
           <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="border p-2 rounded"
            >
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
       </div>
      <button
         onClick={() => {
          const newJob = {
            id: Date.now(),
            ...form,
          };
          setJobs([...jobs, newJob])

          setForm({
            company: "",
            role: "",
            status: "wishlist",
          });
    
         }}
         className= "mb-4 bg-blue-500 text-white px-4 py-2 rounded"
         >
          + Add Job
         </button>
     <DndContext onDragEnd={handleDragEnd}>
  <div className="flex gap-4 overflow-x-auto">
    {columns.map((col) => (
      <Column
        key={col}
        column={col}
        jobs={jobs.filter((job) => job.status === col)}
      />
    ))}
  </div>
</DndContext>
    </div>
  );
}

export default App;



