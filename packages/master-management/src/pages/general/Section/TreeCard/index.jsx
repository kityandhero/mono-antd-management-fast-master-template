import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataOperation } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

const { BaseView } = DataOperation;

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class TreeCard extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.sectionTypeCollection.singleTreeList,
    };
  }

  // supplementLoadRequestParams = (o) => {
  //   const d = o;

  //   d['wrapperName'] = '栏目树';

  //   return d;
  // };

  goToPageList = (node) => {
    const { code } = node;

    this.goToPath(`/news/article/pageList/no/${code}`);
  };

  establishCardCollectionConfig = () => {
    const { metaListData } = this.state;

    return {
      list: [
        {
          title: {
            text: '栏目导航',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
                size: 'small',
              },
            ],
          },
          bordered: false,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              switcherIcon: iconBuilder.down(),
              onSelect: (selectedKeys, { node }) => {
                this.goToPageList(node);
              },
              listData: metaListData,
              dataConvert: (o) => {
                const {
                  name,
                  code: value,
                  key,
                  root,
                } = {
                  root: 0,
                  ...o,
                };

                return {
                  title: name,
                  value,
                  key,
                  root,
                };
              },
            },
          ],
        },
      ],
    };
  };

  renderFurther() {
    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  }
}

export { TreeCard };
