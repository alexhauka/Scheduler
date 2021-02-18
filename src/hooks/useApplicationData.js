import { useState, useEffect } from "react";
import axios from "axios";
// import DayList from "components/DayList";
// import Appointment from "components/Appointment"
// import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });

    })
  }

  
  
  const setDay = day => setState({...state, day});

  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((values) => {
      setState(prev => ({
        ...prev,
        days: values[0].data,
        appointments: values[1].data,
        interviewers: values[2].data
      }));
    });
  }, []);



  return { state, setDay, bookInterview, cancelInterview }
}