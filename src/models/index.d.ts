import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";



type EagerNurseCancelObject = {
  readonly nurseId?: string | null;
  readonly nurseName?: string | null;
  readonly cancelNote?: string | null;
}

type LazyNurseCancelObject = {
  readonly nurseId?: string | null;
  readonly nurseName?: string | null;
  readonly cancelNote?: string | null;
}

export declare type NurseCancelObject = LazyLoading extends LazyLoadingDisabled ? EagerNurseCancelObject : LazyNurseCancelObject

export declare const NurseCancelObject: (new (init: ModelInit<NurseCancelObject>) => NurseCancelObject)

type EagerLocationsDetails = {
  readonly location_id?: string | null;
  readonly location_country?: string | null;
  readonly location_state?: string | null;
  readonly location_city?: string | null;
  readonly location_zipCode?: number | null;
  readonly location_fullAddress?: string | null;
}

type LazyLocationsDetails = {
  readonly location_id?: string | null;
  readonly location_country?: string | null;
  readonly location_state?: string | null;
  readonly location_city?: string | null;
  readonly location_zipCode?: number | null;
  readonly location_fullAddress?: string | null;
}

export declare type LocationsDetails = LazyLoading extends LazyLoadingDisabled ? EagerLocationsDetails : LazyLocationsDetails

export declare const LocationsDetails: (new (init: ModelInit<LocationsDetails>) => LocationsDetails)

type EagerJobPreferences = {
  readonly days?: (string | null)[] | null;
  readonly duration?: (string | null)[] | null;
  readonly timing?: (string | null)[] | null;
  readonly minDistance?: string | null;
  readonly maxDistance?: string | null;
  readonly minRate?: string | null;
  readonly maxRate?: string | null;
  readonly notLicensedStateHideJobs?: boolean | null;
  readonly showJobs?: string | null;
  readonly preferenceOption?: boolean | null;
}

type LazyJobPreferences = {
  readonly days?: (string | null)[] | null;
  readonly duration?: (string | null)[] | null;
  readonly timing?: (string | null)[] | null;
  readonly minDistance?: string | null;
  readonly maxDistance?: string | null;
  readonly minRate?: string | null;
  readonly maxRate?: string | null;
  readonly notLicensedStateHideJobs?: boolean | null;
  readonly showJobs?: string | null;
  readonly preferenceOption?: boolean | null;
}

export declare type JobPreferences = LazyLoading extends LazyLoadingDisabled ? EagerJobPreferences : LazyJobPreferences

export declare const JobPreferences: (new (init: ModelInit<JobPreferences>) => JobPreferences)

type EagerUploadDocument = {
  readonly proofType?: string | null;
  readonly issuingAuthority?: string | null;
  readonly issueDate?: string | null;
  readonly expirationDate?: string | null;
  readonly file?: string | null;
}

type LazyUploadDocument = {
  readonly proofType?: string | null;
  readonly issuingAuthority?: string | null;
  readonly issueDate?: string | null;
  readonly expirationDate?: string | null;
  readonly file?: string | null;
}

export declare type UploadDocument = LazyLoading extends LazyLoadingDisabled ? EagerUploadDocument : LazyUploadDocument

export declare const UploadDocument: (new (init: ModelInit<UploadDocument>) => UploadDocument)

type EagerWorkExperienceDetail = {
  readonly employerName?: string | null;
  readonly positionTitle?: string | null;
  readonly positionType?: string | null;
  readonly unit?: string | null;
  readonly hourseWorkedWeek?: string | null;
  readonly currentlyWorkingHere?: boolean | null;
  readonly endDate?: string | null;
  readonly startDate?: string | null;
}

type LazyWorkExperienceDetail = {
  readonly employerName?: string | null;
  readonly positionTitle?: string | null;
  readonly positionType?: string | null;
  readonly unit?: string | null;
  readonly hourseWorkedWeek?: string | null;
  readonly currentlyWorkingHere?: boolean | null;
  readonly endDate?: string | null;
  readonly startDate?: string | null;
}

export declare type WorkExperienceDetail = LazyLoading extends LazyLoadingDisabled ? EagerWorkExperienceDetail : LazyWorkExperienceDetail

export declare const WorkExperienceDetail: (new (init: ModelInit<WorkExperienceDetail>) => WorkExperienceDetail)

type EagerEducationDetail = {
  readonly educationType?: string | null;
  readonly educationDate?: string | null;
}

