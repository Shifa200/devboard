import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

function JobCard({ job, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
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
      className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        
        {/* Drag Handle */}
        <button
          {...listeners}
          className="mt-1 cursor-grab touch-none text-slate-400 hover:text-slate-700 active:cursor-grabbing"
          title="Drag job"
        >
          ⠿
        </button>

        {/* Job Information */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">
            {job.company}
          </h3>

          <p className="mt-1 truncate text-sm text-slate-500">
            {job.role}
          </p>

          {/* Job URL */}
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              🔗 View Job
            </a>
          )}

          {/* Notes */}
          {job.notes && (
            <p className="mt-2 line-clamp-2 text-xs text-slate-500">
              📝 {job.notes}
            </p>
          )}
        </div>

        {/* Three Dot Menu */}
        <div className="relative shrink-0">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((current) => !current);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-md text-xl font-bold leading-none text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            title="More options"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-9 z-50 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                ✏️ Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
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