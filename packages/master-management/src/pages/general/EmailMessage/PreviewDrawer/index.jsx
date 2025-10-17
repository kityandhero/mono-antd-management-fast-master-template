import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
  toString,
  whetherString,
} from 'easy-soft-utility';

import {
  buildCustomGrid,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '975aeb89f3364f8ea523ca894928e07e';

@connect(({ emailMessage, schedulingControl }) => ({
  emailMessage,
  schedulingControl,
}))
class PreviewDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '邮件信息',
      loadApiPath: modelTypeCollection.emailMessageTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.emailMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.emailMessageId.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的邮件发送详情。',
        },
        {
          text: '发送失败的邮件不会重新发送。',
        },
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {buildCustomGrid({
            list: [
              {
                span: 2,
                label: fieldData.subject.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.subject.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.content.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.content.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.emailMessageId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.emailMessageId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.emailSenderAgentTitle.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.emailSenderAgentTitle.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.fromEmailName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.fromEmailName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.fromEmailAddress.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.fromEmailAddress.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.toEmailName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.toEmailName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.toEmailAddress.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.toEmailAddress.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.contentTypeNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.contentTypeNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.smtpServerHost.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smtpServerHost.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.smtpServerPort.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smtpServerPort.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.smtpServerUseSsl.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smtpServerUseSsl.name,
                  convert: convertCollection.string,
                  formatBuilder: (o) => {
                    return toString(o) === whetherString.yes ? '是' : '否';
                  },
                }),
              },
              {
                span: 1,
                label: fieldData.smtpServerAccount.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smtpServerAccount.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.smtpServerPassword.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smtpServerPassword.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.sendResult.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.sendResult.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.statusNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.statusNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.sendTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.sendTime.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.aggregateNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.aggregateNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.channelNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.channelNote.name,
                  convert: convertCollection.string,
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
                label: fieldData.createOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createOperatorId.name,
                  convert: convertCollection.string,
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
              {
                span: 1,
                label: fieldData.updateOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.updateOperatorId.name,
                  convert: convertCollection.string,
                }),
              },
            ],
            props: {
              bordered: true,
              size: 'small',
              column: 2,
              labelStyle: {
                width: '160px',
              },
              emptyValue: '暂无',
              emptyStyle: {
                color: '#ccc',
              },
              ellipsis: false,
            },
          })}
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { PreviewDrawer };