type LazyEducationDetail = {
  readonly educationType?: string | null;
  readonly educationDate?: string | null;
}

export declare type EducationDetail = LazyLoading extends LazyLoadingDisabled ? EagerEducationDetail : LazyEducationDetail

export declare const EducationDetail: (new (init: ModelInit<EducationDetail>) => EducationDetail)

type EagerCertificationDetail = {
  readonly certificationType?: string | null;
  readonly certificationDate?: string | null;
}

type LazyCertificationDetail = {
  readonly certificationType?: string | null;
  readonly certificationDate?: string | null;
}

export declare type CertificationDetail = LazyLoading extends LazyLoadingDisabled ? EagerCertificationDetail : LazyCertificationDetail

export declare const CertificationDetail: (new (init: ModelInit<CertificationDetail>) => CertificationDetail)

type EagerReleaseVersion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReleaseVersion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nursdConnectIOS?: string | null;
  readonly nursdFlowIOS?: string | null;
  readonly nursdCareIOS?: string | null;
  readonly nursdConnectAndroid?: string | null;
  readonly nursdFlowAndroid?: string | null;
  readonly nursdCareAndroid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReleaseVersion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReleaseVersion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nursdConnectIOS?: string | null;
  readonly nursdFlowIOS?: string | null;
  readonly nursdCareIOS?: string | null;
  readonly nursdConnectAndroid?: string | null;
  readonly nursdFlowAndroid?: string | null;
  readonly nursdCareAndroid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReleaseVersion = LazyLoading extends LazyLoadingDisabled ? EagerReleaseVersion : LazyReleaseVersion

export declare const ReleaseVersion: (new (init: ModelInit<ReleaseVersion>) => ReleaseVersion) & {
  copyOf(source: ReleaseVersion, mutator: (draft: MutableModel<ReleaseVersion>) => MutableModel<ReleaseVersion> | void): ReleaseVersion;
}

type EagerReferencesDetailNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReferencesDetailNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reference_name?: string | null;
  readonly reference_relationship?: string | null;
  readonly reference_position?: string | null;
  readonly reference_date_complete?: string | null;
  readonly reference_email?: string | null;
  readonly reference_contact_number?: string | null;
  readonly reference_with_your_work_org?: string | null;
  readonly reference_file?: string | null;
  readonly reference_verified?: boolean | null;
  readonly nurseTableID?: string | null;
  readonly reference_verified_comments?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReferencesDetailNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReferencesDetailNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reference_name?: string | null;
  readonly reference_relationship?: string | null;
  readonly reference_position?: string | null;
  readonly reference_date_complete?: string | null;
  readonly reference_email?: string | null;
  readonly reference_contact_number?: string | null;
  readonly reference_with_your_work_org?: string | null;
  readonly reference_file?: string | null;
  readonly reference_verified?: boolean | null;
  readonly nurseTableID?: string | null;
  readonly reference_verified_comments?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReferencesDetailNurse = LazyLoading extends LazyLoadingDisabled ? EagerReferencesDetailNurse : LazyReferencesDetailNurse

export declare const ReferencesDetailNurse: (new (init: ModelInit<ReferencesDetailNurse>) => ReferencesDetailNurse) & {
  copyOf(source: ReferencesDetailNurse, mutator: (draft: MutableModel<ReferencesDetailNurse>) => MutableModel<ReferencesDetailNurse> | void): ReferencesDetailNurse;
}

type EagerDocumentDetailsNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DocumentDetailsNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly document_type?: string | null;
  readonly document_name?: string | null;
  readonly issuing_body?: string | null;
  readonly expiration_date?: string | null;
  readonly document_front_image?: string | null;
  readonly document_back_image?: string | null;
  readonly document_upload_with_all_pages?: (string | null)[] | null;
  readonly document_verified?: boolean | null;
  readonly nurseTableID?: string | null;
  readonly status?: string | null;
  readonly verification_note?: string | null;
  readonly file?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDocumentDetailsNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DocumentDetailsNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly document_type?: string | null;
  readonly document_name?: string | null;
  readonly issuing_body?: string | null;
  readonly expiration_date?: string | null;
  readonly document_front_image?: string | null;
  readonly document_back_image?: string | null;
  readonly document_upload_with_all_pages?: (string | null)[] | null;
  readonly document_verified?: boolean | null;
  readonly nurseTableID?: string | null;
  readonly status?: string | null;
  readonly verification_note?: string | null;
  readonly file?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DocumentDetailsNurse = LazyLoading extends LazyLoadingDisabled ? EagerDocumentDetailsNurse : LazyDocumentDetailsNurse

