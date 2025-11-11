import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'bb05e6ca963546b689d2b847d68d9916';

@connect(({ questionItem, schedulingControl }) => ({
  questionItem,
  schedulingControl,
}))
class OperateLogDrawer extends BasePageListDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.questionItemTypeCollection.pageListOperateLog,
      questionItemId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.questionItemId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionItemId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
