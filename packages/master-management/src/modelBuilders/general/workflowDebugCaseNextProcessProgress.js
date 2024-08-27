import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { getByFlowCaseIdData } from '../../services/workflowDebugCaseNextProcessProgress';

export const workflowDebugCaseNextProcessProgressTypeCollection = {
  getByFlowCaseId: 'workflowDebugCaseNextProcessProgress/getByFlowCaseId',
};

export function buildModel() {
  return {
    namespace: 'workflowDebugCaseNextProcessProgress',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getByFlowCaseId(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(getByFlowCaseIdData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
