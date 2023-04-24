import { useEffect, useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { client } from "./sanityClient";
import { STATUS } from "./constant";
import { toast } from "react-toastify";
function App() {
  const [state, setState] = useState(null);
  const [role, setRole] = useState("editor");
  const [isDragDisabled, setIsDragDisabled] = useState("editor");

  const onDragEnd = (result) => {
    setIsDragDisabled(true);

    const { destination, draggableId, source } = result;

    // if destination null means drop outside DragDropContext
    if (!destination) {
      setIsDragDisabled(false);
      return;
    }

    // if source and destination both same means we have not changed anythings
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setIsDragDisabled(false);
      return;
    }

    // need to remove taskid of source from that column
    const start = state.column[source.droppableId];
    const finish = state.column[destination.droppableId];
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
      toast.promise(
        client.patch(draggableId).set({ status: finish.id }).commit(),
        {
          success: {
            render() {
              fetchData();
              return "Piece updated successfully";
            },
          },
          pending: "Updating...",
          error: {
            render(e) {
              fetchData();
              return "Something went wrong please try again";
            },
          },
        }
      );
    }
  };

  const fetchData = () => {
    let data = {
      task: {},
      column: {
        [STATUS.SPOTTED]: {
          id: STATUS.SPOTTED,
          title: STATUS.SPOTTED,
          taskIds: [],
        },
        [STATUS.DRAFT]: {
          id: STATUS.DRAFT,
          title: STATUS.DRAFT,
          taskIds: [],
        },
        [STATUS.IN_REVIEW]: {
          id: STATUS.IN_REVIEW,
          title: STATUS.IN_REVIEW,
          taskIds: [],
        },
        [STATUS.CHANGES_REQUESTED]: {
          id: STATUS.CHANGES_REQUESTED,
          title: STATUS.CHANGES_REQUESTED,
          taskIds: [],
        },
        [STATUS.READY_FOR_PUBLICATION]: {
          id: STATUS.READY_FOR_PUBLICATION,
          title: STATUS.READY_FOR_PUBLICATION,
          taskIds: [],
        },
        [STATUS.SCHEDULED]: {
          id: STATUS.SCHEDULED,
          title: STATUS.SCHEDULED,
          taskIds: [],
        },
      },
      columnOrder: [
        STATUS.SPOTTED,
        STATUS.DRAFT,
        STATUS.IN_REVIEW,
        STATUS.CHANGES_REQUESTED,
        STATUS.READY_FOR_PUBLICATION,
        STATUS.SCHEDULED,
      ],
    };
    client
      .fetch(
        `*[_type == "workflow_piece" && (_id in path('drafts.**'))]{
    "id":_id,
    headline,
    topic -> {
      _id,
      name,
      cover_image{
        asset->{url}
      }
    },
    category -> {
      title
    },
    contextual_title,  
    status,
    cover_image{
      asset -> {url}
    },
  } | order(_updatedAt desc) `
      )
      .then((response) => {
        response.forEach((element) => {
          data.task[element.id] = element;
          data.column[element.status].taskIds = [
            ...data.column[element.status].taskIds,
            element.id,
          ];
        });
      })
      .catch(() => {
        toast.error("Something went wrong please try again...");
      })
      .finally(() => {
        setIsDragDisabled(false);
        setState(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App min-w-[1080px]">
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3">
          {state &&
            state.columnOrder.map((columnId, index) => {
              const column = state.column[columnId];
              const tasks = column.taskIds.map((taskId) => state.task[taskId]);
              return (
                <Column
                  isDragDisabled={isDragDisabled}
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
