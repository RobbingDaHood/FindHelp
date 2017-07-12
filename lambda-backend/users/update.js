import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'Users',
    Key: {
      UserId: event.requestContext.authorizer.claims.sub
    },
    UpdateExpression: 'SET Content = :Content, Owns = :Owns, Joined = :Joined',
    ExpressionAttributeValues: {
      ':Owns': data.Owns ? data.Owns : null,
      ':Joined': data.Joined ? data.Joined : null,
      ':Content': data.Content ? data.Content : null
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
