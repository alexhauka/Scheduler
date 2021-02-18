

export function getAppointmentsForDay(state, day) {
  let results = [];
  for (const weekday of state.days) {
    if (weekday.name === day) {
      for (const appointment of weekday.appointments) {
        const matchingAppointment = state.appointments[appointment]
        results.push({...matchingAppointment})
      }
    }
  }
  // console.log(results);
  return results;
}


export function getInterviewersForDay(state, day) {
  let results = [];
  for (const weekday of state.days) {
    if (weekday.name === day) {
      for (const interviewer of weekday.interviewers) {
        const matchingInterviewer = state.interviewers[interviewer]
        results.push({...matchingInterviewer})
      }
    }
  }
  // console.log(results);
  return results;
}


export function getInterview(state, interview) {
  let results = {};
  if (!interview) {
    return null;

  } else {
    const interviewer = interview.interviewer
    results.student = interview.student;
    results.interviewer = state.interviewers[interviewer];
    
  }

  return results;

}