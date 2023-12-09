/* Amplify Params - DO NOT EDIT
	API_NURSD_FACILITYNOTIFICATIONTABLETABLE_ARN
	API_NURSD_FACILITYNOTIFICATIONTABLETABLE_NAME
	API_NURSD_FACILITYTABLETABLE_ARN
	API_NURSD_FACILITYTABLETABLE_NAME
	API_NURSD_GRAPHQLAPIENDPOINTOUTPUT
	API_NURSD_GRAPHQLAPIIDOUTPUT
	API_NURSD_GRAPHQLAPIKEYOUTPUT
	API_NURSD_NURSENOTIFICATIONTABLETABLE_ARN
	API_NURSD_NURSENOTIFICATIONTABLETABLE_NAME
	API_NURSD_NURSETABLETABLE_ARN
	API_NURSD_NURSETABLETABLE_NAME
	AUTH_NURSD_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
