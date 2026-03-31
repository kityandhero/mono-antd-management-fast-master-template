import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/article/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/article/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/article/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/article/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setImageDataApiAddress = '/article/setImage';

export async function setImageData(parameters) {
  return request({
    api: setImageDataApiAddress,
    params: parameters,
  });
}

export const setRectangleImageDataApiAddress = '/article/setRectangleImage';

export async function setRectangleImageData(parameters) {
  return request({
    api: setRectangleImageDataApiAddress,
    params: parameters,
  });
}

export const setContentInfoDataApiAddress = '/article/setContentInfo';

export async function setContentInfoData(parameters) {
  return request({
    api: setContentInfoDataApiAddress,
    params: parameters,
  });
}

export const setRenderTypeDataApiAddress = '/article/setRenderType';

export async function setRenderTypeData(parameters) {
  return request({
    api: setRenderTypeDataApiAddress,
    params: parameters,
  });
}

export const setSortDataApiAddress = '/article/setSort';

export async function setSortData(parameters) {
  return request({
    api: setSortDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/article/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const toggleTopDataApiAddress = '/article/toggleTop';

export async function toggleTopData(parameters) {
  return request({
    api: toggleTopDataApiAddress,
    params: parameters,
  });
}

export const toggleVisibleDataApiAddress = '/article/toggleVisible';

export async function toggleVisibleData(parameters) {
  return request({
    api: toggleVisibleDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/article/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/article/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/article/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/article/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const getMediaItemDataApiAddress = '/article/getMediaItem';

export async function getMediaItemData(parameters) {
  return request({
    api: getMediaItemDataApiAddress,
    params: parameters,
  });
}

export const addMediaItemDataApiAddress = '/article/addMediaItem';

export async function addMediaItemData(parameters) {
  return request({
    api: addMediaItemDataApiAddress,
    params: parameters,
  });
}

export const updateMediaItemDataApiAddress = '/article/updateMediaItem';

export async function updateMediaItemData(parameters) {
  return request({
    api: updateMediaItemDataApiAddress,
    params: parameters,
  });
}

export const setMediaCollectionSortDataApiAddress =
  '/article/setMediaCollectionSort';

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: setMediaCollectionSortDataApiAddress,
    params: parameters,
  });
}

export const removeMediaItemDataApiAddress = '/article/removeMediaItem';

export async function removeMediaItemData(parameters) {
  return request({
    api: removeMediaItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/article/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/article/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/article/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const uploadAudioDataApiAddress = '/article/uploadAudio';

export async function uploadAudioData(parameters) {
  return request({
    api: uploadAudioDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/article/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}

export const uploadFileBase64DataApiAddress = '/article/uploadFileBase64';

export async function uploadFileBase64Data(parameters) {
  return request({
    api: uploadFileBase64DataApiAddress,
    params: parameters,
  });
}
