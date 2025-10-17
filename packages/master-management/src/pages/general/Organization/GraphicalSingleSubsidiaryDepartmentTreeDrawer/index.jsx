import { G6, MindMap } from '@ant-design/graphs';

import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildOrganizationGraphConfig } from '../../../../utils';
import { fieldData } from '../../Subsidiary/Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const { treeToGraphData } = G6;

const visibleFlag = 'bd06b254017b42e28b993d8331ed255a';
@connect(({ organization, schedulingControl }) => ({
  organization,
  schedulingControl,
}))
class GraphicalSingleSubsidiaryDepartmentTreeDrawer extends BaseVerticalFlexDrawer {
  componentAuthority =
    accessWayCollection.organization.getGraphicalSingleSubsidiaryDepartment
      .permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.organizationTypeCollection
          .getGraphicalSingleSubsidiaryDepartment,
    };
  }

  getPresetPageTitle = () => {
    return '公司结构图示';
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.subsidiaryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      graphData: treeToGraphData(
        JSON.parse(
          JSON.stringify(
            metaData || {
              id: 'root',
              name: '加载中',
              value: {
                name: '加载中',
                level: 0,
              },
              children: [],
            },
          ),
        ),
      ),
    });
  };

  renderPresetContentContainorInnerTop = () => {
    const { graphData } = this.state;

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <MindMap {...buildOrganizationGraphConfig()} data={graphData} />
      </div>
    );
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处展示的是公司部门结构。',
        },
      ],
    };
  };
}

export { GraphicalSingleSubsidiaryDepartmentTreeDrawer };
