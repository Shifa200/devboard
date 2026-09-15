import { useDraggable } from "@dnd-kit/core";

function JobCard({ job }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: job.id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-200 p-2 rounded text-sm cursor-grab"
    >
      {job.company} — {job.role}
    </div>
  );
}

export default JobCard;