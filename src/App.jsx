import { useState } from "react";

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
  const [jobs, setjobs] = useState([]);
  const [form, setForm] = useState({
  company: "",
  role: "",
  status: "wishlist",
});
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
            </select>6
       </div>
      <button
         onClick={() => {
          const newJob = {
            id: Date.now(),
            ...form,
          };
          setjobs([...jobs, newJob])

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

      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <div key={col} className="bg-white p-4 rounded shadow min-w-[200px]">
            <h2 className="font-semibold capitalize mb-3">{col}</h2>

            <div className="space-y-2">
              {jobs
                .filter((job) => job.status === col)
                .map((job) => (
                  <div
                    key={job.id}
                    classname = "bg-gray-200 p-2 rounded text-sm"
                  >
                    {job.company} - {job.role}
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
