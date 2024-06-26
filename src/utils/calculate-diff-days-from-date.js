export const calculateDiffDaysFromDate = (date) => {
  const inputDate = new Date(date);
  const today = new Date();
  const diffTimeInMilliseconds = inputDate - today;
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const diffDays = Math.ceil(diffTimeInMilliseconds / days);
  return diffDays;
};
