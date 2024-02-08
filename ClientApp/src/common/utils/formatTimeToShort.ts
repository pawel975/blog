const formatTimeToShort = (longTimeForm: string) => {
  const formattedTimeForm = new Date(longTimeForm).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedTimeForm;
};

export default formatTimeToShort;
