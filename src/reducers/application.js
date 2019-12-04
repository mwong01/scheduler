

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
    case SET_INTERVIEW:
      const { id, interview } = action;

      return {
        ...state,
        days: state.days.map((day) => {
          //render spot counts update
          let spotCounts = 0;
          if (day.name === state.day) {
            if (interview && state.appointments[id].interview) {
              spotCounts = 0;
            } else if (interview) {
              spotCounts = -1;
            } else {
              spotCounts = 1;
            }
          }
          return {
            ...day,
            spots: day.spots + spotCounts
          };
        }),
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? { ...interview } : null
          }
        }
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
