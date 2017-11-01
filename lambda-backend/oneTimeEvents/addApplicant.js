import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  var res = event.pathParameters.id.split('&')
  const params = {
    TableName: 'OneTimeEvents',
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    //
    // Remember: Type need to be a list :)
    Key: {
      HashKey: res[0],
      RangeKey: res[1]
    },
    UpdateExpression: 'SET Applicants = list_append(Applicants, :newApplicant)',
    ExpressionAttributeValues: {
      ':newApplicant': [event.requestContext.authorizer.claims.sub]
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamoDbLib.call('update', params)
    callback(null, success({status: true}))
  } catch (e) {
    callback(null, failure(e))
  }
};
