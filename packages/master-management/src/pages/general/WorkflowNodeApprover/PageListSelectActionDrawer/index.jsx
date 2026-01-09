import { connect } from 'easy-soft-dva';
import { getValueByKey, isFunction } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0290eff421b045fc9b2260f57e71a9c9';

@connect(({ workflowNodeApprover, schedulingControl }) => ({
  workflowNodeApprover,
  schedulingControl,
}))
class PageListWorkflowNodeApproverSelectActionDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowNodeApprover.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '请选择审批人',
      loadApiPath:
        modelTypeCollection.workflowNodeApproverTypeCollection.pageList,
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.state;

    return { ...o, ...externalData };
  };

  onSelect = (selectData) => {
    PageListWorkflowNodeApproverSelectActionDrawer.close();

    const { afterSelect } = this.props;

    if (isFunction(afterSelect)) {
      afterSelect(selectData);
    }
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListViewSize = () => {
    return 'small';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.inputNumber,
          fieldData: fieldData.serialNumber,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.avatar.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // eslint-disable-next-line no-unused-vars
  establishPresetListViewItemInnerConfig = (item, index) => {
    return {
      image: getValueByKey({
        data: item,
        key: fieldData.avatar.name,
        defaultValue: defaultEmptyImage,
      }),
      title: {
        label: fieldData.approverName.label,
        text: getValueByKey({
          data: item,
          key: fieldData.approverName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.workflowNodeName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.workflowNodeName.name,
          }),
          color: '#999999',
        },
        {
          label: fieldData.workflowName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.workflowName.name,
          }),
          color: '#999999',
        },
      ],
      actionList: [
        {
          label: fieldData.workflowNodeApproverId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.workflowNodeApproverId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
      extra: {
        size: 'small',
        text: '选取',
        placement: 'topRight',
        icon: iconBuilder.select(),
        handleButtonClick: ({ handleData }) => {
          this.onSelect(handleData);
        },
        handleData: item,
      },
      // statusBarWrapperStyle: {
      //   paddingRight: '10px',
      // },
    };
  };
}

export { PageListWorkflowNodeApproverSelectActionDrawer };