export declare const DocumentDetailsNurse: (new (init: ModelInit<DocumentDetailsNurse>) => DocumentDetailsNurse) & {
  copyOf(source: DocumentDetailsNurse, mutator: (draft: MutableModel<DocumentDetailsNurse>) => MutableModel<DocumentDetailsNurse> | void): DocumentDetailsNurse;
}

type EagerOrganisationNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrganisationNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly organisationTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganisationNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrganisationNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly organisationTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrganisationNotificationTable = LazyLoading extends LazyLoadingDisabled ? EagerOrganisationNotificationTable : LazyOrganisationNotificationTable

export declare const OrganisationNotificationTable: (new (init: ModelInit<OrganisationNotificationTable>) => OrganisationNotificationTable) & {
  copyOf(source: OrganisationNotificationTable, mutator: (draft: MutableModel<OrganisationNotificationTable>) => MutableModel<OrganisationNotificationTable> | void): OrganisationNotificationTable;
}

type EagerOrganisation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organisation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly organisationName?: string | null;
  readonly locations?: (LocationsDetails | null)[] | null;
  readonly mobileId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganisation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organisation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly organisationName?: string | null;
  readonly locations?: (LocationsDetails | null)[] | null;
  readonly mobileId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organisation = LazyLoading extends LazyLoadingDisabled ? EagerOrganisation : LazyOrganisation

export declare const Organisation: (new (init: ModelInit<Organisation>) => Organisation) & {
  copyOf(source: Organisation, mutator: (draft: MutableModel<Organisation>) => MutableModel<Organisation> | void): Organisation;
}

type EagerCustomerPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerPatient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly patient_first_name?: string | null;
  readonly patient_last_name?: string | null;
  readonly patient_address_line_1?: string | null;
  readonly patient_address_line_2?: string | null;
  readonly patient_city_id?: string | null;
  readonly patient_city?: string | null;
  readonly patient_state?: string | null;
  readonly patient_zip_code?: string | null;
  readonly patient_gender?: string | null;
  readonly patient_phone?: string | null;
  readonly patient_email?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly patient_phone_2?: string | null;
  readonly active?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomerPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerPatient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly patient_first_name?: string | null;
  readonly patient_last_name?: string | null;
  readonly patient_address_line_1?: string | null;
  readonly patient_address_line_2?: string | null;
  readonly patient_city_id?: string | null;
  readonly patient_city?: string | null;
  readonly patient_state?: string | null;
  readonly patient_zip_code?: string | null;
  readonly patient_gender?: string | null;
  readonly patient_phone?: string | null;
  readonly patient_email?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly patient_phone_2?: string | null;
  readonly active?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CustomerPatient = LazyLoading extends LazyLoadingDisabled ? EagerCustomerPatient : LazyCustomerPatient

export declare const CustomerPatient: (new (init: ModelInit<CustomerPatient>) => CustomerPatient) & {
  copyOf(source: CustomerPatient, mutator: (draft: MutableModel<CustomerPatient>) => MutableModel<CustomerPatient> | void): CustomerPatient;
}

type EagerFacilityNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FacilityNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFacilityNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FacilityNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FacilityNotificationTable = LazyLoading extends LazyLoadingDisabled ? EagerFacilityNotificationTable : LazyFacilityNotificationTable

export declare const FacilityNotificationTable: (new (init: ModelInit<FacilityNotificationTable>) => FacilityNotificationTable) & {
  copyOf(source: FacilityNotificationTable, mutator: (draft: MutableModel<FacilityNotificationTable>) => MutableModel<FacilityNotificationTable> | void): FacilityNotificationTable;
}

type EagerNurseNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NurseNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly nurseTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNurseNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NurseNotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly imageURL?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly navigationScreen?: string | null;
  readonly navigationData?: string | null;
  readonly visited?: boolean | null;
  readonly visitNotification?: boolean | null;
  readonly notificationDotTypeColor?: string | null;
  readonly url?: string | null;
  readonly nurseTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NurseNotificationTable = LazyLoading extends LazyLoadingDisabled ? EagerNurseNotificationTable : LazyNurseNotificationTable

