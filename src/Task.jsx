import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { STATUS } from "./constant";

const Index = (props) => {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={
        [STATUS.SCHEDULED].includes(props.column.id) || props.isDragDisabled
      }
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`border-[1px] p-2 border-gray-500 rounded-md bg-white`}
        >
          <div
            className=" flex space-x-2 box-border	overflow-hidden"
            {...provided.dragHandleProps}
          >
            <div className="flex">
              <img
                src={props.task.cover_image.asset.url}
                style={{ maxWidth: "75px", maxHeight: "75px" }}
                className="bg-orange-500  rounded-sm"
              ></img>
            </div>
            <div className="flex flex-col max-w-[calc(100%_-_80px)]">
              <div className="select-none font-bold text-lg text-blue-500 truncate ">
                {props.task.topic.name}
              </div>
              <div className="select-none text-sm text-bold truncate">
                {props.task.contextual_title}
              </div>
              <div className="select-none	text-sm text-gray-400 truncate">
                {props.task.category.title}
              </div>
            </div>
          </div>
          <div className="select-none font-bold mt-1  ">
            <p className="line-clamp-2">{props.task.headline}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Index;
