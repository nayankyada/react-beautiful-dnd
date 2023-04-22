import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { STATUS } from "./constant";

const Index = (props) => {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={[STATUS.SCHEDULED].includes(props.column.id) || props.isDragDisabled}
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
            <img src={props.task.cover_image.asset.url} className="bg-orange-500 w-6 h-6 rounded-md"></img>
            <div>{props.task.id}</div>
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
