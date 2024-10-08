import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '08c9bea3d09a4123b11c2112e6e9ee40';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.applicationNavigation.updateBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑导航项',
      loadApiPath: 'applicationNavigation/get',
      submitApiPath: 'applicationNavigation/updateBasicInfo',
      imageUrl: '',
      appHeadImage: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationNavigationId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationNavigationId.name,
    });

    return d;
  };

  fillInitialValuesAfterLoad = ({
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

      values[fieldData.uniqueMark.name] = getValueByKey({
        data: metaData,
        key: fieldData.uniqueMark.name,
      });

      values[fieldData.targetPath.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetPath.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.uniqueMark,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.targetPath,
              require: true,
            },
          ],
          instruction: [
            {
              title: '功能说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '唯一标记请保持同一页面路径下唯一, 不唯一情况下可能引发数据覆盖',
                },
                {
                  text: '应用请求接口时，传递页面路径，查找后返回对应导航',
                },
              ],
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
