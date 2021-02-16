//takes in 3 props:
//
// days:    Array a list of day objects (each object includes an id, name, and spots)
// day:     String the currently selected day
// setDay:  Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";

import DayListItem from "components/DayListItem"


export default function DayList(props) {

  const dayList = props.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={event => props.setDay(day.id)}
    />
  ));

  return(
    <ul>
      {dayList}
    </ul>
  )
}