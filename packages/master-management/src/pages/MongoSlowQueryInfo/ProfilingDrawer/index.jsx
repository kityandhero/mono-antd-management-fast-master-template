import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildJsonView, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = 'f2fffebd3e304d4982088d542ffc9f10';

@connect(({ mongoSlowQueryInfo, schedulingControl }) => ({
  mongoSlowQueryInfo,
  schedulingControl,
}))
class ProfilingDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '当前 Profiling 状态信息',
      loadApiPath:
        modelTypeCollection.mongoSlowQueryInfoTypeCollection.getProfilingStatus,
    };
  }

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '操作信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildJsonView({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.profiling.name,
                }),
              }),
            },
          ],
        },
      ],
    };
  };
}

export { ProfilingDrawer };
