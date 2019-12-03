import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";

// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return { ...state, day: action.day };
//     case SET_APPLICATION_DATA:
//       return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
//     case SET_INTERVIEW:
//       const { id, interview } = action;

//       return {
//         ...state,
//         days: state.days.map((day) => {
//           let spotCounts = 0;
//           if(day.name === state.day) {
//             if (interview && state.appointments[id].interview) {
//               spotCounts = 0;
//             } else if(interview) {
//               spotCounts = -1;
//             } else {
//               spotCounts = 1;
//             }
//           } 
//           return {...day,
//                   spots: day.spots + spotCounts};
//         }),
//         appointments: {
//           ...state.appointments,
//           [id]: {
//             ...state.appointments[action.id],
//             interview: action.interview ? {...interview} : null
//           } 
//         }
//       }

//     default:
//       throw new Error(
//         `Tried to reduce with unsupported action type: ${action.type}`
//       );
//   }
// }

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    // update the database with the interview data
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // if(state.appointments[id].interview === null) {
        // let dayObj = state.days.find(day => day.name === state.day);
        // state.days[dayObj.id - 1].spots--}
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // delete appointment slot from database
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        // let dayObj = state.days.find(day => day.name === state.day);
        // console.log('does this delete?', dayObj);
        // state.days[dayObj.id - 1].spots++
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};