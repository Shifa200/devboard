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
      {...listeners}
      className="relative rounded-lg border bg-white p-4 shadow-sm cursor-grab"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {job.company}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {job.role}
          </p>
        </div>
        <div className="relative">
  <button
    onPointerDown={(e) => e.stopPropagation()}
    onClick={(e) => {
      e.stopPropagation();
      setMenuOpen(!menuOpen);
    }}
    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-xl font-bold transition"
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