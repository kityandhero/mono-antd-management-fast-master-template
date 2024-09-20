import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  statisticCaseLatestApproveCountData,
  statisticCaseNotificationWaitReadCountData,
  statisticCaseSubmitCountData,
  statisticCaseWaitApproveCountData,
  statisticDebugCaseLatestApproveCountData,
  statisticDebugCaseNotificationWaitReadCountData,
  statisticDebugCaseSubmitCountData,
  statisticDebugCaseWaitApproveCountData,
} from '../../services/workflowStatisticBase';

export const workflowStatisticBaseTypeCollection = {
  statisticCaseSubmitCount: 'workflowStatisticBase/statisticCaseSubmitCount',
  statisticDebugCaseSubmitCount:
    'workflowStatisticBase/statisticDebugCaseSubmitCount',
  statisticCaseLatestApproveCount:
    'workflowStatisticBase/statisticCaseLatestApproveCount',
  statisticDebugCaseLatestApproveCount:
    'workflowStatisticBase/statisticDebugCaseLatestApproveCount',
  statisticCaseWaitApproveCount:
    'workflowStatisticBase/statisticCaseWaitApproveCount',
  statisticDebugCaseWaitApproveCount:
    'workflowStatisticBase/statisticDebugCaseWaitApproveCount',
  statisticCaseNotificationWaitReadCount:
    'workflowStatisticBase/statisticCaseNotificationWaitReadCount',
  statisticDebugCaseNotificationWaitReadCount:
    'workflowStatisticBase/statisticDebugCaseNotificationWaitReadCount',
};

export function buildModel() {
  return {
    namespace: 'workflowStatisticBase',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *statisticCaseSubmitCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(statisticCaseSubmitCountData, payload);

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
      *statisticDebugCaseSubmitCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(statisticDebugCaseSubmitCountData, payload);

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
      *statisticCaseLatestApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticCaseLatestApproveCountData,
          payload,
        );

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
      *statisticDebugCaseLatestApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticDebugCaseLatestApproveCountData,
          payload,
        );

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
      *statisticCaseWaitApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(statisticCaseWaitApproveCountData, payload);

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
      *statisticDebugCaseWaitApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticDebugCaseWaitApproveCountData,
          payload,
        );

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
      *statisticCaseNotificationWaitReadCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticCaseNotificationWaitReadCountData,
          payload,
        );

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
      *statisticDebugCaseNotificationWaitReadCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticDebugCaseNotificationWaitReadCountData,
          payload,
        );

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
