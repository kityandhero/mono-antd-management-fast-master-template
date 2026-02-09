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

const visibleFlag = '1e8fcb120580443693b2cf7aa16c0f49';

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
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
      loadApiPath: modelTypeCollection.smsCategoryTypeCollection.get,
      submitApiPath:
        modelTypeCollection.smsCategoryTypeCollection.updateBasicInfo,
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

    d[fieldData.smsCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.smsCategoryId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { image, externalData } = this.state;

    d[fieldData.smsCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.smsCategoryId.name,
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

      values[fieldData.template.name] = getValueByKey({
        data: metaData,
        key: fieldData.template.name,
      });

      values[fieldData.firstParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.firstParamMaxLength.name,
      });

      values[fieldData.secondParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.secondParamMaxLength.name,
      });

      values[fieldData.threeParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.threeParamMaxLength.name,
      });

      values[fieldData.fourParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.fourParamMaxLength.name,
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

    const flag = getValueByKey({
      data: metaData,
      key: fieldData.flag.name,
      convert: convertCollection.number,
    });

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
              hidden: flag > 0,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.name,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
              }),
              hidden: flag === 0,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.template,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.firstParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.secondParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.threeParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.fourParamMaxLength,
              require: false,
            },
          ],
          instruction: [
            {
              title: '功能说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '参数最大长度最大值为100, 当设置为0时, 表示不限制长度.',
                },
              ],
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
              action: `/smsCategory/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介信息',
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '具有系统特征值的分类为系统内置, 部分数据不允许编辑',
        },
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
