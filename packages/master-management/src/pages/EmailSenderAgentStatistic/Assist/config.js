export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { emailSenderAgentStatisticId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { emailSenderAgentStatisticId } = currentState;

  const { emailSenderAgentStatisticId: emailSenderAgentStatisticIdPre } =
    preState;

  return emailSenderAgentStatisticIdPre !== emailSenderAgentStatisticId;
}
