export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionnaireResultId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionnaireResultId } = currentState;

  const { questionnaireResultId: questionnaireResultIdPre } = preState;

  return questionnaireResultIdPre !== questionnaireResultId;
}
