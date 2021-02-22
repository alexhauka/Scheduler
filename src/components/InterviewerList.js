// interviewers:array  - an array of objects for each interviewer
// interviewer:number    - the id of an interviewer
// setInterviewer:function - accepts an interviewer id
import PropTypes from "prop-types";
import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "./InterviewerList.scss";




export default function InterviewerList(props) {


  const interviewerList = props.interviewers.map(interviewer => (
    <InterviewerListItem
      //this may break after taking out test data...
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  ));



  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};