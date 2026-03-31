import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/section/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/section/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/section/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/section/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const getConfigureDataApiAddress = '/section/getConfigure';

export async function getConfigureData(parameters) {
  return request({
    api: getConfigureDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/section/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/section/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setImageDataApiAddress = '/section/setImage';

export async function setImageData(parameters) {
  return request({
    api: setImageDataApiAddress,
    params: parameters,
  });
}

export const setRectangleImageDataApiAddress = '/section/setRectangleImage';

export async function setRectangleImageData(parameters) {
  return request({
    api: setRectangleImageDataApiAddress,
    params: parameters,
  });
}

export const setContentInfoDataApiAddress = '/section/setContentInfo';

export async function setContentInfoData(parameters) {
  return request({
    api: setContentInfoDataApiAddress,
    params: parameters,
  });
}

export const setBusinessModeDataApiAddress = '/section/setBusinessMode';

export async function setBusinessModeData(parameters) {
  return request({
    api: setBusinessModeDataApiAddress,
    params: parameters,
  });
}

export const setRenderTypeDataApiAddress = '/section/setRenderType';

export async function setRenderTypeData(parameters) {
  return request({
    api: setRenderTypeDataApiAddress,
    params: parameters,
  });
}

export const setSortDataApiAddress = '/section/setSort';

export async function setSortData(parameters) {
  return request({
    api: setSortDataApiAddress,
    params: parameters,
  });
}

export const setParentIdDataApiAddress = '/section/setParentId';

export async function setParentIdData(parameters) {
  return request({
    api: setParentIdDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/section/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const toggleTopDataApiAddress = '/section/toggleTop';

export async function toggleTopData(parameters) {
  return request({
    api: toggleTopDataApiAddress,
    params: parameters,
  });
}

export const toggleVisibleDataApiAddress = '/section/toggleVisible';

export async function toggleVisibleData(parameters) {
  return request({
    api: toggleVisibleDataApiAddress,
    params: parameters,
  });
}

export const setReadSectionObtainScoreDataApiAddress =
  '/section/setReadSectionObtainScore';

export async function setReadSectionObtainScoreData(parameters) {
  return request({
    api: setReadSectionObtainScoreDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/section/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/section/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const setKeyValueInfoDataApiAddress = '/section/setKeyValueInfo';

export async function setKeyValueInfoData(parameters) {
  return request({
    api: setKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/section/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const getMediaItemDataApiAddress = '/section/getMediaItem';

export async function getMediaItemData(parameters) {
  return request({
    api: getMediaItemDataApiAddress,
    params: parameters,
  });
}

export const addMediaItemDataApiAddress = '/section/addMediaItem';

export async function addMediaItemData(parameters) {
  return request({
    api: addMediaItemDataApiAddress,
    params: parameters,
  });
}

export const updateMediaItemDataApiAddress = '/section/updateMediaItem';

export async function updateMediaItemData(parameters) {
  return request({
    api: updateMediaItemDataApiAddress,
    params: parameters,
  });
}

export const setMediaCollectionSortDataApiAddress =
  '/section/setMediaCollectionSort';

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: setMediaCollectionSortDataApiAddress,
    params: parameters,
  });
}

export const removeMediaItemDataApiAddress = '/section/removeMediaItem';

export async function removeMediaItemData(parameters) {
  return request({
    api: removeMediaItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/section/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/section/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/section/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const uploadAudioDataApiAddress = '/section/uploadAudio';

export async function uploadAudioData(parameters) {
  return request({
    api: uploadAudioDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/section/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}

export const uploadFileBase64DataApiAddress = '/section/uploadFileBase64';

export async function uploadFileBase64Data(parameters) {
  return request({
    api: uploadFileBase64DataApiAddress,
    params: parameters,
  });
}
