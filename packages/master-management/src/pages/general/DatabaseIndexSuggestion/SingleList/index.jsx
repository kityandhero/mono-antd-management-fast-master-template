import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { CommandDrawer } from '../CommandDrawer';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ databaseIndexSuggestion, schedulingControl }) => ({
  databaseIndexSuggestion,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  showSearchForm = false;

  componentAuthority =
    accessWayCollection.databaseIndexSuggestion.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '数据库索引建议列表',
      paramsKey:
        accessWayCollection.databaseIndexSuggestion.singleList.paramsKey,
      loadApiPath:
        modelTypeCollection.databaseIndexSuggestionTypeCollection.singleList,
      currentRecord: null,
    };
  }

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  showCommandDrawer = () => {
    CommandDrawer.open();
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.read(),
          text: '获取命令信息',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.databaseIndexSuggestion.getCommand.permission,
          ),
          handleClick: () => {
            this.showCommandDrawer();
          },
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.createIndexStatement,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.databaseName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tableName,
      width: 260,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userSeeks,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageTotalUserCost,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageUserImpact,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '需要 VIEW SERVER STATE 权限。',
        },
        {
          text: '此处显示的是近期较为耗时的查询信息。',
        },
        {
          text: '建议在高峰期运行，以捕获更多真实的查询模式。',
        },
        {
          text: '对于频繁更新的表，索引过多会降低写入性能。',
        },
        {
          text: '不要盲目创建所有建议索引，需结合：查询频率、表数据量、现有索引情况、写入性能影响, 是否会影响写入性能, 是否与现有索引重复, 是否需要覆盖索引（INCLUDE 列）。',
        },
        {
          text: '建议不是绝对, 缺失索引 DMV 只是基于执行计划的统计推测，可能会重复或不适合实际业务。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <CommandDrawer maskClosable />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default SinglePage;
