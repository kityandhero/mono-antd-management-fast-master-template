import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildAdministrativeDivisionModel } from './administrativeDivision';
import { buildModel as buildApplicationModel } from './application';
import { buildModel as buildApplicationNavigationModel } from './applicationNavigation';
import { buildModel as buildApplicationSourceModel } from './applicationSource';
import { buildModel as buildApplicationVersionModel } from './applicationVersion';
import { buildModel as buildArticleNotificationApplicationModel } from './articleNotificationApplication';
import { buildModel as buildBusinessSetModel } from './businessSet';
import { buildModel as buildCallCenterModel } from './callCenter';
import { buildModel as buildCallCenterCategoryModel } from './callCenterCategory';
import { buildModel as buildChannelModel } from './channel';
import { buildModel as buildChannelExecuteLogSwitchModel } from './channelExecuteLogSwitch';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCloudStorageModel } from './cloudStorage';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentManagementInfrastructureModel } from './currentManagementInfrastructure';
import { buildModel as buildDepartmentModel } from './department';
import { buildModel as buildEditorModel } from './editor';
import { buildModel as buildEmailSenderAgentModel } from './emailSenderAgent';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildExecuteLogModel } from './executeLog';
import { buildModel as buildGalleryModel } from './gallery';
import { buildModel as buildGalleryCategoryModel } from './galleryCategory';
import { buildModel as buildGeneralDiscourseModel } from './generalDiscourse';
import { buildModel as buildGeneralLogModel } from './generalLog';
import { buildModel as buildHostServiceModel } from './hostService';
import { buildModel as buildHostServiceLogModel } from './hostServiceLog';
import { buildModel as buildInternalTesterModel } from './internalTester';
import { buildModel as buildKeyValueApplicationModel } from './keyValueApplication';
import { buildModel as buildKeyValueInfrastructureModel } from './keyValueInfrastructure';
import { buildModel as buildKeyValueSectionModel } from './keyValueSection';
import { buildModel as buildKeyValueWorkflowModel } from './keyValueWorkflow';
import { buildModel as buildMasterManagerModel } from './masterManager';
import { buildModel as buildMasterManagerLoginLogModel } from './masterManagerLoginLog';
import { buildModel as buildMetaDataModel } from './metaData';
import { buildModel as buildMongoSlowQueryInfoModel } from './mongoSlowQueryInfo';
import { buildModel as buildOperationLogModel } from './operationLog';
import { buildModel as buildOptionPoolModel } from './optionPool';
import { buildModel as buildOrganizationModel } from './organization';
import { buildModel as buildPresetRoleModel } from './presetRole';
import { buildModel as buildQrCodeModel } from './qrCode';
import { buildModel as buildQrCodeCategoryModel } from './qrCodeCategory';
import { buildModel as buildQuestionModel } from './question';
import { buildModel as buildQuestionItemModel } from './questionItem';
import { buildModel as buildQuestionnaireModel } from './questionnaire';
import { buildModel as buildQuestionnaireQuestionModel } from './questionnaireQuestion';
import { buildModel as buildQuestionTagRelationModel } from './questionTagRelation';
import { buildModel as buildQueueInfoModel } from './queueInfo';
import { buildModel as buildSectionModel } from './section';
import { buildModel as buildSectionApplicationConfigModel } from './sectionApplicationConfig';
import { buildModel as buildSmsCategoryModel } from './smsCategory';
import { buildModel as buildSmsCategoryStatisticModel } from './smsCategoryStatistic';
import { buildModel as buildSmsLogModel } from './smsLog';
import { buildModel as buildSmsStatisticModel } from './smsStatistic';
import { buildModel as buildSqlEntityModel } from './sqlEntity';
import { buildModel as buildSqlLogModel } from './sqlLog';
import { buildModel as buildSubsidiaryModel } from './subsidiary';
import { buildModel as buildTagModel } from './tag';
import { buildModel as buildUploadHistoryModel } from './uploadHistory';
import { buildModel as buildUserModel } from './user';
import { buildModel as buildUserDepartmentInfoModel } from './userDepartmentInfo';
import { buildModel as buildUserDeviceModel } from './userDevice';
import { buildModel as buildUserLoginLogModel } from './userLoginLog';
import { buildModel as buildUserSubsidiaryInfoModel } from './userSubsidiaryInfo';
import { buildModel as buildWeChatMessageRecordModel } from './weChatMessageRecord';
import { buildModel as buildWorkflowModel } from './workflow';
import { buildModel as buildWorkflowBranchConditionModel } from './workflowBranchCondition';
import { buildModel as buildWorkflowBranchConditionItemModel } from './workflowBranchConditionItem';
import { buildModel as buildWorkflowCaseModel } from './workflowCase';
import { buildModel as buildWorkflowCaseFormAttachmentModel } from './workflowCaseFormAttachment';
import { buildModel as buildWorkflowCaseFormStorageModel } from './workflowCaseFormStorage';
import { buildModel as buildWorkflowCaseProcessHistoryModel } from './workflowCaseProcessHistory';
import { buildModel as buildWorkflowDebugCaseModel } from './workflowDebugCase';
import { buildModel as buildWorkflowDebugCaseFormAttachmentModel } from './workflowDebugCaseFormAttachment';
import { buildModel as buildWorkflowDebugCaseFormStorageModel } from './workflowDebugCaseFormStorage';
import { buildModel as buildWorkflowDebugCaseProcessHistoryModel } from './workflowDebugCaseProcessHistory';
import { buildModel as buildWorkflowFormDesignModel } from './workflowFormDesign';
import { buildModel as buildWorkflowLineModel } from './workflowLine';
import { buildModel as buildWorkflowNodeModel } from './workflowNode';
import { buildModel as buildWorkflowNodeApproverModel } from './workflowNodeApprover';
import { buildModel as buildWorkflowRangeEffectiveExternalDepartmentRelationModel } from './workflowRangeEffectiveExternalDepartmentRelation';
import { buildModel as buildWorkflowRangeEffectiveSubsidiaryRelationModel } from './workflowRangeEffectiveSubsidiaryRelation';

