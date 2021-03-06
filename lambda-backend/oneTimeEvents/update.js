import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  var res = event.pathParameters.id.split('&')
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'OneTimeEvents',
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      HashKey: res[0],
      RangeKey: res[1]
    },
    ConditionExpression: 'OwnerId = :OwnerId',
    UpdateExpression: 'SET EventStartDateTime = :EventStartDateTime, Title = :Title, Description = :Description, UpdatedAt = :UpdatedAt',
    ExpressionAttributeValues: {
      ':EventStartDateTime': data.EventStartDateTime ? data.EventStartDateTime : null,
      ':Title': data.Title ? data.Title : null,
      ':Description': data.Description ? data.Description : null,
      ':OwnerId': event.requestContext.authorizer.claims.sub,
      ':UpdatedAt': new Date().getTime()
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamoDbLib.call('update', params)
    callback(null, success({status: true}))
  } catch (e) {
    callback(null, failure({status: false}))
  }
};
