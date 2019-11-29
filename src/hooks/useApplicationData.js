import React, { useState , useEffect} from "react";
const axios = require('axios');

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => {
        return ({
          ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data
        })
      })
    })
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({...state, appointments});
  
    // update the database with the interview data
    return axios.put(`/api/appointments/${id}`, appointment).then(() => setState(prev => ({...state, appointments})))
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    // delete appointment slot from database
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => setState(prev => ({...prev, appointments})))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};