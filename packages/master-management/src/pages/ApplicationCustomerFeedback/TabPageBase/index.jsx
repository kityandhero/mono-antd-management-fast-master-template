import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { DataForm } from 'antd-management-fast-framework';

import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

const { BaseUpdateFormTab } = DataForm;

class TabPageBase extends BaseUpdateFormTab {
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
    const { applicationCustomerFeedbackId } = this.state;

    d[fieldData.applicationCustomerFeedbackId.name] =
      applicationCustomerFeedbackId;

    return d;
  };
}

export { TabPageBase };
