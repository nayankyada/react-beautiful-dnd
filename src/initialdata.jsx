const initialData = {
  task: {

  },
  column: {
    spotted: {
      id: "spotted",
      title: "Spotted",
      taskIds: [],
    },
    draft: {
      id: "draft",
      title: "Draft",
      taskIds: [],
    },
    inReview: {
      id: "inReview",
      title: "In Review",
      taskIds: [],
    },
    changesRequested: {
      id: "changesRequested",
      title: "Changes Requested",
      taskIds: [],
    },
    readyForPublication: {
      id: "readyForPublication",
      title: "Ready for publication",
      taskIds: [],
    },
    scheduled: {
      id: "scheduled",
      title: "Scheduled",
      taskIds: [],
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
