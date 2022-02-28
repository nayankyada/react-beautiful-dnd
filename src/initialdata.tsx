const initialData = {
  task: {
    "task-1": { id: "task-1", content: "take out the garbage" },
    "task-2": { id: "task-2", content: "watch my favorite" },
    "task-3": { id: "task-3", content: "charge my phone" },
    "task-4": { id: "task-4", content: "cook dinner" },
    "task-5": { id: "task-5", content: "cook dinner" },
    "task-6": { id: "task-6", content: "cook dinner" },
    "task-7": { id: "task-7", content: "cook dinner" },
    "task-8": { id: "task-8", content: "cook dinner" },
    "task-9": { id: "task-9", content: "cook dinner" },
    "task-10": { id: "task-10", content: "cook dinner" },
  },
  column: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4","task-5", "task-6", "task-7"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-8", "task-9", "task-10"],
    },
  },
  columnOrder:["column-1","column-2","column-3"]
};
export default initialData;
