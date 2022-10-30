import app from "./appSlice";
import certification from "./certificationSlice";
import job from "./jobSlice";
import met from "./metSlice";
import nasa from "./nasaSlice";
import rijks from "./rijksSlice";
import skill from "./skillSlice";
import social from "./socialSlice";

const rootReducer = {
  app,
  certification,
  job,
  met,
  nasa,
  rijks,
  skill,
  social,
};

export default rootReducer;
