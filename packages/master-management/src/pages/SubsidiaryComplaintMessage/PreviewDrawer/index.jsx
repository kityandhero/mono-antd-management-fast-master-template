import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '117cacfd47064e8d841bc8e2dfa39229';

@connect(({ subsidiaryComplaintMessage, schedulingControl }) => ({
  subsidiaryComplaintMessage,
  schedulingControl,
}))
class PreviewDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '举报信息',
      loadApiPath: 'subsidiaryComplaintMessage/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintMessageId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
    });

    const imageList = listAttachment.map((item) => {
      const { url } = {
        url: '',
        ...item,
      };
      return url;
    });

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 2,
                  size: 'small',
                  labelStyle: {
                    width: '100px',
                  },
                  emptyValue: '暂无',
                  emptyStyle: {
                    color: '#ccc',
                  },
                },
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '附件列表',
              innerProps: {
                style: {
                  margin: '16px 0 16px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '回复内容',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.replyContent.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.replyContent.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 2,
                  size: 'small',
                  labelStyle: {
                    width: '100px',
                  },
                  emptyValue: '暂无',
                  emptyStyle: {
                    color: '#ccc',
                  },
                },
              }),
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
