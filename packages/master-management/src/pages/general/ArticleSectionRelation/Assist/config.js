export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { articleSectionRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { articleSectionRelationId } = currentState;

  const { articleSectionRelationId: articleSectionRelationIdPre } = preState;

  return articleSectionRelationIdPre !== articleSectionRelationId;
}
