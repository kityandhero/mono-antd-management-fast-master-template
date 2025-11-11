import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'eb60d67baa7f409cbd7abf8fd0346047';

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
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
        modelTypeCollection.positionGradeTypeCollection.pageListOperateLog,
      positionGradeId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.positionGradeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.positionGradeId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
