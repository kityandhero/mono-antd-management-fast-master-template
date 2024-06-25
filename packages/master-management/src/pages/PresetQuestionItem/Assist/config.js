export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { presetQuestionItemId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { presetQuestionItemId } = currentState;

  const { presetQuestionItemId: presetQuestionItemIdPre } = preState;

  return presetQuestionItemIdPre !== presetQuestionItemId;
}
