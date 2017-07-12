import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'Users',
    Item: {
      UserId: event.requestContext.authorizer.claims.sub,
      Content: data.content,
      Owns: data.owns,
      Joined: data.joined,
      CreatedAt: new Date().getTime()
    }
  }

  try {
    await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  } catch (e) {
    callback(null, failure({status: false}))
  }
};
