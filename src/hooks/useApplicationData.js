import { useEffect, useReducer } from "react";
import axios from "axios";


export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  const initialState = {
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  }



  const [state, dispatch] = useReducer(reducer, initialState)


function reducer(state, action) {
  const { day, days, appointments, interviewers, id, interview } = action;

  switch (action.type) {

    case SET_DAY: {
      return {
        ...state,
        day
      }
    }

    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days,
        appointments,
        interviewers
      }
    }

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview: interview && { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return {
        ...state,
        appointments
      }
    }

    case SET_SPOTS: {
      return {
        ...state,
        days,
      }
    }

    default: {
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )}
    }
  }


  function setSpots() {
    axios.get('/api/days')
    .then((values) => {
      dispatch({
        type: SET_SPOTS,
        days: values.data,
      })
    })
  }


  function bookInterview(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    })
    .then(() => {
      setSpots()
    })
    .catch((error) => {
      if (error) {
        console.log(error)
      }
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
      dispatch({
        type: SET_INTERVIEW,
        id,
        appointments
      });

    })
    .then(() => {
      setSpots()
    })
  }

  
  
  const setDay = day => dispatch({ type: SET_DAY, day });

  
  //updates application data from APIs
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = (event) => {
      const { type, id, interview } = JSON.parse(event.data)
      if (type === "SET_INTERVIEW") {
        dispatch({
          type: type,
          id: id,
          interview: interview
        })
        setSpots();
      }

      
      return () => webSocket.close();

    }

      
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((values) => {


      
      dispatch({
        type: SET_APPLICATION_DATA,
        days: values[0].data,
        appointments: values[1].data,
        interviewers: values[2].data
      })
    })  
  },
[]);
    
  


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}