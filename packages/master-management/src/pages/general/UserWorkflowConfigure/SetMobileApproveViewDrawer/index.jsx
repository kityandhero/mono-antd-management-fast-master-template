import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormFlowApproveActionModeSelect } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'f95423c760e3406ca5c4edf8032b840c';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetMobileApproveViewDrawer extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置移动端审批视图模式',
      loadApiPath: modelTypeCollection.userWorkflowConfigureTypeCollection.get,
      submitApiPath:
        modelTypeCollection.userWorkflowConfigureTypeCollection
          .setMobileApproveViewMode,
    };
  }

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
      values[fieldData.mobileApproveViewMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.mobileApproveViewMode.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { userWorkflowConfigureId } = externalData;

    d[fieldData.userWorkflowConfigureId.name] = userWorkflowConfigureId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.userWorkflowConfigureId.name] = getValueByKey({
      data: externalData,
      key: fieldData.userWorkflowConfigureId.name,
    });

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  ) => {
    return `设置移动端审批视图模式成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '70px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowApproveActionModeSelect({
                required: false,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { SetMobileApproveViewDrawer };
