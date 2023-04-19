export const stageColor = {
  spotted: { default: "#bfdbfe", dropOver: "#93c5fd" },
  draft: { default: "#bfdbfe", dropOver: "#93c5fd" },
  inReview: { default: "#fed7aa", dropOver: "#fdba74" },
  changesRequested: { default: "#fecaca", dropOver: "#fca5a5" },
  readyForPublication: { default: "#bbf7d0", dropOver: "#86efac" },
  scheduled: { default: "#99f6e4", dropOver: "#5eead4" },
};

export const disabledStageForWriterAndSpotter = [
  "inReview",
  "changesRequested",
  "readyForPublication",
  "scheduled",
];

export const disabledStageForEditor = ["scheduled"];
