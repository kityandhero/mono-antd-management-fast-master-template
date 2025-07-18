import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0d4d853d21b44dd092fb58fe6d3d24d1';

@connect(({ questionnaireQuestionRelation, schedulingControl }) => ({
  questionnaireQuestionRelation,
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
        modelTypeCollection.questionnaireQuestionRelationTypeCollection
          .pageListOperateLog,
      questionnaireQuestionRelationId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.questionnaireQuestionRelationId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionnaireQuestionRelationId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
