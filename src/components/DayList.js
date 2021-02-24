import React from "react";

import DayListItem from "components/DayListItem";

// renders the schedule's days
export default function DayList(props) {

  const dayList = props.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={() => props.setDay(day.name)}
    />
  ));

  return(
    <ul>
      {dayList}
    </ul>
  )
};