import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'a54ae4261f57494481f8f3d5b7d7b21a';

@connect(({ callCenterCategory, schedulingControl }) => ({
  callCenterCategory,
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
        modelTypeCollection.callCenterCategoryTypeCollection.pageListOperateLog,
      callCenterCategoryId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.callCenterCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.callCenterCategoryId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