export function listModelBuilder() {
  const list = [];

  list.push(
    buildAccessWayModel,
    buildAdministrativeDivisionModel,
    buildApplicationModel,
    buildApplicationNavigationModel,
    buildApplicationSourceModel,
    buildApplicationVersionModel,
    buildArticleNotificationApplicationModel,
    buildBusinessSetModel,
    buildCallCenterModel,
    buildCallCenterCategoryModel,
    buildChannelModel,
    buildChannelExecuteLogSwitchModel,
    buildChannelSqlLogSwitchModel,
    buildCloudStorageModel,
    buildCurrentAccountModel,
    buildCurrentManagementInfrastructureModel,
    buildDepartmentModel,
    buildEditorModel,
    buildEmailSenderAgentModel,
    buildErrorLogModel,
    buildExecuteLogModel,
    buildGalleryModel,
    buildGalleryCategoryModel,
    buildGeneralDiscourseModel,
    buildGeneralLogModel,
    buildHostServiceModel,
    buildHostServiceLogModel,
    buildInternalTesterModel,
    buildKeyValueApplicationModel,
    buildKeyValueInfrastructureModel,
    buildKeyValueSectionModel,
    buildKeyValueWorkflowModel,
    buildMasterManagerModel,
    buildMasterManagerLoginLogModel,
    buildMetaDataModel,
    buildMongoSlowQueryInfoModel,
    buildOperationLogModel,
    buildOptionPoolModel,
    buildOrganizationModel,
    buildPresetRoleModel,
    buildQrCodeModel,
    buildQrCodeCategoryModel,
    buildQuestionModel,
    buildQuestionItemModel,
    buildQuestionnaireModel,
    buildQuestionnaireQuestionModel,
    buildQuestionTagRelationModel,
    buildQueueInfoModel,
    buildSectionModel,
    buildSectionApplicationConfigModel,
    buildSmsCategoryModel,
    buildSmsCategoryStatisticModel,
    buildSmsLogModel,
    buildSmsStatisticModel,
    buildSqlEntityModel,
    buildSqlLogModel,
    buildSubsidiaryModel,
    buildTagModel,
    buildUploadHistoryModel,
    buildUserModel,
    buildUserDepartmentInfoModel,
    buildUserDeviceModel,
    buildUserLoginLogModel,
    buildUserSubsidiaryInfoModel,
    buildWeChatMessageRecordModel,
    buildWorkflowModel,
    buildWorkflowBranchConditionModel,
    buildWorkflowBranchConditionItemModel,
    buildWorkflowCaseModel,
    buildWorkflowCaseFormAttachmentModel,
    buildWorkflowCaseFormStorageModel,
    buildWorkflowCaseProcessHistoryModel,
    buildWorkflowDebugCaseModel,
    buildWorkflowDebugCaseFormAttachmentModel,
    buildWorkflowDebugCaseFormStorageModel,
    buildWorkflowDebugCaseProcessHistoryModel,
    buildWorkflowFormDesignModel,
    buildWorkflowLineModel,
    buildWorkflowNodeModel,
    buildWorkflowNodeApproverModel,
    buildWorkflowRangeEffectiveExternalDepartmentRelationModel,
    buildWorkflowRangeEffectiveSubsidiaryRelationModel,
  );

  return list;
}
