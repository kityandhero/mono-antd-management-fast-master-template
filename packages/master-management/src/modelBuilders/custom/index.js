import { buildModel as buildCloudStorageModel } from './cloudStorage';
import { buildModel as buildGovernmentAffairManagerModel } from './governmentAffairManager';
import { buildModel as buildGovernmentAffairManagerRoleModel } from './governmentAffairManagerRole';
import { buildModel as buildUserYonYouCorrelationModel } from './userYonYouCorrelation';
import { buildModel as buildYonYouImportHistoryModel } from './yonYouImportHistory';
import { buildModel as buildYonYouPushMessageModel } from './yonYouPushMessage';

export function listModelBuilder() {
  const list = [];

  list.push(
    buildCloudStorageModel,
    buildGovernmentAffairManagerModel,
    buildGovernmentAffairManagerRoleModel,
    buildUserYonYouCorrelationModel,
    buildYonYouImportHistoryModel,
    buildYonYouPushMessageModel,
  );

  return list;
}
