import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../../modelBuilders';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.article.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.articleTypeCollection.get,
      submitApiPath: modelTypeCollection.articleTypeCollection.updateBasicInfo,
      articleId: null,
      image: '',
      rectangleImage: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    const rectangleImage = getValueByKey({
      data: metaData,
      key: fieldData.rectangleImage.name,
    });

    const video = getValueByKey({
      data: metaData,
      key: fieldData.video.name,
    });

    const audio = getValueByKey({
      data: metaData,
      key: fieldData.audio.name,
    });

    const attachment = getValueByKey({
      data: metaData,
      key: fieldData.attachment.name,
    });

    this.setState({
      image,
      rectangleImage,
      video,
      audio,
      attachment,
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { articleId, image, rectangleImage, video, audio, attachment } =
      this.state;

    d[fieldData.articleId.name] = articleId;
    d[fieldData.image.name] = image;
    d[fieldData.rectangleImage.name] = rectangleImage;
    d[fieldData.video.name] = video;
    d[fieldData.audio.name] = audio;
    d[fieldData.attachment.name] = attachment;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterRectangleImageUploadSuccess = (image) => {
    this.setState({ rectangleImage: image });
  };

  afterVideoChangeSuccess = (video) => {
    this.setState({ video });
  };

  afterAudioChangeSuccess = (audio) => {
    this.setState({ audio });
  };

  afterAttachmentChangeSuccess = (attachment) => {
    this.setState({ attachment });
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

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.subtitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.subtitle.name,
      });

      values[fieldData.author.name] = getValueByKey({
        data: metaData,
        key: fieldData.author.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
        convert: convertCollection.number,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, image, rectangleImage, video, audio, attachment } =
      this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.upload(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `/${modelTypeCollection.articleTypeCollection.uploadImage}`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.upload(),
              title: fieldData.rectangleImage.label,
              helper: fieldData.rectangleImage.helper,
              image: rectangleImage,
              action: `/${modelTypeCollection.articleTypeCollection.uploadImage}`,
              afterUploadSuccess: (imageData) => {
                this.afterRectangleImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        {
          title: {
            text: '媒体、附件信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video: video,
              showPreview: true,
              action: `/${modelTypeCollection.articleTypeCollection.uploadVideo}`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio: audio,
              showPreview: true,
              action: `/${modelTypeCollection.articleTypeCollection.uploadAudio}`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.attachment,
              file: attachment,
              action: `/${modelTypeCollection.articleTypeCollection.uploadFile}`,
              afterChangeSuccess: (fileData) => {
                this.afterAttachmentChangeSuccess(fileData);
              },
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export default Index;
