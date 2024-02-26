// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ReasonTable, ReleaseVersion, ReferencesDetailNurse, DocumentDetailsNurse, OrganisationNotificationTable, Organisation, CustomerPatient, FacilityNotificationTable, NurseNotificationTable, TimeOffFacility, TimeOffNurse, JobTemplate, QuestionMessageItem, AskQuestionTable, JobBitTable, JobPostingTable, MessageItem, ChatHistoryTable, FacilityTable, NurseTable, UserTable, ReasonObj, NurseCancelObject, LocationsDetails, JobPreferences, UploadDocument, WorkExperienceDetail, EducationDetail, CertificationDetail } = initSchema(schema);

export {
  ReasonTable,
  ReleaseVersion,
  ReferencesDetailNurse,
  DocumentDetailsNurse,
  OrganisationNotificationTable,
  Organisation,
  CustomerPatient,
  FacilityNotificationTable,
  NurseNotificationTable,
  TimeOffFacility,
  TimeOffNurse,
  JobTemplate,
  QuestionMessageItem,
  AskQuestionTable,
  JobBitTable,
  JobPostingTable,
  MessageItem,
  ChatHistoryTable,
  FacilityTable,
  NurseTable,
  UserTable,
  ReasonObj,
  NurseCancelObject,
  LocationsDetails,
  JobPreferences,
  UploadDocument,
  WorkExperienceDetail,
  EducationDetail,
  CertificationDetail
};