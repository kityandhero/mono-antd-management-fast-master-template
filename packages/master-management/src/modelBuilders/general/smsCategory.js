import {
  getTacitlyState,
  pretreatmentRemoteListData,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  addBasicInfoData,
  getData,
  pageListData,
  pageListOperateLogData,
  refreshCacheData,
  removeData,
  removeSingleTreeListCacheData,
  setDisableData,
  setEnableData,
  setImageData,
  setSortData,
  singleListData,
  singleTreeListData,
  updateBasicInfoData,
  uploadImageData,
} from '../../services/smsCategory';

export const smsCategoryTypeCollection = {
  pageList: 'smsCategory/pageList',
  singleList: 'smsCategory/singleList',
  singleTreeList: 'smsCategory/singleTreeList',
  get: 'smsCategory/get',
  addBasicInfo: 'smsCategory/addBasicInfo',
  updateBasicInfo: 'smsCategory/updateBasicInfo',
  setImage: 'smsCategory/setImage',
  setSort: 'smsCategory/setSort',
  setEnable: 'smsCategory/setEnable',
  setDisable: 'smsCategory/setDisable',
  remove: 'smsCategory/remove',
  removeSingleTreeListCache: 'smsCategory/removeSingleTreeListCache',
  refreshCache: 'smsCategory/refreshCache',
  uploadImage: 'smsCategory/uploadImage',
  pageListOperateLog: 'smsCategory/pageListOperateLog',
};

export function buildModel() {
  return {
    namespace: 'smsCategory',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
      *singleList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleListData, payload);

        const dataAdjust = pretreatmentRemoteListData({
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
      *singleTreeList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleTreeListData, payload);

        const dataAdjust = pretreatmentRemoteListData({
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
      *get(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(getData, payload);

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
      *addBasicInfo(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(addBasicInfoData, payload);

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
      *updateBasicInfo(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(updateBasicInfoData, payload);

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
      *setImage(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(setImageData, payload);

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
      *setSort(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(setSortData, payload);

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
      *setEnable(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(setEnableData, payload);

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
      *setDisable(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(setDisableData, payload);

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
      *remove(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(removeData, payload);

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
      *removeSingleTreeListCache(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(removeSingleTreeListCacheData, payload);

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
      *refreshCache(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(refreshCacheData, payload);

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
      *uploadImage(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(uploadImageData, payload);

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
      *pageListOperateLog(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListOperateLogData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
