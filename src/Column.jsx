import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import {
  disabledStageForEditor,
  disabledStageForWriterAndSpotter,
  stageColor,
} from "./constant";

const Index = (props) => {
  const isColumnDroppable = () => {
    if (props.role === "developer") {
      return disabledStageForWriterAndSpotter.includes(props.column.id);
    }
    if (props.role === "editor") {
      return disabledStageForEditor.includes(props.column.id);
    }
    return false;
  };

  const calculateBackgroundColor = (columnId, isDraggingOver) => {
    let color = stageColor[columnId][isDraggingOver ? "dropOver" : "default"];
    if (
      (disabledStageForWriterAndSpotter.includes(columnId) &&
        props.role === "developer") ||
      (disabledStageForEditor.includes(columnId) && props.role === "editor")
    ) {
      color = "#e7e5e4";
    }
    return color;
  };
  return (
    <div
      className={`border-2 rounded-md w-1/3 flex flex-col h-full overflow-auto`}
      style={{ backgroundColor: stageColor[props.column.id]["default"] }}
    >
      <h3 className="text-md font-bold p-4">{props.column.title}</h3>

      <Droppable
        droppableId={props.column.id}
        isDropDisabled={isColumnDroppable()}
      >
        {(provided, snapshot) => (
          <div
            style={{
              backgroundColor: calculateBackgroundColor(
                props.column.id,
                snapshot.isDraggingOver
              ),
            }}
            className={`p-2 flex-grow flex gap-2 flex-col`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.task.map((task, index) => (
              <Task
                index={index}
                task={task}
                key={task.id}
                column={props.column}
                role={props.role}
                isDragDisabled={props.isDragDisabled}
              ></Task>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default Index;
