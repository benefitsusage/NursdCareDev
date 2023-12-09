// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ReleaseVersion, ReferencesDetailNurse, DocumentDetailsNurse, OrganisationNotificationTable, Organisation, CustomerPatient, FacilityNotificationTable, NurseNotificationTable, TimeOffFacility, TimeOffNurse, JobTemplate, QuestionMessageItem, AskQuestionTable, JobBitTable, JobPostingTable, MessageItem, ChatHistoryTable, FacilityTable, NurseTable, UserTable, NurseCancelObject, LocationsDetails, JobPreferences, UploadDocument, WorkExperienceDetail, EducationDetail, CertificationDetail } = initSchema(schema);

export {
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
  NurseCancelObject,
  LocationsDetails,
  JobPreferences,
  UploadDocument,
  WorkExperienceDetail,
  EducationDetail,
  CertificationDetail
};