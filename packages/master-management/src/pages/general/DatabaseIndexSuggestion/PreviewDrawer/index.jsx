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

const visibleFlag = '05d6b538df0d4d0caf30c0f2def12915';

@connect(({ databaseIndexSuggestion, schedulingControl }) => ({
  databaseIndexSuggestion,
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
      key: fieldData.createIndexStatement.name,
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
                  span: 2,
                  label: fieldData.equalityColumns.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.equalityColumns.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.includedColumns.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.includedColumns.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.inequalityColumns.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.inequalityColumns.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.statement.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.statement.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.databaseName.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.databaseName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.tableName.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.tableName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.userSeeks.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.userSeeks.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.userScans.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.userScans.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageTotalUserCost.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageTotalUserCost.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.averageUserImpact.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldData.averageUserImpact.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '120px',
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
