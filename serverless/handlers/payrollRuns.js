const payroll = require('../lib/payrollEngine');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const USE_DDB = (process.env.USE_DYNAMODB === 'true');
const RUNS_TABLE = process.env.PAYROLL_RUNS_TABLE || 'html-biz-payroll-payrollruns';

let ddb;
if (USE_DDB) ddb = new AWS.DynamoDB.DocumentClient();

const localDbPath = path.join(__dirname, '..', 'data', 'payrollRuns.json');
function readLocal() { try { return JSON.parse(fs.readFileSync(localDbPath)); } catch (e) { return []; } }
function writeLocal(data) { fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2)); }

exports.handler = async (event) => {
  const method = event.httpMethod || 'POST';

  if (method === 'POST') {
    const body = JSON.parse(event.body || '{}');
    const id = uuidv4();
    const { employees = [], periodStart, periodEnd } = body;

    const lines = employees.map(emp => {
      const calc = payroll.calculatePay(emp, { hours: emp.hours || 0, periodStart, periodEnd });
      return Object.assign({ employeeId: emp.id }, calc);
    });

    const totals = lines.reduce((acc, l) => {
      acc.gross += l.gross; acc.tax += l.taxWithheld; acc.net += l.net;
      return acc;
    }, { gross: 0, tax: 0, net: 0 });

    const run = { id, createdAt: new Date().toISOString(), periodStart, periodEnd, lines, totals };

    if (USE_DDB) {
      await ddb.put({ TableName: RUNS_TABLE, Item: run }).promise();
    } else {
      const rows = readLocal(); rows.push(run); writeLocal(rows);
    }

    return { statusCode: 201, body: JSON.stringify(run) };
  }

  if (method === 'GET') {
    if (event.path && event.path.endsWith('/export.csv') && event.pathParameters && event.pathParameters.id) {
      const id = event.pathParameters.id;
      let run;
      if (USE_DDB) {
        const r = await ddb.get({ TableName: RUNS_TABLE, Key: { id } }).promise(); run = r.Item;
      } else {
        const rows = readLocal(); run = rows.find(r => r.id === id);
      }
      if (!run) return { statusCode: 404, body: JSON.stringify({}) };
      const csv = ['employeeId,gross,taxWithheld,net'].concat(run.lines.map(l => `${l.employeeId},${l.gross},${l.taxWithheld},${l.net}`)).join('\n');
      return { statusCode: 200, headers: { 'Content-Type': 'text/csv' }, body: csv };
    }

    if (event.pathParameters && event.pathParameters.id) {
      const id = event.pathParameters.id;
      if (USE_DDB) {
        const r = await ddb.get({ TableName: RUNS_TABLE, Key: { id } }).promise();
        return { statusCode: 200, body: JSON.stringify(r.Item || {}) };
      } else {
        const rows = readLocal(); const found = rows.find(r => r.id === id) || {}; return { statusCode: 200, body: JSON.stringify(found) };
      }
    }

    if (USE_DDB) {
      const r = await ddb.scan({ TableName: RUNS_TABLE }).promise(); return { statusCode: 200, body: JSON.stringify(r.Items || []) };
    } else {
      const rows = readLocal(); return { statusCode: 200, body: JSON.stringify(rows) };
    }
  }

  return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
};
