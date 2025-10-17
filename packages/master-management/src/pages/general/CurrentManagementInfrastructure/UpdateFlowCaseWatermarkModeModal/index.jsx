import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormFlowCaseWatermarkModeSelect } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;
const visibleFlag = 'b8383e91a25b4c7c841e5a7dba5e7483';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class UpdateFlowCaseWatermarkModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '配置流程实例水印背景模式',
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
      submitApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection
          .updateKeyValueInfo,
      flowCaseEffectiveWatermarkMode: '',
    };
  }

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
    this.setState({
      flowCaseEffectiveWatermarkMode: getValueByKey({
        data: metaData,
        key: fieldData.flowCaseEffectiveWatermarkMode.name,
        convert: convertCollection.string,
      }),
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData, flowCaseEffectiveWatermarkMode } = this.state;

    d.tag = getValueByKey({
      data: metaData,
      key: fieldData.flowCaseEffectiveWatermarkModeTag.name,
      defaultValue: '',
    });

    d.value = flowCaseEffectiveWatermarkMode;

    return d;
  };

  buildTitleSubTextPrefix = () => {
    return '当前系统';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '未设置系统名称',
    });
  };

  onChange = (v) => {
    this.setState({ flowCaseEffectiveWatermarkMode: toString(v) });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '140px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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

    values[fieldData.flowCaseEffectiveWatermarkMode.name] = getValueByKey({
      data: metaData,
      key: fieldData.flowCaseEffectiveWatermarkMode.name,
      convert: convertCollection.string,
    });

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowCaseWatermarkModeSelect({
                onChange: (event) => {
                  this.onChange(event);
                },
              }),
              require: true,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '仅单体模式建议选择内存消息队列(有助于简化系统部署), 分布式应用请使用外部专用消息队列。',
        },
      ],
    };
  };
}

export { UpdateFlowCaseWatermarkModeModal };
