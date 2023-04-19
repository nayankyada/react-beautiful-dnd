import "styles/global.css";
import initialData from "initialdata";
import { useState } from "react";
import Column from "Column";
import { DragDropContext } from "react-beautiful-dnd";
function App(): JSX.Element {
  const [state, setState] = useState(initialData);
  const [role, setRole] = useState("editor");
  const [homeIndex, setHomeIndex] = useState<number>();
  const onDragStart = (start) => {
    const index = state.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(index);
  };
  const onDragEnd = (result) => {
    setHomeIndex(null);
    const { destination, draggableId, source } = result;
    console.log(result);

    // if destination null means drop outside DragDropContext
    if (!destination) {
      return;
    }
    // if source and destination both same means we have not changed anythings

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // need to remove taskid of source from that column
    const start = state.column[source.droppableId];
    const finish = state.column[destination.droppableId];
    console.log(start, finish);
    if (start !== finish) {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(0, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      setState({
        ...state,
        column: {
          ...state.column,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });
    }
  };

  return (
    <div className="App">
      <div className="flex gap-4 my-4 center items-center">
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            setRole("developer");
          }}
        >
          Spotter / Writer
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            setRole("editor");
          }}
        >
          Editor
        </button>
        <p className="text-md">
          Current Role : <span className="font-bold">{role}</span>
        </p>
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="flex gap-3">
          {state.columnOrder.map((columnId, index) => {
            const column = state.column[columnId];
            const tasks = column.taskIds.map((taskId) => state.task[taskId]);
            return (
              <Column
                key={column.id}
                column={column}
                task={tasks}
                role={role}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;

// three callback in DragDropContext
// we can log of each call back by passing functiom
// onDragStart onDragUpdate onDragEnd
