import "styles/global.css";
import initialData from "initialdata";
import { useState } from "react";
import Column from "Column";
import { DragDropContext } from "react-beautiful-dnd";
function App(): JSX.Element {
  const [state, setState] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState<number>();
  const onDragStart = (start) => {
    const index = state.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(index);
  };
  const onDragEnd = (result) => {
    setHomeIndex(null)
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
      console.log("hihihi");
      return;
    }

    // need to remove taskid of source from that column
    const start = state.column[source.droppableId];
    const finish = state.column[destination.droppableId];
    console.log(start, finish);
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      setState({
        ...state,
        column: { ...state.column, [newColumn.id]: newColumn },
      });
    } else {
      console.log("hihihih");
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      console.log(startTaskIds, finishTaskIds);
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
      <ul >
        <li>main-branch : drag and drop between 3 col</li>
        <li>advance-branch : drag and drop between 2 col and also col dragable</li>
      </ul>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="flex">
          {state.columnOrder.map((columnId,index) => {
            const column = state.column[columnId];
            const tasks = column.taskIds.map((taskId) => state.task[taskId]);
            const isDropDisabled = index < homeIndex;

            return <Column key={column.id} column={column} task={tasks} isDropDisabled={isDropDisabled}/>;
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
