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

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '59603cec25cb4b77a34f99a1fd2fb3dd';

@connect(({ databaseLock, schedulingControl }) => ({
  databaseLock,
  schedulingControl,
}))
class CommandDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '命令信息',
      loadApiPath:
        modelTypeCollection.databaseIndexSuggestionTypeCollection.getCommand,
      commandString: '',
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const command = getValueByKey({
      data: metaData,
      key: fieldData.command.name,
      defaultValue: '',
    });

    const commandStringFormat = format(command, {
      language: 'transactsql',
      tabWidth: 2,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
    });

    this.setState({
      commandString: commandStringFormat,
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
    const { commandString } = this.state;

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
      ],
    };
  };
}

export { CommandDrawer };
