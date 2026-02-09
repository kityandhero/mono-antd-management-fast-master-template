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
const visibleFlag = '98413e1014a441429d9c01a558975a91';

@connect(({ workflowCategory, schedulingControl }) => ({
  workflowCategory,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority =
    accessWayCollection.workflowCategory.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增信息',
      submitApiPath:
        modelTypeCollection.workflowCategoryTypeCollection.addBasicInfo,
      image: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      image: '',
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image } = this.state;

    d[fieldData.image.name] = image;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  getPresetPageTitle = () => {
    return '新增类别信息';
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
              fieldData: fieldData.name,
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
              action: `/workflowCategory/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
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
