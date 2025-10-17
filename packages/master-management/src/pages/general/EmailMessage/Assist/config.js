export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { emailMessageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { emailMessageId } = currentState;

  const { emailMessageId: emailMessageIdPre } = preState;

  return emailMessageIdPre !== emailMessageId;
}
