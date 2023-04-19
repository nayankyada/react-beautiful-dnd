const initialData = {
  task: {
    "task-1": { id: "task-1", content: "task-1" },
    "task-2": { id: "task-2", content: "task-2" },
    "task-3": { id: "task-3", content: "task-3" },
    "task-4": { id: "task-4", content: "task-4" },
    "task-5": { id: "task-5", content: "task-5" },
    "task-6": { id: "task-6", content: "task-6" },
    "task-7": { id: "task-7", content: "task-7" },
    "task-8": { id: "task-8", content: "task-8" },
    "task-9": { id: "task-9", content: "task-9" },
    "task-10": { id: "task-10", content: "task-10" },
    "task-11": { id: "task-11", content: "task-11" },
    "task-12": { id: "task-12", content: "task-12" },
    "task-13": { id: "task-13", content: "task-13" },
    "task-14": { id: "task-14", content: "task-14" },
    "task-15": { id: "task-15", content: "task-15" },
    "task-16": { id: "task-16", content: "task-16" },
    "task-17": { id: "task-17", content: "task-17" },
    "task-18": { id: "task-18", content: "task-18" },
    "task-19": { id: "task-19", content: "task-19" },
  },
  column: {
    spotted: {
      id: "spotted",
      title: "Spotted",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    draft: {
      id: "draft",
      title: "Draft",
      taskIds: ["task-4", "task-5", "task-6", "task-7"],
    },
    inReview: {
      id: "inReview",
      title: "In Review",
      taskIds: ["task-8", "task-9", "task-10"],
    },
    changesRequested: {
      id: "changesRequested",
      title: "Changes Requested",
      taskIds: ["task-11", "task-12", "task-13"],
    },
    readyForPublication: {
      id: "readyForPublication",
      title: "Ready for publication",
      taskIds: ["task-14", "task-15", "task-16"],
    },
    scheduled: {
      id: "scheduled",
      title: "Scheduled",
      taskIds: ["task-17", "task-18", "task-19"],
    },
  },
  columnOrder: [
    "spotted",
    "draft",
    "inReview",
    "changesRequested",
    "readyForPublication",
    "scheduled",
  ],
};
export default initialData;
