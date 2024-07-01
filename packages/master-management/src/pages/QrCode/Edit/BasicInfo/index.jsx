import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
  toString,
  zeroString,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { singleTreeListAction as categorySingleTreeListAction } from '../../../QrCodeCategory/Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ qrCode, schedulingControl }) => ({
  qrCode,
  schedulingControl,
}))
class Index extends TabPageBase {
  goToUpdateWhenProcessed = true;

  componentAuthority = accessWayCollection.qrCode.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'qrCode/get',
      submitApiPath: 'qrCode/updateBasicInfo',
      qrCodeId: null,
      image: '',
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

  doOtherRemoteRequest = () => {
    this.loadCategoryTreeList();
  };

  loadCategoryTreeList = () => {
    categorySingleTreeListAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          categoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadCategoryTreeList = () => {
    this.loadCategoryTreeList();
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { qrCodeId } = this.state;

    d[fieldData.qrCodeId.name] = qrCodeId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { qrCodeId, image, categoryId } = this.state;

    d[fieldData.qrCodeId.name] = qrCodeId;
    d[fieldData.imageUrl.name] = image;
    d[fieldData.categoryId.name] = categoryId;

    return d;
  };

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
    const categoryId = getValueByKey({
      data: metaData,
      key: fieldData.categoryId.name,
      convert: convertCollection.string,
    });

    this.setState({
      categoryId: categoryId === zeroString ? '' : categoryId,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
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

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.url.name] = getValueByKey({
        data: metaData,
        key: fieldData.url.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, image, categoryId, categoryTreeData } = this.state;

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
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.categoryId,
              value: toString(categoryId),
              require: true,
              listData: categoryTreeData,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadCategoryTreeList();
                },
              }),
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              // eslint-disable-next-line no-unused-vars
              onChange: ({ value, label, extra }) => {
                this.setState({
                  categoryId: toString(value),
                });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.url,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '图片上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: `/gallery/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
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
            icon: iconBuilder.contacts(),
            text: '操作信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.createOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '80px',
                },
              },
            },
          ],
        },
      ],
    };
  };
}

export default Index;
