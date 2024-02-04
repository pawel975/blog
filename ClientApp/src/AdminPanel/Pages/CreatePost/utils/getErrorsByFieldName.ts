interface GeneralErrorObj {
  errorType: string;
  message: string;
}

/**
 *
 * @param errors array of errors to search in
 * @param fieldName of error searched in errors
 * @returns array of errors with error name of fieldName
 */
const getErrorsByFieldName = <TErrorObj extends GeneralErrorObj>(
  errors: TErrorObj[],
  fieldName: TErrorObj["errorType"]
) => errors.filter((err) => err.errorType === fieldName);

export default getErrorsByFieldName;
