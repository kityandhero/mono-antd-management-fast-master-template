export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userWorkflowConfigureId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userWorkflowConfigureId } = currentState;

  const { userWorkflowConfigureId: userWorkflowConfigureIdPre } = preState;

  return userWorkflowConfigureIdPre !== userWorkflowConfigureId;
}
