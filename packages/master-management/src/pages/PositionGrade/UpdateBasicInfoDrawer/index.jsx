import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'd646854f851c45f295cbeb25939eeac4';

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑信息',
      loadApiPath: 'positionGrade/get',
      submitApiPath: 'positionGrade/updateBasicInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.positionGradeId = getValueByKey({
      data: externalData,
      key: fieldData.positionGradeId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.positionGradeId = getValueByKey({
      data: externalData,
      key: fieldData.positionGradeId.name,
    });

    return d;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 2 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
