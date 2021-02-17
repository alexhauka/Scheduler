

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