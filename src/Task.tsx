import React from "react";
import { Draggable } from "react-beautiful-dnd";
interface TaskProps {
  task: { id: string; content: string };
  index: number;
  column: { title: string; id: string; taskIds: string[] };
  role: string;
}
const Index: React.FC<TaskProps> = (props) => {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={["scheduled"].includes(props.column.id)}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`border-2 p-2 border-gray-500 mb-2 rounded-md1 ${
            snapshot.isDragging && "bg-blue-200"
          }`}
        >
          <div className="flex space-x-2" {...provided.dragHandleProps}>
            <div className="bg-orange-500 w-6 h-6 rounded-md"></div>
            <div>{props.task.content}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Index;

// provided provides required props to handle functionality
// snapshot = {isDragging:blooean,draggingOver:columnid}

// div with dragHandleProps allows to make a div dragable
// 1. apply it to orange box
// 2. apply to container
// so here orange blocks allows to drag insted of whole taskbar

// isDragDisabled ->  set to true if want to disable drag of specific task
