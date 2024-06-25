import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import BaseInnerPageList from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

@connect(({ questionnaireResult, schedulingControl }) => ({
  questionnaireResult,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'questionnaireResult/pageListOperateLog',
      dateRangeFieldName: '操作时间',
      questionnaireResultId: null,
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
    const { questionnaireResultId } = this.state;

    d[fieldData.questionnaireResultId.name] = questionnaireResultId;

    return d;
  };
}

export default PageList;
