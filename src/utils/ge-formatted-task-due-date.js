export const getFormattedTaskDueDate = (dueDate) => {
  if (!dueDate) {
    return "";
  }
  let endDatePart = dueDate.match(/T(\d{2}:\d{2})/);
  let startDatePart = dueDate.match(/(\d{4}-\d{2}-\d{2})/);
  return `${startDatePart[0].trim()}T${endDatePart[1].trim()}`;
};
