import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

function JobCard({ job, onDelete, onEdit }) {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
  const [menuOpen, setMenuOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative cursor-grab rounded-lg border bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Job information */}
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{job.company}</h3>

          <p className="mt-1 text-sm text-gray-500">{job.role}</p>
          <span
            className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
              job.status === "wishlist"
                ? "bg-gray-100 text-gray-700"
                : job.status === "applied"
                  ? "bg-blue-100 text-blue-700"
                  : job.status === "online assessment"
                    ? "bg-purple-100 text-purple-700"
                    : job.status === "interview"
                      ? "bg-yellow-100 text-yellow-700"
                      : job.status === "offer"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
            }`}
          >
            {job.status
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>

          {/* Job URL */}
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              🔗 View Job
            </a>
          )}

          {/* Notes */}
          {job.notes && (
            <p className="mt-3 line-clamp-2 text-xs text-gray-500">
              📝 {job.notes}
            </p>
          )}

          {formattedDate && (
            <p className="mt-3 text-xs text-gray-400">
              Applied {formattedDate}
            </p>
          )}
        </div>

        {/* Three-dot menu */}
        <div className="relative shrink-0">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-md text-xl font-bold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            title="More options"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-9 z-50 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ✏️ Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
