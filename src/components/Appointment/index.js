import React, { useEffect } from 'react';

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from "./Status";
import Confirm from './Confirm';
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING ="SAVING";
const EDIT = "EDIT";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


// Appointment component comprised of the piecemeal components in this directory
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  // saves the interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => {
        transition(ERROR_SAVE, true);
    }) 
  };


  // asks the user to confirm before deleting
  function confirmDelete() {
    transition(CONFIRM);
  };

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
        transition(ERROR_DELETE, true);
    }) 
  };


  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);


  
  
  return(
    <article className="appointment" data-testid="appointment">
      
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={confirmDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving..."
        />
      )}
      {mode === EDIT && (
        <Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        name={props.interview.student}
        onSave={save}
        onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete the interview?"
          onCancel={() => back()}
          onConfirm={deleteInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error! Did not save successfully."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error! Did not delete successfully."
          onClose={() => back()}
        />
      )}
    </article>
  )
};