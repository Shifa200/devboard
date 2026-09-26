import { useDroppable } from "@dnd-kit/core";
import JobCard from "./JobCard";

function Column({ column, jobs, onDelete, onEdit }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  const columnStyles = {
    wishlist: {
      wrapper: "border-blue-200 bg-blue-50/60",
      header: "text-blue-800",
      count: "bg-blue-100 text-blue-700",
    },

    applied: {
      wrapper: "border-emerald-200 bg-emerald-50/60",
      header: "text-emerald-800",
      count: "bg-emerald-100 text-emerald-700",
    },

    "online assessment": {
      wrapper: "border-amber-200 bg-amber-50/60",
      header: "text-amber-900",
      count: "bg-amber-100 text-amber-700",
    },

    interview: {
      wrapper: "border-purple-200 bg-purple-50/60",
      header: "text-purple-900",
      count: "bg-purple-100 text-purple-700",
    },

    offer: {
      wrapper: "border-cyan-200 bg-cyan-50/60",
      header: "text-cyan-900",
      count: "bg-cyan-100 text-cyan-700",
    },

    rejected: {
      wrapper: "border-rose-200 bg-rose-50/60",
      header: "text-rose-900",
      count: "bg-rose-100 text-rose-700",
    },
  };

  const style = columnStyles[column] || {
    wrapper: "border-gray-200 bg-gray-50",
    header: "text-gray-900",
    count: "bg-gray-100 text-gray-700",
  };

  const formattedColumn = column
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[250px] flex-1 rounded-xl border p-3 transition ${
        style.wrapper
      } ${
        isOver
          ? "ring-2 ring-blue-400 ring-offset-2"
          : ""
      }`}
    >
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className={`text-lg font-bold ${style.header}`}>
          {formattedColumn}
        </h2>

        <span
          className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold ${style.count}`}
        >
          {jobs.length}
        </span>
      </div>

      {/* Jobs */}
      <div className="min-h-[340px] space-y-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}

        {/* Empty column */}
        {jobs.length === 0 && (
          <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white/40">
            <p className="text-sm text-slate-400">
              No jobs yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;