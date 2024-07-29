import { connect } from 'easy-soft-dva';
import { checkHasAuthority, toNumber } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { ElasticityTree, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshSingleTreeListWithDefaultProvinceCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'c51c0e5d005740e1b0748e25d5cf48a8';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class TreeDefaultProvinceDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 550,
      pageTitle: '默认省节点树预览',
      loadApiPath: 'administrativeDivision/singleTreeListWithDefaultProvince',
      crossingLevel: 1,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    const { crossingLevel } = this.state;

    d[fieldData.crossingLevel.name] = toNumber(crossingLevel);

    return d;
  };

  refreshSingleTreeListWithDefaultProvinceCache = () => {
    refreshSingleTreeListWithDefaultProvinceCacheAction({
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
              .refreshSingleTreeListWithDefaultProvinceCache.permission,
          ),
          handleClick: () => {
            this.refreshSingleTreeListWithDefaultProvinceCache();
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
          text: '此图例显示的是默认省级地区树型预览.',
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
          listData={[...metaListData]}
          dataConvert={(o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          }}
        />
      </div>
    );
  };
}

export { TreeDefaultProvinceDrawer };
