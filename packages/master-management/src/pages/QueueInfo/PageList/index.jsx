import { connect } from 'easy-soft-dva';

import { searchCardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { tryPurgeAction, trySendAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { DequeueDrawer } from '../DequeueDrawer';
import { PeekDrawer } from '../PeekDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ queueInfo, schedulingControl }) => ({
  queueInfo,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '异常列表',
      paramsKey: accessWayCollection.queueInfo.pageList.paramsKey,
      loadApiPath: 'queueInfo/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'trySend': {
        this.trySend(handleData);
        break;
      }

      case 'tryPeek': {
        this.showPeekDrawer(handleData);
        break;
      }

      case 'tryDequeue': {
        this.showDequeueDrawer(handleData);
        break;
      }

      case 'tryPurge': {
        this.tryPurge(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  trySend = (r) => {
    trySendAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  tryPurge = (r) => {
    tryPurgeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  showPeekDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PeekDrawer.open();
    });
  };

  showDequeueDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      DequeueDrawer.open();
    });
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.edit(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'trySend',
          icon: iconBuilder.message(),
          text: '测试发送',
          confirm: true,
          title: '即将测试消息发送，确定吗？',
        },
        {
          key: 'tryPeek',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.read(),
          text: '测试读取',
        },
        {
          key: 'tryDequeue',
          icon: iconBuilder.read(),
          text: '尝试消费',
          confirm: true,
          title:
            '即将尝试消费队列数据,该操作会导致队列被移出，请谨慎操作，确定继续吗？',
        },
        {
          key: 'tryPurge',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.clear(),
          text: '尝试清空队列',
          confirm: true,
          title: '即将尝试清空队列，请谨慎操作，确定继续吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.count,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.queueInfoId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />

        <PeekDrawer maskClosable externalData={currentRecord} />

        <DequeueDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
