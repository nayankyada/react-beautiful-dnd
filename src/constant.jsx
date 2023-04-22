export const STATUS = {
  SPOTTED: "Spotted",
  DRAFT: "Draft",
  IN_REVIEW: "In Review",
  CHANGES_REQUESTED: "Changes Requested",
  READY_FOR_PUBLICATION: "Ready For Publication",
  SCHEDULED: "Scheduled",
};
export const stageColor = {
  [STATUS.SPOTTED]: { default: "#bfdbfe", dropOver: "#93c5fd" },
  [STATUS.DRAFT]: { default: "#bfdbfe", dropOver: "#93c5fd" },
  [STATUS.IN_REVIEW]: { default: "#fed7aa", dropOver: "#fdba74" },
  [STATUS.CHANGES_REQUESTED]: { default: "#fecaca", dropOver: "#fca5a5" },
  [STATUS.READY_FOR_PUBLICATION]: { default: "#bbf7d0", dropOver: "#86efac" },
  [STATUS.SCHEDULED]: { default: "#99f6e4", dropOver: "#5eead4" },
};


export const disabledStageForWriterAndSpotter = [
  STATUS.IN_REVIEW,
  STATUS.CHANGES_REQUESTED,
  STATUS.READY_FOR_PUBLICATION,
  STATUS.SCHEDULED,
];

export const disabledStageForEditor = [STATUS.SCHEDULED];
