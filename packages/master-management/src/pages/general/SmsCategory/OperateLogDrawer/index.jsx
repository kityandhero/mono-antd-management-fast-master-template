import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '7bdb4e3cdc844552a8e6e99033201646';

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
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
        modelTypeCollection.smsCategoryTypeCollection.pageListOperateLog,
      smsCategoryId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.smsCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.smsCategoryId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
