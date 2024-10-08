import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { UserSelectModalField } from '../../User/SelectModalField';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'e4b322f1e27e49c3bea3822de4a14ccb';

@connect(({ workflowNodeApprover, schedulingControl }) => ({
  workflowNodeApprover,
  schedulingControl,
}))
class AddWorkflowNodeApproverDrawer extends BaseAddDrawer {
  destroyOnClose = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增节点审批人',
      submitApiPath:
        modelTypeCollection.workflowNodeApproverTypeCollection
          .addApproverBasicInfo,
      userId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;
    const { externalData } = this.props;

    d[fieldData.userId.name] = userId;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  };

  clearCustomerSelect = () => {
    this.setState({
      userId: '',
    });
  };

  afterCustomerSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldDataUser.userId.name,
      defaultValue: '0',
    });

    this.setState({
      userId: userId,
    });
  };

  afterCustomerClearSelect = () => {
    this.clearCustomerSelect();
  };

  establishCardCollectionConfig = () => {
    const { externalData } = this.props;

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
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldDataWorkflowNode.name.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldDataWorkflowNode.name.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 1,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审核人员',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectModalField
                  label={fieldData.userRealName.label}
                  afterSelectSuccess={(d) => {
                    this.afterCustomerSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterCustomerClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddWorkflowNodeApproverDrawer };
