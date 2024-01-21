const shortenLongString = (val: string | undefined | null, trimToCharLength: number = 40): string => {
  return val
    ? val.length > trimToCharLength
      ? val.slice(0, trimToCharLength) + "..."
      : val.slice(0, trimToCharLength)
    : "N/A";
};

export default shortenLongString;
