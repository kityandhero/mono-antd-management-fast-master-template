export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { emailStatisticId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { emailStatisticId } = currentState;

  const { emailStatisticId: emailStatisticIdPre } = preState;

  return emailStatisticIdPre !== emailStatisticId;
}
