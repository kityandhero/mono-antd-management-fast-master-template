export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { presetQuestionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { presetQuestionId } = currentState;

  const { presetQuestionId: presetQuestionIdPre } = preState;

  return presetQuestionIdPre !== presetQuestionId;
}
