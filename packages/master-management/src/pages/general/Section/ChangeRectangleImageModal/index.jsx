import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'b48135dd293f48c7b9d912efa83c352e';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class ChangeRectangleImageModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置长方形配图',
      loadApiPath: modelTypeCollection.sectionTypeCollection.get,
      submitApiPath:
        modelTypeCollection.sectionTypeCollection.setRectangleImage,
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

    d[fieldData.rectangleImage.name] = image;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.sectionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.sectionId.name,
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
    const rectangleImage = getValueByKey({
      data: metaData,
      key: fieldData.rectangleImage.name,
    });

    this.setState({ image: rectangleImage });
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
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
              action: `/${modelTypeCollection.sectionTypeCollection.uploadImage}`,
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

export { ChangeRectangleImageModal };
