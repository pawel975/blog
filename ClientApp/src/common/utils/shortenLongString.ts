/**
 *
 * @param text to shorten
 * @param trimToCharLength of given characters length
 * @returns trimmed text with "..." on the end if trimmed
 */
const shortenLongString = (text: string | undefined | null, trimToCharLength: number = 40): string => {
  return text
    ? text.length > trimToCharLength
      ? text.slice(0, trimToCharLength) + "..."
      : text.slice(0, trimToCharLength)
    : "N/A";
};

export default shortenLongString;
