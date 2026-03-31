import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { buildNowTimeFieldItem } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '171403bb22d94100a3fdb36d4c80c27d';

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority = accessWayCollection.article.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增文章',
      submitApiPath: modelTypeCollection.articleTypeCollection.addBasicInfo,
    };
  }

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[fieldData.sort.name] = 0;

    return values;
  };

  establishCardCollectionConfig = () => {
    const { image } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.upload(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `/${modelTypeCollection.articleTypeCollection.uploadImage}`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介描述',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddBasicInfoDrawer };
