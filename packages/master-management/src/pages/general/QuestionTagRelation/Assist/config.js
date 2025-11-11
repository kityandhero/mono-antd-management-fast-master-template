export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionTagRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionTagRelationId } = currentState;

  const { questionTagRelationId: questionTagRelationIdPre } = preState;

  return questionTagRelationIdPre !== questionTagRelationId;
}
