import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '892bdc623c3b488594ecd6c2af6c7a17';

@connect(({ qrCode, schedulingControl }) => ({
  qrCode,
  schedulingControl,
}))
class ChangeImageModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置图片',
      loadApiPath: modelTypeCollection.qrCodeTypeCollection.get,
      submitApiPath: modelTypeCollection.qrCodeTypeCollection.updateImage,
      image: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      image: '',
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const { image } = this.state;

    const d = this.supplementRequestParams(o);

    d[fieldData.imageUrl.name] = image;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.qrCodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.qrCodeId.name,
      defaultValue: '',
    });

    return d;
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
    const image = getValueByKey({
      data: metaData,
      key: fieldData.imageUrl.name,
    });

    this.setState({ image });
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.title.name,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { image } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              fieldData: fieldData.image,
              image,
              uploadProps: {
                singleMode: {
                  width: '100%',
                  emptyImage: '',
                },
              },
              action: `/qrCode/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
      ],
    };
  };
}

export { ChangeImageModal };
