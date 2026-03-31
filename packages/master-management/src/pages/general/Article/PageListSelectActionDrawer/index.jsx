import { connect } from 'easy-soft-dva';
import { getValueByKey, isFunction } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { getArticleStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'e15ab81555a943dabdd00e7d22702cca';

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class PageListArticleSelectActionDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.article.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '请选择',
      loadApiPath: modelTypeCollection.articleTypeCollection.pageList,
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const { externalData } = this.state;

    return { ...o, ...externalData };
  };

  onSelect = (selectData) => {
    PageListArticleSelectActionDrawer.close();

    const { afterSelect } = this.props;

    if (isFunction(afterSelect)) {
      afterSelect(selectData);
    }
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListViewSize = () => {
    return 'small';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.image.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // eslint-disable-next-line no-unused-vars
  establishPresetListViewItemInnerConfig = (item, index) => {
    return {
      image: getValueByKey({
        data: item,
        key: fieldData.image.name,
        defaultValue: defaultEmptyImage,
      }),
      title: {
        label: fieldData.title.label,
        text: getValueByKey({
          data: item,
          key: fieldData.title.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.description.label,
          text: getValueByKey({
            data: item,
            key: fieldData.description.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getArticleStatusName({
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
          label: fieldData.articleId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.articleId.name,
          }),
          canCopy: true,
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
      extra: {
        size: 'small',
        text: '选取',
        placement: 'topRight',
        icon: iconBuilder.select(),
        handleButtonClick: ({ handleData }) => {
          this.onSelect(handleData);
        },
        handleData: item,
        confirm: true,
        title: '即将设为此项，确定吗？',
      },
      // statusBarWrapperStyle: {
      //   paddingRight: '10px',
      // },
    };
  };
}

export { PageListArticleSelectActionDrawer };
