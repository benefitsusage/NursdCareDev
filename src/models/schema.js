export const schema = {
    "models": {
        "ReasonTable": {
            "name": "ReasonTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nurseReasons": {
                    "name": "nurseReasons",
                    "isArray": true,
                    "type": {
                        "nonModel": "ReasonObj"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "facilityReasons": {
                    "name": "facilityReasons",
                    "isArray": true,
                    "type": {
                        "nonModel": "ReasonObj"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ReasonTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ReleaseVersion": {
            "name": "ReleaseVersion",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nursdConnectIOS": {
                    "name": "nursdConnectIOS",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nursdFlowIOS": {
                    "name": "nursdFlowIOS",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nursdCareIOS": {
                    "name": "nursdCareIOS",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nursdConnectAndroid": {
                    "name": "nursdConnectAndroid",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nursdFlowAndroid": {
                    "name": "nursdFlowAndroid",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nursdCareAndroid": {
                    "name": "nursdCareAndroid",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ReleaseVersions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ReferencesDetailNurse": {
            "name": "ReferencesDetailNurse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "reference_name": {
                    "name": "reference_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_relationship": {
                    "name": "reference_relationship",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_position": {
                    "name": "reference_position",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_date_complete": {
                    "name": "reference_date_complete",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_email": {
                    "name": "reference_email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_contact_number": {
                    "name": "reference_contact_number",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_with_your_work_org": {
                    "name": "reference_with_your_work_org",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_file": {
                    "name": "reference_file",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_verified": {
                    "name": "reference_verified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reference_verified_comments": {
                    "name": "reference_verified_comments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ReferencesDetailNurses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "DocumentDetailsNurse": {
            "name": "DocumentDetailsNurse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "document_type": {
                    "name": "document_type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "document_name": {
                    "name": "document_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "issuing_body": {
                    "name": "issuing_body",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "expiration_date": {
                    "name": "expiration_date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "document_front_image": {
                    "name": "document_front_image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "document_back_image": {
                    "name": "document_back_image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "document_upload_with_all_pages": {
                    "name": "document_upload_with_all_pages",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "document_verified": {
                    "name": "document_verified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "verification_note": {
                    "name": "verification_note",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "file": {
                    "name": "file",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "DocumentDetailsNurses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "OrganisationNotificationTable": {
            "name": "OrganisationNotificationTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imageURL": {
                    "name": "imageURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationScreen": {
                    "name": "navigationScreen",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationData": {
                    "name": "navigationData",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "visited": {
                    "name": "visited",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "visitNotification": {
                    "name": "visitNotification",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "notificationDotTypeColor": {
                    "name": "notificationDotTypeColor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organisationTableID": {
                    "name": "organisationTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "OrganisationNotificationTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Organisation": {
            "name": "Organisation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "emailId": {
                    "name": "emailId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organisationName": {
                    "name": "organisationName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "locations": {
                    "name": "locations",
                    "isArray": true,
                    "type": {
                        "nonModel": "LocationsDetails"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "mobileId": {
                    "name": "mobileId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Organisations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "CustomerPatient": {
            "name": "CustomerPatient",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patient_first_name": {
                    "name": "patient_first_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_last_name": {
                    "name": "patient_last_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_address_line_1": {
                    "name": "patient_address_line_1",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_address_line_2": {
                    "name": "patient_address_line_2",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_city_id": {
                    "name": "patient_city_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_city": {
                    "name": "patient_city",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_state": {
                    "name": "patient_state",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_zip_code": {
                    "name": "patient_zip_code",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_gender": {
                    "name": "patient_gender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_phone": {
                    "name": "patient_phone",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_email": {
                    "name": "patient_email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patient_phone_2": {
                    "name": "patient_phone_2",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "active": {
                    "name": "active",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "CustomerPatients",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "FacilityNotificationTable": {
            "name": "FacilityNotificationTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imageURL": {
                    "name": "imageURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationScreen": {
                    "name": "navigationScreen",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationData": {
                    "name": "navigationData",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "visited": {
                    "name": "visited",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "visitNotification": {
                    "name": "visitNotification",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "notificationDotTypeColor": {
                    "name": "notificationDotTypeColor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityTableID": {
                    "name": "facilityTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "FacilityNotificationTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "NurseNotificationTable": {
            "name": "NurseNotificationTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imageURL": {
                    "name": "imageURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationScreen": {
                    "name": "navigationScreen",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "navigationData": {
                    "name": "navigationData",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "visited": {
                    "name": "visited",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "visitNotification": {
                    "name": "visitNotification",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "notificationDotTypeColor": {
                    "name": "notificationDotTypeColor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "NurseNotificationTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "TimeOffFacility": {
            "name": "TimeOffFacility",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "timeOffReason": {
                    "name": "timeOffReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startTime": {
                    "name": "startTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endTime": {
                    "name": "endTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "alternateContactNumber": {
                    "name": "alternateContactNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityTableID": {
                    "name": "facilityTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "TimeOffFacilities",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "TimeOffNurse": {
            "name": "TimeOffNurse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "timeOffReason": {
                    "name": "timeOffReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startTime": {
                    "name": "startTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endTime": {
                    "name": "endTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "alternateContactNumber": {
                    "name": "alternateContactNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "approvedManager": {
                    "name": "approvedManager",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "notApprovedManager": {
                    "name": "notApprovedManager",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cancelManager": {
                    "name": "cancelManager",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseCancelNotes": {
                    "name": "nurseCancelNotes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "TimeOffNurses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "JobTemplate": {
            "name": "JobTemplate",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "licenseType": {
                    "name": "licenseType",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "shiftTitle": {
                    "name": "shiftTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "specialty": {
                    "name": "specialty",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "certification": {
                    "name": "certification",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "yearOfExperience": {
                    "name": "yearOfExperience",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "expiration": {
                    "name": "expiration",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startTime": {
                    "name": "startTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endTime": {
                    "name": "endTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "break": {
                    "name": "break",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "selectCustomer": {
                    "name": "selectCustomer",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "floor": {
                    "name": "floor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "untitledfield": {
                    "name": "untitledfield",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "fullAddress": {
                    "name": "fullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "baseRate": {
                    "name": "baseRate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "enableBid": {
                    "name": "enableBid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobType": {
                    "name": "jobType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "maxBidAmount": {
                    "name": "maxBidAmount",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobShiftTimingType": {
                    "name": "jobShiftTimingType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobTiming": {
                    "name": "jobTiming",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobTemplateName": {
                    "name": "jobTemplateName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "autoAcceptedEnable": {
                    "name": "autoAcceptedEnable",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "EMRorEHRExperience": {
                    "name": "EMRorEHRExperience",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "certificationRequired": {
                    "name": "certificationRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "specialtyRequired": {
                    "name": "specialtyRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "experienceRequired": {
                    "name": "experienceRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "emrehrRequired": {
                    "name": "emrehrRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "customerVisibility": {
                    "name": "customerVisibility",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "baseRateVisibility": {
                    "name": "baseRateVisibility",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobPostingTableFacilityTableId": {
                    "name": "jobPostingTableFacilityTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDateTimeStamp": {
                    "name": "startDateTimeStamp",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "JobTemplates",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "QuestionMessageItem": {
            "name": "QuestionMessageItem",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "askquestiontableID": {
                    "name": "askquestiontableID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityTableID": {
                    "name": "facilityTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "QuestionMessageItems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byAskQuestionTable",
                        "fields": [
                            "askquestiontableID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "AskQuestionTable": {
            "name": "AskQuestionTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "senderPublicKey": {
                    "name": "senderPublicKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "senderSecretKey": {
                    "name": "senderSecretKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receiverPublicKey": {
                    "name": "receiverPublicKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receiverSecretKey": {
                    "name": "receiverSecretKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "NurseTable": {
                    "name": "NurseTable",
                    "isArray": false,
                    "type": {
                        "model": "NurseTable"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "askQuestionTableNurseTableId"
                        ]
                    }
                },
                "FacilityTable": {
                    "name": "FacilityTable",
                    "isArray": false,
                    "type": {
                        "model": "FacilityTable"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "askQuestionTableFacilityTableId"
                        ]
                    }
                },
                "QuestionMessageItems": {
                    "name": "QuestionMessageItems",
                    "isArray": true,
                    "type": {
                        "model": "QuestionMessageItem"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "askquestiontableID"
                        ]
                    }
                },
                "jobId": {
                    "name": "jobId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "askQuestionTableNurseTableId": {
                    "name": "askQuestionTableNurseTableId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "askQuestionTableFacilityTableId": {
                    "name": "askQuestionTableFacilityTableId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "AskQuestionTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "JobBitTable": {
            "name": "JobBitTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "bitAmount": {
                    "name": "bitAmount",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobBitTableJobPostingTableId": {
                    "name": "jobBitTableJobPostingTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobBitTableNurseTableId": {
                    "name": "jobBitTableNurseTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "JobBitTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "JobPostingTable": {
            "name": "JobPostingTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "licenseType": {
                    "name": "licenseType",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "shiftTitle": {
                    "name": "shiftTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "specialty": {
                    "name": "specialty",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "certification": {
                    "name": "certification",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "yearOfExperience": {
                    "name": "yearOfExperience",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "expiration": {
                    "name": "expiration",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startTime": {
                    "name": "startTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "endTime": {
                    "name": "endTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "break": {
                    "name": "break",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "selectCustomer": {
                    "name": "selectCustomer",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "floor": {
                    "name": "floor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "fullAddress": {
                    "name": "fullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "baseRate": {
                    "name": "baseRate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "enableBid": {
                    "name": "enableBid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobType": {
                    "name": "jobType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobStatus": {
                    "name": "jobStatus",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobFinalSelectionNurseId": {
                    "name": "jobFinalSelectionNurseId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobBitFinalAmount": {
                    "name": "jobBitFinalAmount",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobAcceptedNurses": {
                    "name": "jobAcceptedNurses",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "autoAcceptedEnable": {
                    "name": "autoAcceptedEnable",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInTime": {
                    "name": "checkInTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInFullAddress": {
                    "name": "checkInFullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInLatitude": {
                    "name": "checkInLatitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInLongitude": {
                    "name": "checkInLongitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutTime": {
                    "name": "checkOutTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutFullAddress": {
                    "name": "checkOutFullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutLatitude": {
                    "name": "checkOutLatitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutLongitude": {
                    "name": "checkOutLongitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutMessage": {
                    "name": "checkOutMessage",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobShiftTimingType": {
                    "name": "jobShiftTimingType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "maxBidAmount": {
                    "name": "maxBidAmount",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobDuration": {
                    "name": "jobDuration",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobTiming": {
                    "name": "jobTiming",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobDays": {
                    "name": "jobDays",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EMRorEHRExperience": {
                    "name": "EMRorEHRExperience",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "noShowReason": {
                    "name": "noShowReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "noShowReasonAttachment": {
                    "name": "noShowReasonAttachment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "noShowComments": {
                    "name": "noShowComments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "neverCheckOutReason": {
                    "name": "neverCheckOutReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "neverCheckOutReasonAttachment": {
                    "name": "neverCheckOutReasonAttachment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "neverCheckOutComments": {
                    "name": "neverCheckOutComments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "pendingOrNoShowFacilityDecideMessage": {
                    "name": "pendingOrNoShowFacilityDecideMessage",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "pendingOrNoShowFacilityDecideStatus": {
                    "name": "pendingOrNoShowFacilityDecideStatus",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "specialtyRequired": {
                    "name": "specialtyRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "experienceRequired": {
                    "name": "experienceRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "emrehrRequired": {
                    "name": "emrehrRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "certificationRequired": {
                    "name": "certificationRequired",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "customerVisibility": {
                    "name": "customerVisibility",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "worked_hours": {
                    "name": "worked_hours",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "total_payment": {
                    "name": "total_payment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseCancelNotes": {
                    "name": "nurseCancelNotes",
                    "isArray": true,
                    "type": {
                        "nonModel": "NurseCancelObject"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "nurseSwapNotes": {
                    "name": "nurseSwapNotes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "jobPostingTableFacilityTableId": {
                    "name": "jobPostingTableFacilityTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "baseRateVisibility": {
                    "name": "baseRateVisibility",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "manager_review_comments": {
                    "name": "manager_review_comments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "approved_manager": {
                    "name": "approved_manager",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "closed_by": {
                    "name": "closed_by",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "timeAdjustByNurse": {
                    "name": "timeAdjustByNurse",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "timeAdjustByFacility": {
                    "name": "timeAdjustByFacility",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInTimeNurse": {
                    "name": "checkInTimeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInFullAddressNurse": {
                    "name": "checkInFullAddressNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInLatitudeNurse": {
                    "name": "checkInLatitudeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkInLongitudeNurse": {
                    "name": "checkInLongitudeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutTimeNurse": {
                    "name": "checkOutTimeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutFullAddressNurse": {
                    "name": "checkOutFullAddressNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutLatitudeNurse": {
                    "name": "checkOutLatitudeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "checkOutLongitudeNurse": {
                    "name": "checkOutLongitudeNurse",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDateTimeStamp": {
                    "name": "startDateTimeStamp",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "noShowManagerReason": {
                    "name": "noShowManagerReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "noShowManagerReasonAttachment": {
                    "name": "noShowManagerReasonAttachment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "neverCheckOutManagerReason": {
                    "name": "neverCheckOutManagerReason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "neverCheckOutManagerReasonAttachment": {
                    "name": "neverCheckOutManagerReasonAttachment",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "JobPostingTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "MessageItem": {
            "name": "MessageItem",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sender": {
                    "name": "sender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receiver": {
                    "name": "receiver",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "audio": {
                    "name": "audio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "chathistorytableID": {
                    "name": "chathistorytableID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nurseTableID": {
                    "name": "nurseTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityTableID": {
                    "name": "facilityTableID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "MessageItems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byChatHistoryTable",
                        "fields": [
                            "chathistorytableID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ChatHistoryTable": {
            "name": "ChatHistoryTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "MessageItems": {
                    "name": "MessageItems",
                    "isArray": true,
                    "type": {
                        "model": "MessageItem"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "chathistorytableID"
                        ]
                    }
                },
                "senderPublicKey": {
                    "name": "senderPublicKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "senderSecretKey": {
                    "name": "senderSecretKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receiverPublicKey": {
                    "name": "receiverPublicKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receiverSecretKey": {
                    "name": "receiverSecretKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "chatHistoryTableFacilityTableId": {
                    "name": "chatHistoryTableFacilityTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "chatHistoryTableNurseTableId": {
                    "name": "chatHistoryTableNurseTableId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "chatHistoryTableLastMessageItemId": {
                    "name": "chatHistoryTableLastMessageItemId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ChatHistoryTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "FacilityTable": {
            "name": "FacilityTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "emailId": {
                    "name": "emailId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "mobileId": {
                    "name": "mobileId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "emailVerified": {
                    "name": "emailVerified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "fullAddress": {
                    "name": "fullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityVerified": {
                    "name": "facilityVerified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "profileImage": {
                    "name": "profileImage",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "password": {
                    "name": "password",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityLoginControl": {
                    "name": "facilityLoginControl",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "facilityAppAccessControl": {
                    "name": "facilityAppAccessControl",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "FacilityTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "NurseTable": {
            "name": "NurseTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "emailId": {
                    "name": "emailId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "gender": {
                    "name": "gender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dateOfBirth": {
                    "name": "dateOfBirth",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "primaryState": {
                    "name": "primaryState",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "primaryLicenseType": {
                    "name": "primaryLicenseType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "primaryLicenseMultiPrivilege": {
                    "name": "primaryLicenseMultiPrivilege",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "clinicalLicenseNumber": {
                    "name": "clinicalLicenseNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "clinicalLicenseExpirationDate": {
                    "name": "clinicalLicenseExpirationDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "specialty": {
                    "name": "specialty",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "registeredWithAn": {
                    "name": "registeredWithAn",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "employeeId": {
                    "name": "employeeId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "employeeName": {
                    "name": "employeeName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "certificationDetails": {
                    "name": "certificationDetails",
                    "isArray": true,
                    "type": {
                        "nonModel": "CertificationDetail"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "educationDetails": {
                    "name": "educationDetails",
                    "isArray": true,
                    "type": {
                        "nonModel": "EducationDetail"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "skills": {
                    "name": "skills",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "fullAddress": {
                    "name": "fullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "currentLatitude": {
                    "name": "currentLatitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "currentLongitude": {
                    "name": "currentLongitude",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EMRorEHRExperience": {
                    "name": "EMRorEHRExperience",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "workExperienceDetails": {
                    "name": "workExperienceDetails",
                    "isArray": true,
                    "type": {
                        "nonModel": "WorkExperienceDetail"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "uploadDocuments": {
                    "name": "uploadDocuments",
                    "isArray": true,
                    "type": {
                        "nonModel": "UploadDocument"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "jobPreferences": {
                    "name": "jobPreferences",
                    "isArray": false,
                    "type": {
                        "nonModel": "JobPreferences"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "profileImage": {
                    "name": "profileImage",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "emailVerified": {
                    "name": "emailVerified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "mobileId": {
                    "name": "mobileId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseVerified": {
                    "name": "nurseVerified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseLoginControl": {
                    "name": "nurseLoginControl",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "organization": {
                    "name": "organization",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseAppAccessControl": {
                    "name": "nurseAppAccessControl",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "password": {
                    "name": "password",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "NurseTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "UserTable": {
            "name": "UserTable",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "roll": {
                    "name": "roll",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "UserTables",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "ReasonObj": {
            "name": "ReasonObj",
            "fields": {
                "reason": {
                    "name": "reason",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reasonCode": {
                    "name": "reasonCode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "NurseCancelObject": {
            "name": "NurseCancelObject",
            "fields": {
                "nurseId": {
                    "name": "nurseId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nurseName": {
                    "name": "nurseName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cancelNote": {
                    "name": "cancelNote",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "LocationsDetails": {
            "name": "LocationsDetails",
            "fields": {
                "location_id": {
                    "name": "location_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_country": {
                    "name": "location_country",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_state": {
                    "name": "location_state",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_city": {
                    "name": "location_city",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location_zipCode": {
                    "name": "location_zipCode",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "location_fullAddress": {
                    "name": "location_fullAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "JobPreferences": {
            "name": "JobPreferences",
            "fields": {
                "days": {
                    "name": "days",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "duration": {
                    "name": "duration",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "timing": {
                    "name": "timing",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "minDistance": {
                    "name": "minDistance",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "maxDistance": {
                    "name": "maxDistance",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "minRate": {
                    "name": "minRate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "maxRate": {
                    "name": "maxRate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "notLicensedStateHideJobs": {
                    "name": "notLicensedStateHideJobs",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "showJobs": {
                    "name": "showJobs",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "preferenceOption": {
                    "name": "preferenceOption",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "UploadDocument": {
            "name": "UploadDocument",
            "fields": {
                "proofType": {
                    "name": "proofType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "issuingAuthority": {
                    "name": "issuingAuthority",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "issueDate": {
                    "name": "issueDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "expirationDate": {
                    "name": "expirationDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "file": {
                    "name": "file",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "WorkExperienceDetail": {
            "name": "WorkExperienceDetail",
            "fields": {
                "employerName": {
                    "name": "employerName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "positionTitle": {
                    "name": "positionTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "positionType": {
                    "name": "positionType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "hourseWorkedWeek": {
                    "name": "hourseWorkedWeek",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "currentlyWorkingHere": {
                    "name": "currentlyWorkingHere",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "EducationDetail": {
            "name": "EducationDetail",
            "fields": {
                "educationType": {
                    "name": "educationType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "educationDate": {
                    "name": "educationDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "CertificationDetail": {
            "name": "CertificationDetail",
            "fields": {
                "certificationType": {
                    "name": "certificationType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "certificationDate": {
                    "name": "certificationDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.0",
    "version": "8b3cb7d13c06181db517ef8114a3ea2b"
};