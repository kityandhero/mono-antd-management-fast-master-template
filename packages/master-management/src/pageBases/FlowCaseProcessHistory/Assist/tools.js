import { flowCaseProcessHistoryStatusCollection } from '../../../customConfig';

export function getFlowCaseProcessHistoryStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseProcessHistoryStatusCollection.normal: {
      result = 'processing';
      break;
    }

    case flowCaseProcessHistoryStatusCollection.unknown: {
      result = 'warning';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}
