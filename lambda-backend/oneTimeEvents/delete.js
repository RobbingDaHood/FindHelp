import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  var res = event.pathParameters.id.split('&')

  const params = {
    TableName: 'OneTimeEvent',
    Key: {
      HashKey: res[0],
      RangeKey: res[1]
    },
    ConditionExpression: 'OwnerId = :OwnerId',
    ExpressionAttributeValues: {
      ':OwnerId': event.requestContext.authorizer.claims.sub
    }
  }

  try {
    await dynamoDbLib.call('delete', params)
    callback(null, success({status: true}))
  } catch (e) {
    callback(null, failure({status: false}))
  }
};
