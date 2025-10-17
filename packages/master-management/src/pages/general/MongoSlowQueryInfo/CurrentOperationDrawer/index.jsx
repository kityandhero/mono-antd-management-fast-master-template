import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildJsonView, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '25229c77b76140338508eafd2def423f';

@connect(({ mongoSlowQueryInfo, schedulingControl }) => ({
  mongoSlowQueryInfo,
  schedulingControl,
}))
class CurrentOperationDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '当前实时操作信息',
      loadApiPath:
        modelTypeCollection.mongoSlowQueryInfoTypeCollection
          .getCurrentOperations,
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
                  key: fieldData.currentOperation.name,
                }),
              }),
            },
          ],
        },
      ],
    };
  };
}

export { CurrentOperationDrawer };
