export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { articleCommentId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { articleCommentId } = currentState;

  const { articleCommentId: articleCommentIdPre } = preState;

  return articleCommentIdPre !== articleCommentId;
}
