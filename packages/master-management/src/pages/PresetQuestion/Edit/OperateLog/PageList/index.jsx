import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import BaseInnerPageList from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

@connect(({ presetQuestion, schedulingControl }) => ({
  presetQuestion,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'presetQuestion/pageListOperateLog',
      dateRangeFieldName: '操作时间',
      presetQuestionId: null,
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
    const { presetQuestionId } = this.state;

    d[fieldData.presetQuestionId.name] = presetQuestionId;

    return d;
  };
}

export default PageList;
