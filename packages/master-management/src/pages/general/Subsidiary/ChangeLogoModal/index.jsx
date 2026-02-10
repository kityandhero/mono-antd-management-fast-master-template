import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '129e22f9955442edb4a0f2234efe3804';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class ChangeLogoModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置徽标',
      loadApiPath: modelTypeCollection.subsidiaryTypeCollection.get,
      submitApiPath: modelTypeCollection.subsidiaryTypeCollection.setLogo,
      logo: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      logo: '',
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const { logo } = this.state;

    const d = this.supplementRequestParams(o);

    d[fieldData.logo.name] = logo;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.subsidiaryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryId.name,
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
    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    this.setState({ logo });
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.shortName.name,
    });
  };

  afterImageUploadSuccess = (logo) => {
    this.setState({ logo });
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
    const { logo } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.logoUpload,
              fieldData: fieldData.logo,
              image: logo,
              uploadProps: {
                singleMode: {
                  width: '100%',
                  emptyImage: '',
                },
              },
              action: `/subsidiary/uploadImage`,
              afterUploadSuccess: (logoData) => {
                this.afterImageUploadSuccess(logoData);
              },
            },
          ],
        },
      ],
    };
  };
}

export { ChangeLogoModal };