export declare const NurseNotificationTable: (new (init: ModelInit<NurseNotificationTable>) => NurseNotificationTable) & {
  copyOf(source: NurseNotificationTable, mutator: (draft: MutableModel<NurseNotificationTable>) => MutableModel<NurseNotificationTable> | void): NurseNotificationTable;
}

type EagerTimeOffFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeOffFacility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeOffReason?: string | null;
  readonly startDate?: string | null;
  readonly startTime?: string | null;
  readonly endDate?: string | null;
  readonly endTime?: string | null;
  readonly alternateContactNumber?: string | null;
  readonly phoneNumber?: string | null;
  readonly comments?: string | null;
  readonly facilityTableID?: string | null;
  readonly status?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeOffFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeOffFacility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeOffReason?: string | null;
  readonly startDate?: string | null;
  readonly startTime?: string | null;
  readonly endDate?: string | null;
  readonly endTime?: string | null;
  readonly alternateContactNumber?: string | null;
  readonly phoneNumber?: string | null;
  readonly comments?: string | null;
  readonly facilityTableID?: string | null;
  readonly status?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeOffFacility = LazyLoading extends LazyLoadingDisabled ? EagerTimeOffFacility : LazyTimeOffFacility

export declare const TimeOffFacility: (new (init: ModelInit<TimeOffFacility>) => TimeOffFacility) & {
  copyOf(source: TimeOffFacility, mutator: (draft: MutableModel<TimeOffFacility>) => MutableModel<TimeOffFacility> | void): TimeOffFacility;
}

type EagerTimeOffNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeOffNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeOffReason?: string | null;
  readonly startDate?: string | null;
  readonly startTime?: string | null;
  readonly endDate?: string | null;
  readonly endTime?: string | null;
  readonly alternateContactNumber?: string | null;
  readonly phoneNumber?: string | null;
  readonly comments?: string | null;
  readonly nurseTableID?: string | null;
  readonly approvedManager?: string | null;
  readonly notApprovedManager?: string | null;
  readonly cancelManager?: string | null;
  readonly nurseCancelNotes?: string | null;
  readonly status?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeOffNurse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeOffNurse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeOffReason?: string | null;
  readonly startDate?: string | null;
  readonly startTime?: string | null;
  readonly endDate?: string | null;
  readonly endTime?: string | null;
  readonly alternateContactNumber?: string | null;
  readonly phoneNumber?: string | null;
  readonly comments?: string | null;
  readonly nurseTableID?: string | null;
  readonly approvedManager?: string | null;
  readonly notApprovedManager?: string | null;
  readonly cancelManager?: string | null;
  readonly nurseCancelNotes?: string | null;
  readonly status?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeOffNurse = LazyLoading extends LazyLoadingDisabled ? EagerTimeOffNurse : LazyTimeOffNurse

export declare const TimeOffNurse: (new (init: ModelInit<TimeOffNurse>) => TimeOffNurse) & {
  copyOf(source: TimeOffNurse, mutator: (draft: MutableModel<TimeOffNurse>) => MutableModel<TimeOffNurse> | void): TimeOffNurse;
}

type EagerJobTemplate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobTemplate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly licenseType?: (string | null)[] | null;
  readonly shiftTitle?: string | null;
  readonly specialty?: string | null;
  readonly certification?: (string | null)[] | null;
  readonly yearOfExperience?: string | null;
  readonly expiration?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly break?: string | null;
  readonly selectCustomer?: string | null;
  readonly unit?: string | null;
  readonly floor?: string | null;
  readonly untitledfield?: string | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly baseRate?: string | null;
  readonly enableBid?: boolean | null;
  readonly notes?: string | null;
  readonly jobType?: string | null;
  readonly maxBidAmount?: string | null;
  readonly jobShiftTimingType?: string | null;
  readonly jobTiming?: string | null;
  readonly jobTemplateName: string;
  readonly autoAcceptedEnable?: boolean | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly certificationRequired?: boolean | null;
  readonly specialtyRequired?: boolean | null;
  readonly experienceRequired?: boolean | null;
  readonly emrehrRequired?: boolean | null;
  readonly customerVisibility?: boolean | null;
  readonly organization?: string | null;
  readonly baseRateVisibility?: boolean | null;
  readonly location_id?: string | null;
  readonly jobPostingTableFacilityTableId?: string | null;
  readonly startDateTimeStamp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobTemplate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobTemplate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly licenseType?: (string | null)[] | null;
  readonly shiftTitle?: string | null;
  readonly specialty?: string | null;
  readonly certification?: (string | null)[] | null;
  readonly yearOfExperience?: string | null;
  readonly expiration?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly break?: string | null;
  readonly selectCustomer?: string | null;
  readonly unit?: string | null;
  readonly floor?: string | null;
  readonly untitledfield?: string | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly baseRate?: string | null;
  readonly enableBid?: boolean | null;
  readonly notes?: string | null;
  readonly jobType?: string | null;
  readonly maxBidAmount?: string | null;
  readonly jobShiftTimingType?: string | null;
  readonly jobTiming?: string | null;
  readonly jobTemplateName: string;
  readonly autoAcceptedEnable?: boolean | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly certificationRequired?: boolean | null;
  readonly specialtyRequired?: boolean | null;
  readonly experienceRequired?: boolean | null;
  readonly emrehrRequired?: boolean | null;
  readonly customerVisibility?: boolean | null;
  readonly organization?: string | null;
  readonly baseRateVisibility?: boolean | null;
  readonly location_id?: string | null;
  readonly jobPostingTableFacilityTableId?: string | null;
  readonly startDateTimeStamp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobTemplate = LazyLoading extends LazyLoadingDisabled ? EagerJobTemplate : LazyJobTemplate

