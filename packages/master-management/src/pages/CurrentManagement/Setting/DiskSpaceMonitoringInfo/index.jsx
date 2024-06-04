import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  forEach,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { buildInputItem } from '../../../../utils';
import {
  testDiskSpaceMonitoringConfigAction,
  testDiskSpaceMonitoringEmailAction,
} from '../../Assist/action';
import { fieldData, fieldDataHardDiskPartition } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class DiskSpaceMonitoringInfo extends TabPageBase {
  goToUpdateWhenProcessed = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagement/get',
      diskSpaceMonitoringSwitch: 0,
    };
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
    const diskSpaceMonitoringSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.diskSpaceMonitoringSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes
        ? whetherNumber.yes
        : whetherNumber.no;

    this.setState({ diskSpaceMonitoringSwitch });
  };

  testDiskSpaceMonitoringConfig = () => {
    const { metaData } = this.state;

    testDiskSpaceMonitoringConfigAction({
      target: this,
      handleData: metaData,
    });
  };

  testDiskSpaceMonitoringEmail = () => {
    const { metaData } = this.state;

    testDiskSpaceMonitoringEmailAction({
      target: this,
      handleData: metaData,
    });
  };

  showUpdateKeyValueInfoModal = ({
    fieldData: targetFieldData,
    editMode = keyValueEditModeCollection.string,
  }) => {
    this.setState(
      {
        targetFieldData,
        keyValueEditMode: editMode,
      },
      () => {
        UpdateKeyValueInfoModal.open();
      },
    );
  };

  afterUpdateKeyValueInfoModalOk = () => {
    this.reloadData({});
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
    const { firstLoadSuccess, metaData, diskSpaceMonitoringSwitch } =
      this.state;

    const listHardDiskPartition = getValueByKey({
      data: metaData,
      key: fieldData.listHardDiskPartition.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    let listData = [];

    forEach(listHardDiskPartition, (o) => {
      listData.push(
        {
          span: 1,
          label: fieldDataHardDiskPartition.partitionName.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.partitionName.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.totalSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.totalSpace.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.useSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.useSpace.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.freeSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.freeSpace.name,
          }),
        },
      );
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: listData,
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '90px',
                },
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘空间不足提醒开关',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden:
                  diskSpaceMonitoringSwitch === whetherNumber.no ||
                  !checkHasAuthority(
                    accessWayCollection.currentManagement
                      .testDiskSpaceMonitoringConfig.permission,
                  ),
                icon: iconBuilder.swap(),
                text: '测试基础配置',
                handleClick: () => {
                  this.testDiskSpaceMonitoringConfig();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden:
                  diskSpaceMonitoringSwitch === whetherNumber.no ||
                  !checkHasAuthority(
                    accessWayCollection.currentManagement
                      .testDiskSpaceMonitoringEmail.permission,
                  ),
                icon: iconBuilder.swap(),
                text: '测试邮件发送',
                handleClick: () => {
                  this.testDiskSpaceMonitoringEmail();
                },
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringSwitch,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.section.updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringSwitch.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '开启' : '关闭';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDriveLetter,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringDriveLetter.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringThreshold,
              editMode: keyValueEditModeCollection.number,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringThreshold.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '提醒短信',
              hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringSmsNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringSmsNotificationTemplate.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringPhone,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringPhone.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '提醒邮箱',
              hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailNotificationTemplate
                  .name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringFromEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringFromEmailName.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringFromEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringFromEmailAddress.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringToEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringToEmailName.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringToEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringToEmailAddress.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailSmtpServerHost,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailSmtpServerHost.name,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailSmtpServerPort,
              editMode: keyValueEditModeCollection.number,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailSmtpServerPort.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailSmtpServerUseSsl,
              editMode: keyValueEditModeCollection.whether,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailSmtpServerUseSsl.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '使用' : '不使用';
                },
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailSmtpServerAccount,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailSmtpServerAccount.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringEmailSmtpServerPassword,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.diskSpaceMonitoringEmailSmtpServerPassword.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
        <UpdateKeyValueInfoModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterOK={() => {
            this.afterUpdateKeyValueInfoModalOk();
          }}
        />
      </>
    );
  };
}

export default DiskSpaceMonitoringInfo;
