export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { articleId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { articleId } = currentState;

  const { articleId: articleIdPre } = preState;

  return articleIdPre !== articleId;
}
