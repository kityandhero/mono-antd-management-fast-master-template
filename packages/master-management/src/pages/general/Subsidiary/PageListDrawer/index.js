import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  ColorText,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { getSubsidiaryStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '30f152b83bfd4b59a73b163bc85b9692';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageListDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.subsidiaryTypeCollection.pageList,
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getPresetPageTitle = () => {
    return '请选择企业';
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subsidiaryId,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.shortName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // eslint-disable-next-line no-unused-vars
  establishPresetListViewItemInnerConfig = (item, index) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      title: {
        label: fieldData.shortName.label,
        text: getValueByKey({
          data: item,
          key: fieldData.shortName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.fullName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.fullName.name,
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getSubsidiaryStatusName({
                value: status,
              })}
              randomColor
              randomSeed={status}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: fieldData.subsidiaryId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.subsidiaryId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.code.label,
          text: getValueByKey({
            data: item,
            key: fieldData.code.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.parentShortName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.parentShortName.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.sort.label,
          text: getValueByKey({
            data: item,
            key: fieldData.sort.name,
          }),
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
    };
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.logo.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };
}

export default PageListDrawer;
