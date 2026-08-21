const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const USE_DDB = (process.env.USE_DYNAMODB === 'true');
const TABLE = process.env.EMPLOYEES_TABLE || 'html-biz-payroll-employees';

let ddb;
if (USE_DDB) ddb = new AWS.DynamoDB.DocumentClient();

const localDbPath = path.join(__dirname, '..', 'data', 'employees.json');
function readLocal() {
  try { return JSON.parse(fs.readFileSync(localDbPath)); } catch (e) { return []; }
}
function writeLocal(data) { fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2)); }

exports.handler = async (event) => {
  const method = event.httpMethod || 'GET';
  if (method === 'POST') {
    const body = JSON.parse(event.body || '{}');
    const id = uuidv4();
    const item = Object.assign({ id, createdAt: new Date().toISOString() }, body);

    if (USE_DDB) {
      await ddb.put({ TableName: TABLE, Item: item }).promise();
    } else {
      const rows = readLocal();
      rows.push(item);
      writeLocal(rows);
    }

    return { statusCode: 201, body: JSON.stringify(item) };
  }

  if (method === 'GET') {
    if (event.pathParameters && event.pathParameters.id) {
      const id = event.pathParameters.id;
      if (USE_DDB) {
        const r = await ddb.get({ TableName: TABLE, Key: { id } }).promise();
        return { statusCode: 200, body: JSON.stringify(r.Item || {}) };
      } else {
        const rows = readLocal();
        const found = rows.find(r => r.id === id) || {};
        return { statusCode: 200, body: JSON.stringify(found) };
      }
    }

    if (USE_DDB) {
      const r = await ddb.scan({ TableName: TABLE }).promise();
      return { statusCode: 200, body: JSON.stringify(r.Items || []) };
    } else {
      const rows = readLocal();
      return { statusCode: 200, body: JSON.stringify(rows) };
    }
  }

  return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
};
