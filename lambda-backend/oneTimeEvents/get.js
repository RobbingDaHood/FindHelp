import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  var res = event.pathParameters.id.split('&')

  const params = {
    TableName: 'OneTimeEvent',
    Key: {
      HashKey: res[0],
      RangeKey: res[1]
    }
  }

  try {
    const result = await dynamoDbLib.call('get', params)
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item))
    } else {
      callback(null, failure({status: false, error: 'Item not found.'}))
    }
  } catch (e) {
    callback(null, failure(e))
  }
};
