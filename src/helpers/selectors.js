export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  if (state.days.length < 1) {
    return [];
  }

  console.log(state.days);

  let appointmentsForDay = state.days.find(e => e.name === day);
  if (!appointmentsForDay) {
    return [];
  }
  console.log("appointmentsForDay", appointmentsForDay);

  console.log("DAY OF WEEK: ", appointmentsForDay.name, "---- given appointments:", appointmentsForDay.appointments);

  return (!appointmentsForDay || appointmentsForDay.appointments.length < 1) ? [] : appointmentsForDay.appointments.map(apptID => apptID = state.appointments[apptID]);

}