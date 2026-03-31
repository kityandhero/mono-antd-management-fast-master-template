import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { BaseInnerPageList } from '../../../../ArticleSectionRelation/BaseInnerPageList';
import {
  fieldData,
  infoModeCollection,
} from '../../../../ArticleSectionRelation/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

@connect(({ articleSectionRelation, schedulingControl }) => ({
  articleSectionRelation,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  currentInfoMode = infoModeCollection.section;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      articleId: null,
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

  doWorkAdjustDidMount = () => {
    const { articleId } = this.state;

    this.currentExternalData = { articleId };
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { articleId } = this.state;

    d[fieldData.articleId.name] = articleId;

    return d;
  };
}

export default PageList;
