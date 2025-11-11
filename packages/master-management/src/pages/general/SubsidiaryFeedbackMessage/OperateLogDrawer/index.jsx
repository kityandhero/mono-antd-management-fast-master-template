import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '09501a6468024589b7b14e4ecbdf962d';

@connect(({ subsidiaryFeedbackMessage, schedulingControl }) => ({
  subsidiaryFeedbackMessage,
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
        modelTypeCollection.subsidiaryFeedbackMessageTypeCollection
          .pageListOperateLog,
      subsidiaryFeedbackMessageId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.subsidiaryFeedbackMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryFeedbackMessageId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
