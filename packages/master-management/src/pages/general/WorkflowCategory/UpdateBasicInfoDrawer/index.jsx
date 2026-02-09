import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '285acd9c83b84fd3b94016c63d276d8a';

@connect(({ workflowCategory, schedulingControl }) => ({
  workflowCategory,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowCategoryTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowCategoryTypeCollection.updateBasicInfo,
      image: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      image: '',
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCategoryId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { image, externalData } = this.state;

    d[fieldData.workflowCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCategoryId.name,
    });
    d[fieldData.image.name] = image;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
      convert: convertCollection.string,
    });

    this.setState({
      image: image,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  getPresetPageTitle = () => {
    return '编辑类别信息';
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, image } = this.state;

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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 2 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