export declare const JobTemplate: (new (init: ModelInit<JobTemplate>) => JobTemplate) & {
  copyOf(source: JobTemplate, mutator: (draft: MutableModel<JobTemplate>) => MutableModel<JobTemplate> | void): JobTemplate;
}

type EagerQuestionMessageItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuestionMessageItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly askquestiontableID: string;
  readonly nurseTableID?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestionMessageItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuestionMessageItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly askquestiontableID: string;
  readonly nurseTableID?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type QuestionMessageItem = LazyLoading extends LazyLoadingDisabled ? EagerQuestionMessageItem : LazyQuestionMessageItem

export declare const QuestionMessageItem: (new (init: ModelInit<QuestionMessageItem>) => QuestionMessageItem) & {
  copyOf(source: QuestionMessageItem, mutator: (draft: MutableModel<QuestionMessageItem>) => MutableModel<QuestionMessageItem> | void): QuestionMessageItem;
}

type EagerAskQuestionTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AskQuestionTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly senderPublicKey?: string | null;
  readonly senderSecretKey?: string | null;
  readonly receiverPublicKey?: string | null;
  readonly receiverSecretKey?: string | null;
  readonly NurseTable?: NurseTable | null;
  readonly FacilityTable?: FacilityTable | null;
  readonly QuestionMessageItems?: (QuestionMessageItem | null)[] | null;
  readonly jobId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly askQuestionTableNurseTableId?: string | null;
  readonly askQuestionTableFacilityTableId?: string | null;
}

type LazyAskQuestionTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AskQuestionTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly senderPublicKey?: string | null;
  readonly senderSecretKey?: string | null;
  readonly receiverPublicKey?: string | null;
  readonly receiverSecretKey?: string | null;
  readonly NurseTable: AsyncItem<NurseTable | undefined>;
  readonly FacilityTable: AsyncItem<FacilityTable | undefined>;
  readonly QuestionMessageItems: AsyncCollection<QuestionMessageItem>;
  readonly jobId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly askQuestionTableNurseTableId?: string | null;
  readonly askQuestionTableFacilityTableId?: string | null;
}

export declare type AskQuestionTable = LazyLoading extends LazyLoadingDisabled ? EagerAskQuestionTable : LazyAskQuestionTable

export declare const AskQuestionTable: (new (init: ModelInit<AskQuestionTable>) => AskQuestionTable) & {
  copyOf(source: AskQuestionTable, mutator: (draft: MutableModel<AskQuestionTable>) => MutableModel<AskQuestionTable> | void): AskQuestionTable;
}

type EagerJobBitTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobBitTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bitAmount?: string | null;
  readonly jobBitTableJobPostingTableId?: string | null;
  readonly jobBitTableNurseTableId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobBitTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobBitTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bitAmount?: string | null;
  readonly jobBitTableJobPostingTableId?: string | null;
  readonly jobBitTableNurseTableId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobBitTable = LazyLoading extends LazyLoadingDisabled ? EagerJobBitTable : LazyJobBitTable

