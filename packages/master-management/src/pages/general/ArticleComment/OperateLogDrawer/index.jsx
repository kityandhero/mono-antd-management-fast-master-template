import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'db473f81966e49e1a93819be7413530c';

@connect(({ articleComment, schedulingControl }) => ({
  articleComment,
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
        modelTypeCollection.articleCommentTypeCollection.pageListOperateLog,
      articleCommentId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.articleCommentId.name] = getValueByKey({
      data: externalData,
      key: fieldData.articleCommentId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
