import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../../../modelBuilders';
import { BaseInnerPageList } from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.articleTypeCollection.pageListOperateLog,
      dateRangeFieldName: '操作时间',
      articleId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { articleId } = this.state;

    d[fieldData.articleId.name] = articleId;

    return d;
  };
}

export default PageList;
