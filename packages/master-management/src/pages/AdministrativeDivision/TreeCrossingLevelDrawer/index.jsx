import { connect } from 'easy-soft-dva';
import { checkHasAuthority, toNumber } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { ElasticityTree, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshSingleTreeListWithCrossingLevelCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '8e7ff0f9dad04b3386384893d4d7327a';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class TreeCrossingLevelDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 550,
      pageTitle: '指定节点树预览',
      loadApiPath: 'administrativeDivision/singleTreeListWithCrossingLevel',
      crossingLevel: 1,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    const { externalData, crossingLevel } = this.state;
    const { code } = externalData;

    d[fieldData.code.name] = code;
    d[fieldData.crossingLevel.name] = toNumber(crossingLevel);

    return d;
  };

  refreshSingleTreeListWithCrossingLevelCache = () => {
    refreshSingleTreeListWithCrossingLevelCacheAction({
      target: this,
      handleData: {},
    });
  };

  setCrossingLevelOne = () => {
    const that = this;

    that.setState(
      {
        crossingLevel: 1,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  setCrossingLevelTwo = () => {
    const that = this;

    that.setState(
      {
        crossingLevel: 2,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  establishExtraActionConfig = () => {
    const { crossingLevel } = this.state;

    return {
      list: [
        {
          buildType: extraBuildType.dropdown,
          icon: iconBuilder.fork(),
          size: 'default',
          text: `${crossingLevel}级级联`,
          handleData: {},
          hidden: false,
          // eslint-disable-next-line no-unused-vars
          handleButtonClick: ({ handleData }) => {
            this.reloadData({});
          },
          // eslint-disable-next-line no-unused-vars
          handleMenuClick: ({ key, handleData }) => {
            switch (key) {
              case 'setCrossingLevelOne': {
                this.setCrossingLevelOne();

                break;
              }

              case 'setCrossingLevelTwo': {
                this.setCrossingLevelTwo();

                break;
              }
            }
          },
          items: [
            {
              key: 'setCrossingLevelOne',
              icon: iconBuilder.form(),
              text: '设为 1 级级联',
            },
            {
              key: 'setCrossingLevelTwo',
              icon: iconBuilder.form(),
              text: '设为 2 级级联',
            },
          ],
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.clear(),
          text: '清除缓存',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.administrativeDivision
              .refreshSingleTreeListWithCrossingLevelCache.permission,
          ),
          handleClick: () => {
            this.refreshSingleTreeListWithCrossingLevelCache();
          },
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的是地区树型预览.',
        },
        {
          text: '此处仅显示可用状态的数据.',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaListData } = this.state;

    return (
      <div style={{ padding: '20px 20px' }}>
        <ElasticityTree
          listData={metaListData}
          dataConvert={(o) => {
            const { name: title, code: value } = o;

            return {
              title: `${title}【${value}】`,
              value,
            };
          }}
        />
      </div>
    );
  };
}

export { TreeCrossingLevelDrawer };
