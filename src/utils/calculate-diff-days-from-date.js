export const calculateDiffDaysFromDate = (value) => {
  const date = new Date(value);
  const today = new Date();
  const diffTimeInMilliseconds = date - today;
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const diffDays = Math.ceil(diffTimeInMilliseconds / days);
  return diffDays;
};
