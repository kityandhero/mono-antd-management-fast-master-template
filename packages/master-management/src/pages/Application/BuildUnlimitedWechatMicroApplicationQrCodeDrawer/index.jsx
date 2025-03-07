import { connect } from 'easy-soft-dva';
import { getValueByKey, logConsole } from 'easy-soft-utility';

import { cardConfig, extraBuildType } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getUnlimitedWechatMicroApplicationQrCodeAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseNeedlessLoadDrawer } = DataDrawer;

const visibleFlag = '916b5f1f-1245-4190-b547-56ac5d4bd678';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class BuildUnlimitedWechatMicroApplicationQrCodeDrawer extends BaseNeedlessLoadDrawer {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  componentAuthority =
    accessWayCollection.application.getUnlimitedWechatMicroApplicationQrCode
      .permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '构建小程序码',
      imageBase64: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.applicationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationId.name,
    });

    return d;
  };

  getUnlimitedWechatMicroApplicationQrCode = (record) => {
    getUnlimitedWechatMicroApplicationQrCodeAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const wechatMicroApplicationQrCode = getValueByKey({
          data: remoteData,
          key: fieldData.wechatMicroApplicationQrCode.name,
        });

        target.setState({
          imageBase64: wechatMicroApplicationQrCode,
        });
      },
    });
  };

  establishExtraActionConfig = () => {
    const { externalData } = this.state;

    const applicationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationId.name,
    });

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.qrCode(),
          text: '立即构建',
          disabled: this.checkInProgress(),
          handleClick: () => {
            that.getUnlimitedWechatMicroApplicationQrCode({
              applicationId,
            });
          },
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { imageBase64 } = this.state;

    logConsole({ imageBase64 });

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.page,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.scene,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '二维码Base64值',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowTextarea,
              fieldData: fieldData.wechatMicroApplicationQrCode,
              value: imageBase64,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '二维码图片',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              fieldData: fieldData.wechatMicroApplicationQrCode,
              image: imageBase64,
              imageBoxContainorStyle: {
                width: '160px',
              },
            },
          ],
        },
      ],
    };
  };
}

export { BuildUnlimitedWechatMicroApplicationQrCodeDrawer };
