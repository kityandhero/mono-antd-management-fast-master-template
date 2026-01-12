import { format } from 'sql-formatter';

import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  copyToClipboard,
  extraBuildType,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseNeedlessLoadDrawer } = DataDrawer;

const visibleFlag = 'bad05af2364442e59c6a0fd842046e14';

@connect(({ databaseQueryEfficiency, schedulingControl }) => ({
  databaseQueryEfficiency,
  schedulingControl,
}))
class PreviewDrawer extends BaseNeedlessLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '查询执行信息',
      commandString: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = () => {
    const { externalData } = this.state;

    const commandString = getValueByKey({
      data: externalData,
      key: fieldData.queryStatement.name,
      defaultValue: '',
    });

    const commandStringFormat = format(commandString, {
      language: 'transactsql',
      tabWidth: 2,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
    });

    this.setState({
      commandString: commandStringFormat,
    });
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      commandString: '',
    });
  };

  establishExtraActionConfig = () => {
    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.copy(),
          text: '复制命令',
          disabled: this.checkInProgress(),
          handleClick: () => {
            const { commandString } = that.state;

            copyToClipboard(commandString, false);
          },
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { externalData, commandString } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: fieldData.commandString,
              value: commandString,
              language: 'sql',
              innerProps: {
                wrapLines: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '执行信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.averageElapsedTime.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageElapsedTime.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageCpuTime.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageCpuTime.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageWaitTime.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageWaitTime.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageLogicalReads.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageLogicalReads.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageWrites.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageWrites.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.executionCount.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.executionCount.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
