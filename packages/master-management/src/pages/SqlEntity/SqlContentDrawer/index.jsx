import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  buildCustomGrid,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '3e5b44cedc1340a9bcfb1bf2aebd77be';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class SqlContentDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '表SQL信息',
      loadApiPath: 'sqlEntity/get',
      overlayButtonOpenText: '查看基础信息',
      overlayButtonCloseText: '关闭基础信息',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.name.name] = getValueByKey({
      data: externalData,
      key: fieldData.name.name,
      defaultValue: '',
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里是当前数据实体的SQL构建语句。',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '',
    });
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const sqlContent = getValueByKey({
      data: metaData,
      key: fieldData.sqlContent.name,
      defaultValue: '',
    });

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <SyntaxHighlighter
          language="sql"
          value={sqlContent}
          other={{ showLineNumbers: true, wrapLines: true }}
          style={{
            height: 'calc(100% - 14px)',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        />
      </div>
    );
  };

  renderOverlayContent = () => {
    const { metaData } = this.state;

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {buildCustomGrid({
          list: [
            {
              span: 1,
              label: fieldData.name.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
                defaultValue: '',
              }),
            },
            {
              span: 1,
              label: fieldData.label.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.label.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.tableName.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.tableName.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.namespace.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.namespace.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.assemblyFullName.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.assemblyFullName.name,
                defaultValue: '',
              }),
            },
          ],
          props: {
            bordered: true,
            size: 'small',
            column: 1,
            labelStyle: {
              width: '90px',
            },
            emptyValue: '暂无',
            ellipsis: false,
          },
        })}
      </div>
    );
  };
}

export { SqlContentDrawer };
