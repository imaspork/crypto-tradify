import { DateTime } from "luxon";

function formatGraphData(graphData) {
  for (let i = 0; i < graphData.length; i++) {
    const dt = DateTime.fromISO(graphData[i].time);
    graphData[i].time = dt.toFormat("L/dd/yy");
  }
  return graphData;
}

export default formatGraphData;