export declare const JobBitTable: (new (init: ModelInit<JobBitTable>) => JobBitTable) & {
  copyOf(source: JobBitTable, mutator: (draft: MutableModel<JobBitTable>) => MutableModel<JobBitTable> | void): JobBitTable;
}

type EagerJobPostingTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobPostingTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly licenseType?: (string | null)[] | null;
  readonly shiftTitle?: string | null;
  readonly specialty?: string | null;
  readonly certification?: (string | null)[] | null;
  readonly yearOfExperience?: string | null;
  readonly expiration?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly break?: string | null;
  readonly selectCustomer?: string | null;
  readonly unit?: string | null;
  readonly floor?: string | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly baseRate?: string | null;
  readonly enableBid?: boolean | null;
  readonly notes?: string | null;
  readonly jobType?: string | null;
  readonly jobStatus?: string | null;
  readonly jobFinalSelectionNurseId?: string | null;
  readonly jobBitFinalAmount?: string | null;
  readonly jobAcceptedNurses?: (string | null)[] | null;
  readonly autoAcceptedEnable?: boolean | null;
  readonly checkInTime?: string | null;
  readonly checkInFullAddress?: string | null;
  readonly checkInLatitude?: string | null;
  readonly checkInLongitude?: string | null;
  readonly checkOutTime?: string | null;
  readonly checkOutFullAddress?: string | null;
  readonly checkOutLatitude?: string | null;
  readonly checkOutLongitude?: string | null;
  readonly checkOutMessage?: string | null;
  readonly jobShiftTimingType?: string | null;
  readonly maxBidAmount?: string | null;
  readonly jobDuration?: string | null;
  readonly jobTiming?: string | null;
  readonly jobDays?: string | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly noShowReason?: string | null;
  readonly noShowReasonAttachment?: string | null;
  readonly neverCheckOutReason?: string | null;
  readonly neverCheckOutReasonAttachment?: string | null;
  readonly pendingOrNoShowFacilityDecideMessage?: string | null;
  readonly pendingOrNoShowFacilityDecideStatus?: boolean | null;
  readonly certificationRequired?: boolean | null;
  readonly specialtyRequired?: boolean | null;
  readonly experienceRequired?: boolean | null;
  readonly emrehrRequired?: boolean | null;
  readonly customerVisibility?: boolean | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly worked_hours?: string | null;
  readonly total_payment?: string | null;
  readonly nurseCancelNotes?: (NurseCancelObject | null)[] | null;
  readonly nurseSwapNotes?: string | null;
  readonly baseRateVisibility?: boolean | null;
  readonly jobPostingTableFacilityTableId?: string | null;
  readonly manager_review_comments?: string | null;
  readonly approved_manager?: string | null;
  readonly closed_by?: string | null;
  readonly timeAdjustByNurse?: boolean | null;
  readonly timeAdjustByFacility?: boolean | null;
  readonly checkInTimeNurse?: string | null;
  readonly checkInFullAddressNurse?: string | null;
  readonly checkInLatitudeNurse?: string | null;
  readonly checkInLongitudeNurse?: string | null;
  readonly checkOutTimeNurse?: string | null;
  readonly checkOutFullAddressNurse?: string | null;
  readonly checkOutLatitudeNurse?: string | null;
  readonly checkOutLongitudeNurse?: string | null;
  readonly startDateTimeStamp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobPostingTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobPostingTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly licenseType?: (string | null)[] | null;
  readonly shiftTitle?: string | null;
  readonly specialty?: string | null;
  readonly certification?: (string | null)[] | null;
  readonly yearOfExperience?: string | null;
  readonly expiration?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly break?: string | null;
  readonly selectCustomer?: string | null;
  readonly unit?: string | null;
  readonly floor?: string | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly baseRate?: string | null;
  readonly enableBid?: boolean | null;
  readonly notes?: string | null;
  readonly jobType?: string | null;
  readonly jobStatus?: string | null;
  readonly jobFinalSelectionNurseId?: string | null;
  readonly jobBitFinalAmount?: string | null;
  readonly jobAcceptedNurses?: (string | null)[] | null;
  readonly autoAcceptedEnable?: boolean | null;
  readonly checkInTime?: string | null;
  readonly checkInFullAddress?: string | null;
  readonly checkInLatitude?: string | null;
  readonly checkInLongitude?: string | null;
  readonly checkOutTime?: string | null;
  readonly checkOutFullAddress?: string | null;
  readonly checkOutLatitude?: string | null;
  readonly checkOutLongitude?: string | null;
  readonly checkOutMessage?: string | null;
  readonly jobShiftTimingType?: string | null;
  readonly maxBidAmount?: string | null;
  readonly jobDuration?: string | null;
  readonly jobTiming?: string | null;
  readonly jobDays?: string | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly noShowReason?: string | null;
  readonly noShowReasonAttachment?: string | null;
  readonly neverCheckOutReason?: string | null;
  readonly neverCheckOutReasonAttachment?: string | null;
  readonly pendingOrNoShowFacilityDecideMessage?: string | null;
  readonly pendingOrNoShowFacilityDecideStatus?: boolean | null;
  readonly certificationRequired?: boolean | null;
  readonly specialtyRequired?: boolean | null;
  readonly experienceRequired?: boolean | null;
  readonly emrehrRequired?: boolean | null;
  readonly customerVisibility?: boolean | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly worked_hours?: string | null;
  readonly total_payment?: string | null;
  readonly nurseCancelNotes?: (NurseCancelObject | null)[] | null;
  readonly nurseSwapNotes?: string | null;
  readonly baseRateVisibility?: boolean | null;
  readonly jobPostingTableFacilityTableId?: string | null;
  readonly manager_review_comments?: string | null;
  readonly approved_manager?: string | null;
  readonly closed_by?: string | null;
  readonly timeAdjustByNurse?: boolean | null;
  readonly timeAdjustByFacility?: boolean | null;
  readonly checkInTimeNurse?: string | null;
  readonly checkInFullAddressNurse?: string | null;
  readonly checkInLatitudeNurse?: string | null;
  readonly checkInLongitudeNurse?: string | null;
  readonly checkOutTimeNurse?: string | null;
  readonly checkOutFullAddressNurse?: string | null;
  readonly checkOutLatitudeNurse?: string | null;
  readonly checkOutLongitudeNurse?: string | null;
  readonly startDateTimeStamp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobPostingTable = LazyLoading extends LazyLoadingDisabled ? EagerJobPostingTable : LazyJobPostingTable

