import React from "react";
import Task from "Task";
import { Droppable } from "react-beautiful-dnd";
interface ColumnProps {
  key: string;
  column: { title: string; id: string; taskIds: string[] };
  task: { id: string; content: string }[];
  isDropDisabled: boolean;
}
const Index: React.FC<ColumnProps> = (props) => {
  return (
    <div className="m-2 border-2 rounded-md w-1/3 flex flex-col h-64 overflow-scroll">
      <h3 className="text-xl font-bold p-4">{props.column.title}</h3>

      <Droppable
        droppableId={props.column.id}
        isDropDisabled={props.isDropDisabled}
        type={props.column.id === "column-3" ? "done" : "active"}
      >
        {(provided, snapshot) => (
          <div
            className={`p-4 flex-grow ${
              snapshot.isDraggingOver && "bg-green-200"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.task.map((task, index) => (
              <Task index={index} task={task} key={task.id}></Task>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default Index;
// provided provides required props to handle functionality
// snapshot = {isDraggingOver:blooean,draggingOverWith:taskid}
// isDraggingOver set to true when draggable is dropping over droppable

// type is optional property
// if we have assigned a type to columns then it allows to drop item only if
// source and destination has same type
// 1st and 2nd hase same type and third has diffrent

// isDropDisabled = true means it will not allows to drop
// here we created logic like if source column order is less than destination columns order then \
// we have set this true so we cant drop task of high order task on low order task like
// not possible 2 -> 1 but 1->2 possible
// also refer above point so 3rd columns is disabled because of type mismatch

//<Droppable direction/> property
// by default verticl so if we make it as horizontal it allows us to drag drop hotizontaly
// check video number 11