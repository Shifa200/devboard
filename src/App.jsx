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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">DevBoard 🚀 Job Tracker</h1>
       
      <button
         onClick={() => {
          const newJob = {
            id: Date.now(),
            company: "New Company",
            role: "Frontend Dev",
            status: "wishlist",
          };
          setjobs([...jobs, newJob])
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
