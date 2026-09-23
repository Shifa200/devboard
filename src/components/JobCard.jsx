import { useDraggable } from "@dnd-kit/core";

function JobCard({ job, onDelete }) {
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

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(job.id);
          }}
          className="text-gray-400 hover:text-red-500 text-lg"
          title="Delete job"
        >
          ⋮
        </button>
      </div>
    </div>
  );
}

export default JobCard;