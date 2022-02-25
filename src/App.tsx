import "styles/global.css";
import initialData from "initialdata";
import { useState } from "react";
import Column from "Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function App(): JSX.Element {
  const [state, setState] = useState(initialData);
  
  const onDragEnd = (result) => {
    const { destination, draggableId, source,type } = result;
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
    if(type === "column"){
      const newColumnOrder = Array.from(state.columnOrder)
      newColumnOrder.splice(source.index,1)
      newColumnOrder.splice(destination.index,0,draggableId)
      setState(prev => ({...prev,columnOrder:newColumnOrder}))
      return
    }
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
      <ul>
        <li>main-branch : drag and drop between 3 col</li>
        <li>
          advance-branch : drag and drop between 2 col and also col dragable
        </li>
      </ul>
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.column[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.task[taskId]
                );
                

                return (
                  <Column
                    key={column.id}
                    column={column}
                    task={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

// for advance branch check layout image in video 12

// three callback in DragDropContext
// we can log of each call back by passing functiom
// onDragStart onDragUpdate onDragEnd
