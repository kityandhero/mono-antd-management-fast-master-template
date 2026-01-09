import { connect } from 'easy-soft-dva';

import { iconBuilder } from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ databaseQueryEfficiency, schedulingControl }) => ({
  databaseQueryEfficiency,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  showSearchForm = false;

  componentAuthority =
    accessWayCollection.databaseQueryEfficiency.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '数据库查询效率列表',
      paramsKey:
        accessWayCollection.databaseQueryEfficiency.singleList.paramsKey,
      loadApiPath:
        modelTypeCollection.databaseQueryEfficiencyTypeCollection.singleList,
      currentRecord: null,
    };
  }

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
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
      dataTarget: fieldData.queryStatement,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.totalWorkerTime,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.totalElapsedTime,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.executionCount,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的是较为耗时的查询语句。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default SinglePage;
