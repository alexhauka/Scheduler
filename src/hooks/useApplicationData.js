import { useEffect, useReducer } from "react";
import axios from "axios";

// reducer imported from src/reducers/application.js
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  }
  
  const [state, dispatch] = useReducer(reducer, initialState)
  

  function bookInterview(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
      // setSpots()
    })
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null });
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
        // setSpots();
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