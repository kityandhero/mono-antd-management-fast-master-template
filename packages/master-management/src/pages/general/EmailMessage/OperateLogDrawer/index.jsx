import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '10fd8be6c81b4a7c822ddc6611a07bea';

@connect(({ emailMessage, schedulingControl }) => ({
  emailMessage,
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
        modelTypeCollection.emailMessageTypeCollection.pageListOperateLog,
      emailMessageId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.emailMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.emailMessageId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
