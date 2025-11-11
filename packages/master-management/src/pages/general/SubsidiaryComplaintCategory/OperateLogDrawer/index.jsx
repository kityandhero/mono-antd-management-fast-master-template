import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'd206595325234d5e8804ea313989382e';

@connect(({ subsidiaryComplaintCategory, schedulingControl }) => ({
  subsidiaryComplaintCategory,
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
        modelTypeCollection.subsidiaryComplaintCategoryTypeCollection
          .pageListOperateLog,
      subsidiaryComplaintCategoryId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.subsidiaryComplaintCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintCategoryId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
