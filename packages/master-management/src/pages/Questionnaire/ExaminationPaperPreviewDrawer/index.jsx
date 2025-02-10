import { Checkbox, Radio, Space, Typography } from 'antd';
import { Fragment } from 'react';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherString,
} from 'easy-soft-utility';

import { ScrollFacadeBox } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData as fieldDataQuestion } from '../../Question/Common/data';
import { fieldData as fieldDataQuestionItem } from '../../QuestionItem/Common/data';
import { fieldData } from '../Common/data';

const { Paragraph } = Typography;

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '0948d12e25a349b6a63cb59784f94777';

function buildJudgmentQuestion(o) {
  const questionId = getValueByKey({
    data: o,
    key: fieldDataQuestion.questionId.name,
    convert: convertCollection.string,
    defaultValue: '',
  });

  return (
    <>
      <Paragraph>
        {getValueByKey({
          data: o,
          key: fieldData.title.name,
        })}
      </Paragraph>

      <Radio.Group name={questionId}>
        <Space direction="vertical">
          <Radio
            key={`${questionId}_item_whether_${whetherString.yes}}`}
            value={whetherString.yes}
            style={{ color: '#000' }}
          >
            ✔
          </Radio>

          <Radio
            key={`${questionId}_item_whether_${whetherString.no}}`}
            value={whetherString.no}
            style={{ color: '#000' }}
          >
            ✖
          </Radio>
        </Space>
      </Radio.Group>
    </>
  );
}

function buildSingleSelectQuestion(o) {
  const questionId = getValueByKey({
    data: o,
    key: fieldDataQuestion.questionId.name,
    convert: convertCollection.string,
    defaultValue: '',
  });

  const listItem = getValueByKey({
    data: o,
    key: fieldDataQuestion.listItem.name,
    convert: convertCollection.array,
  });

  return (
    <>
      <Paragraph>
        {getValueByKey({
          data: o,
          key: fieldData.title.name,
        })}
      </Paragraph>

      <Radio.Group name={questionId}>
        <Space direction="vertical">
          {listItem.map((o, index) => {
            return (
              <Radio
                key={`${questionId}_item_${index}}`}
                value={getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.questionItemId.name,
                  convert: convertCollection.string,
                })}
                style={{ color: '#000' }}
              >
                {getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.title.name,
                })}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </>
  );
}

function buildMultiSelectQuestion(o) {
  const questionId = getValueByKey({
    data: o,
    key: fieldDataQuestion.questionId.name,
    convert: convertCollection.string,
    defaultValue: '',
  });

  const listItem = getValueByKey({
    data: o,
    key: fieldDataQuestion.listItem.name,
    convert: convertCollection.array,
  });

  return (
    <>
      <Paragraph>
        {getValueByKey({
          data: o,
          key: fieldData.title.name,
        })}
      </Paragraph>

      <Checkbox.Group name={questionId}>
        <Space direction="vertical">
          {listItem.map((o, index) => {
            return (
              <Checkbox
                key={`${questionId}_item_${index}}`}
                value={getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.questionItemId.name,
                  convert: convertCollection.string,
                })}
                style={{ color: '#000' }}
              >
                {getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.title.name,
                })}
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    </>
  );
}

@connect(({ questionnaire, schedulingControl }) => ({
  questionnaire,
  schedulingControl,
}))
class ExaminationPaperPreviewDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '试卷预览',
      loadApiPath:
        modelTypeCollection.questionnaireTypeCollection.getExaminationPaper,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.questionnaireId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionnaireId.name,
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
          text: '此处显示的短信发送详情。',
        },
        {
          text: '发送失败的短信不会重新发送。',
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

    const listQuestionJudgment = getValueByKey({
      data: metaData,
      key: fieldData.listQuestionJudgment.name,
      convert: convertCollection.array,
    });

    const listQuestionSingleSelect = getValueByKey({
      data: metaData,
      key: fieldData.listQuestionSingleSelect.name,
      convert: convertCollection.array,
    });

    const listQuestionMultiSelect = getValueByKey({
      data: metaData,
      key: fieldData.listQuestionMultiSelect.name,
      convert: convertCollection.array,
    });

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
          {listQuestionSingleSelect.map((o, index) => {
            return (
              <Fragment key={`question_singleSelect_${index}`}>
                {buildSingleSelectQuestion(o)}
              </Fragment>
            );
          })}

          {listQuestionMultiSelect.map((o, index) => {
            return (
              <Fragment key={`question_multiSelect_${index}`}>
                {buildMultiSelectQuestion(o)}
              </Fragment>
            );
          })}

          {listQuestionJudgment.map((o, index) => {
            return (
              <Fragment key={`question_judgment_${index}`}>
                {buildJudgmentQuestion(o)}
              </Fragment>
            );
          })}
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { ExaminationPaperPreviewDrawer };
