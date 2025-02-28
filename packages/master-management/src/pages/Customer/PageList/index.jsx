import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ customer, schedulingControl }) => ({
  customer,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.customer.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '列表',
      paramsKey: accessWayCollection.customer.pageList.paramsKey,
      loadApiPath: modelTypeCollection.customerTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  goToEdit = (record) => {
    const customerId = getValueByKey({
      data: record,
      key: fieldData.customerId.name,
      defaultValue: '',
    });

    this.goToPath(`/customer/edit/load/${customerId}/key/basicInfo`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.customer.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.customer.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.friendlyName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherPhoneVerify,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      render: (value) => (
        <>
          {toNumber(value) === whetherNumber.yes
            ? iconBuilder.checkCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.closeCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )}
        </>
      ),
    },
    {
      dataTarget: fieldData.realName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.nickname,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
