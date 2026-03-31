import { getValueByKey, handleItem, toNumber } from 'easy-soft-utility';

import { fieldData, statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  const statusAdjust = toNumber(status);

  switch (statusAdjust) {
    case statusCollection.online: {
      result = 'processing';
      break;
    }

    case statusCollection.offline: {
      result = 'error';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}

export function handleItemStatus({ target, handleData, remoteData }) {
  const id = getValueByKey({
    data: handleData,
    key: fieldData.articleId.name,
  });

  handleItem({
    target,
    value: id,
    compareValueHandler: (o) => {
      const { id: v } = o;

      return v;
    },
    handler: (d) => {
      const o = d;

      o[fieldData.status.name] = getValueByKey({
        data: remoteData,
        key: fieldData.status.name,
      });

      o[fieldData.statusNote.name] = getValueByKey({
        data: remoteData,
        key: fieldData.statusNote.name,
      });

      return d;
    },
  });
}

export function handleItemWhetherRecommend({ target, handleData, remoteData }) {
  const id = getValueByKey({
    data: handleData,
    key: fieldData.sectionId.name,
  });

  handleItem({
    target,
    value: id,
    compareValueHandler: (o) => {
      return getValueByKey({
        data: o,
        key: fieldData.sectionId.name,
      });
    },
    handler: (d) => {
      const o = d;

      o[fieldData.whetherRecommend.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherRecommend.name,
      });

      o[fieldData.whetherRecommendNote.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherRecommendNote.name,
      });

      return d;
    },
  });
}

export function handleItemWhetherTop({ target, handleData, remoteData }) {
  const id = getValueByKey({
    data: handleData,
    key: fieldData.sectionId.name,
  });

  handleItem({
    target,
    value: id,
    compareValueHandler: (o) => {
      return getValueByKey({
        data: o,
        key: fieldData.sectionId.name,
      });
    },
    handler: (d) => {
      const o = d;

      o[fieldData.whetherTop.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherTop.name,
      });

      o[fieldData.whetherTopNote.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherTopNote.name,
      });

      return d;
    },
  });
}

export function handleItemWhetherVisible({ target, handleData, remoteData }) {
  const id = getValueByKey({
    data: handleData,
    key: fieldData.sectionId.name,
  });

  handleItem({
    target,
    value: id,
    compareValueHandler: (o) => {
      return getValueByKey({
        data: o,
        key: fieldData.sectionId.name,
      });
    },
    handler: (d) => {
      const o = d;

      o[fieldData.whetherVisible.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherVisible.name,
      });

      o[fieldData.whetherVisibleNote.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherVisibleNote.name,
      });

      return d;
    },
  });
}