export declare const JobPostingTable: (new (init: ModelInit<JobPostingTable>) => JobPostingTable) & {
  copyOf(source: JobPostingTable, mutator: (draft: MutableModel<JobPostingTable>) => MutableModel<JobPostingTable> | void): JobPostingTable;
}

type EagerMessageItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MessageItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly sender?: string | null;
  readonly receiver?: string | null;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly chathistorytableID: string;
  readonly nurseTableID?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessageItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MessageItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly sender?: string | null;
  readonly receiver?: string | null;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly chathistorytableID: string;
  readonly nurseTableID?: string | null;
  readonly facilityTableID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MessageItem = LazyLoading extends LazyLoadingDisabled ? EagerMessageItem : LazyMessageItem

export declare const MessageItem: (new (init: ModelInit<MessageItem>) => MessageItem) & {
  copyOf(source: MessageItem, mutator: (draft: MutableModel<MessageItem>) => MutableModel<MessageItem> | void): MessageItem;
}

type EagerChatHistoryTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatHistoryTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly MessageItems?: (MessageItem | null)[] | null;
  readonly senderPublicKey?: string | null;
  readonly senderSecretKey?: string | null;
  readonly receiverPublicKey?: string | null;
  readonly receiverSecretKey?: string | null;
  readonly chatHistoryTableFacilityTableId?: string | null;
  readonly chatHistoryTableNurseTableId?: string | null;
  readonly chatHistoryTableLastMessageItemId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatHistoryTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatHistoryTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly MessageItems: AsyncCollection<MessageItem>;
  readonly senderPublicKey?: string | null;
  readonly senderSecretKey?: string | null;
  readonly receiverPublicKey?: string | null;
  readonly receiverSecretKey?: string | null;
  readonly chatHistoryTableFacilityTableId?: string | null;
  readonly chatHistoryTableNurseTableId?: string | null;
  readonly chatHistoryTableLastMessageItemId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatHistoryTable = LazyLoading extends LazyLoadingDisabled ? EagerChatHistoryTable : LazyChatHistoryTable

export declare const ChatHistoryTable: (new (init: ModelInit<ChatHistoryTable>) => ChatHistoryTable) & {
  copyOf(source: ChatHistoryTable, mutator: (draft: MutableModel<ChatHistoryTable>) => MutableModel<ChatHistoryTable> | void): ChatHistoryTable;
}

type EagerFacilityTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FacilityTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly mobileId?: string | null;
  readonly emailVerified?: boolean | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly facilityVerified?: boolean | null;
  readonly profileImage?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly password?: string | null;
  readonly facilityLoginControl?: boolean | null;
  readonly facilityAppAccessControl?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFacilityTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FacilityTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly mobileId?: string | null;
  readonly emailVerified?: boolean | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly facilityVerified?: boolean | null;
  readonly profileImage?: string | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly password?: string | null;
  readonly facilityLoginControl?: boolean | null;
  readonly facilityAppAccessControl?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FacilityTable = LazyLoading extends LazyLoadingDisabled ? EagerFacilityTable : LazyFacilityTable

export declare const FacilityTable: (new (init: ModelInit<FacilityTable>) => FacilityTable) & {
  copyOf(source: FacilityTable, mutator: (draft: MutableModel<FacilityTable>) => MutableModel<FacilityTable> | void): FacilityTable;
}

type EagerNurseTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NurseTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly gender?: string | null;
  readonly dateOfBirth?: string | null;
  readonly primaryState?: string | null;
  readonly primaryLicenseType?: string | null;
  readonly primaryLicenseMultiPrivilege?: boolean | null;
  readonly clinicalLicenseNumber?: string | null;
  readonly clinicalLicenseExpirationDate?: string | null;
  readonly specialty?: (string | null)[] | null;
  readonly registeredWithAn?: string | null;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly certificationDetails?: (CertificationDetail | null)[] | null;
  readonly educationDetails?: (EducationDetail | null)[] | null;
  readonly skills?: (string | null)[] | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly currentLatitude?: string | null;
  readonly currentLongitude?: string | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly workExperienceDetails?: (WorkExperienceDetail | null)[] | null;
  readonly uploadDocuments?: (UploadDocument | null)[] | null;
  readonly jobPreferences?: JobPreferences | null;
  readonly profileImage?: string | null;
  readonly emailVerified?: boolean | null;
  readonly mobileId?: string | null;
  readonly nurseVerified?: boolean | null;
  readonly nurseLoginControl?: boolean | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly nurseAppAccessControl?: boolean | null;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNurseTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NurseTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly emailId?: string | null;
  readonly phoneNumber?: string | null;
  readonly gender?: string | null;
  readonly dateOfBirth?: string | null;
  readonly primaryState?: string | null;
  readonly primaryLicenseType?: string | null;
  readonly primaryLicenseMultiPrivilege?: boolean | null;
  readonly clinicalLicenseNumber?: string | null;
  readonly clinicalLicenseExpirationDate?: string | null;
  readonly specialty?: (string | null)[] | null;
  readonly registeredWithAn?: string | null;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly certificationDetails?: (CertificationDetail | null)[] | null;
  readonly educationDetails?: (EducationDetail | null)[] | null;
  readonly skills?: (string | null)[] | null;
  readonly fullAddress?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly currentLatitude?: string | null;
  readonly currentLongitude?: string | null;
  readonly EMRorEHRExperience?: (string | null)[] | null;
  readonly workExperienceDetails?: (WorkExperienceDetail | null)[] | null;
  readonly uploadDocuments?: (UploadDocument | null)[] | null;
  readonly jobPreferences?: JobPreferences | null;
  readonly profileImage?: string | null;
  readonly emailVerified?: boolean | null;
  readonly mobileId?: string | null;
  readonly nurseVerified?: boolean | null;
  readonly nurseLoginControl?: boolean | null;
  readonly organization?: string | null;
  readonly location_id?: string | null;
  readonly nurseAppAccessControl?: boolean | null;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NurseTable = LazyLoading extends LazyLoadingDisabled ? EagerNurseTable : LazyNurseTable

export declare const NurseTable: (new (init: ModelInit<NurseTable>) => NurseTable) & {
  copyOf(source: NurseTable, mutator: (draft: MutableModel<NurseTable>) => MutableModel<NurseTable> | void): NurseTable;
}

type EagerUserTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly roll: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly roll: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserTable = LazyLoading extends LazyLoadingDisabled ? EagerUserTable : LazyUserTable

export declare const UserTable: (new (init: ModelInit<UserTable>) => UserTable) & {
  copyOf(source: UserTable, mutator: (draft: MutableModel<UserTable>) => MutableModel<UserTable> | void): UserTable;
}