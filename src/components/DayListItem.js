//item takes 4 props:
//
// name:     String     the name of the day
// spots:    Number     the number of spots remaining
// selected: Boolean    true or false declaring that this day is selected
// setDay:   Function   accepts the name of the day eg. "Monday", "Tuesday"
import React from "react";
import classnames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining"
    }
    if (props.spots === 1) {
      return `${props.spots} spot remaining`
    }
    return `${props.spots} spots remaining`
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0

  })

  return (
    <li 
    className={dayClass}
    onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}