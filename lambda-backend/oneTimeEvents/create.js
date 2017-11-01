import uuid from 'uuid'
import * as dynamoDbLib from '../libs/dynamodb-lib'
import {success, failure} from '../libs/response-lib'

export async function main (event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'OneTimeEvents',
    Item: {
      HashKey: data.GeoPointHash,
      RangeKey: uuid.v1(),
      OwnerId: event.requestContext.authorizer.claims.sub,
      EventStartDateTime: data.EventStartDateTime,
      Title: data.Title,
      Description: data.Description,
      Applicants: [],
      CreatedAt: new Date().getTime(),
      UpdatedAt: new Date().getTime()
    }
  }

  try {
    await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  } catch (e) {
    callback(null, failure(e))
  }
};
