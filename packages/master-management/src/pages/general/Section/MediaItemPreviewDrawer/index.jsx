import { Empty } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { buildPlayer, iconBuilder } from 'antd-management-fast-component';
import {
  MobileContainor,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { MobilePreviewDrawer } = MobileContainor;

const visibleFlag = 'e6625de1d9294b8cbc3b857a655fda5c';

class MediaItemPreviewDrawer extends MobilePreviewDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      title: '12324',
      ...this.state,
    };
  }

  renderPresetTitleIcon = () => {
    return iconBuilder.read();
  };

  getPresetPageTitle = () => {
    return '媒体图文预览';
  };

  buildContentArea = () => {
    const { data } = this.props;

    if (!isArray(data)) {
      showSimpleErrorMessage('预览数据格式无效');

      return null;
    }

    const list = data.map((item, index) => {
      return { ...item, key: `data_${index}` };
    });

    if (list.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <>
        {list.map((o) => {
          return <div key={o.key}>{this.buildItem(o)}</div>;
        })}
      </>
    );
  };

  buildItem = (record) => {
    if ((record || null) == null) {
      return null;
    }

    const { image, text, multiText, video, audio } = {
      image: '',
      text: '',
      multiText: '',
      link: '',
      video: '',
      audio: '',
      attachment: '',
      ...record,
    };

    return (
      <>
        {checkStringIsNullOrWhiteSpace(image) ? null : (
          <img width="100%" src={record.image} />
        )}

        {checkStringIsNullOrWhiteSpace(text) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {text}
          </p>
        )}

        {checkStringIsNullOrWhiteSpace(multiText) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {multiText}
          </p>
        )}

        {checkStringIsNullOrWhiteSpace(video)
          ? null
          : buildPlayer({ url: video })}

        {checkStringIsNullOrWhiteSpace(audio)
          ? null
          : buildPlayer({ url: audio })}
      </>
    );
  };

  renderPresetInnerView = () => {
    return this.buildContentArea();
  };
}

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export { MediaItemPreviewDrawer };
