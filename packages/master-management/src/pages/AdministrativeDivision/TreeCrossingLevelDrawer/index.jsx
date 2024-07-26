import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { ElasticityTree, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshSingleTreeListWithCrossingLevelCacheAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '08e1f31d2ba54f2faf95bf96c8a1ff61';

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
      width: 420,
      pageTitle: '指定节点树预览',
      loadApiPath: 'administrativeDivision/singleTreeListWithCrossingLevel',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    d['wrapperName'] = '地区树';

    return d;
  };

  refreshSingleTreeListWithCrossingLevelCache = () => {
    refreshSingleTreeListWithCrossingLevelCacheAction({
      target: this,
      handleData: {},
    });
  };

  establishExtraActionConfig = () => {
    return {
      list: [
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
              title,
              value,
            };
          }}
        />
      </div>
    );
  };
}

export { TreeCrossingLevelDrawer };
