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

  function updateSpots() {
    axios.get('/api/days')
    .then((values) => {
      setState(prev => ({
        ...prev,
        days: values.data,
      }));
    })
  }


  function bookInterview(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      })
    })
    .then(() => {
      updateSpots()
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
    .then(() => {
      updateSpots()
    })
  }

  
  
  const setDay = day => setState({...state, day});

  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((values) => {
      // console.log(values[0].data)
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