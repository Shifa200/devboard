import { useDroppable } from "@dnd-kit/core";
import JobCard from "./JobCard";

function Column({ column, jobs }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[260px] rounded-lg p-4 ${
        isOver ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <h2 className="mb-4 font-semibold capitalize">
        {column}
      </h2>

      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Column;