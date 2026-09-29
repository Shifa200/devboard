import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Trash2, X } from "lucide-react";

function JobCard({ job, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setShowDeleteConfirm(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleConfirmDelete = () => {
    onDelete(job.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* Job Card */}
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

            {/* Dropdown */}
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
                    setMenuOpen(false);
                    setShowDeleteConfirm(true);
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Delete this job?
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Job Being Deleted */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                {job.company}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {job.role}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobCard;