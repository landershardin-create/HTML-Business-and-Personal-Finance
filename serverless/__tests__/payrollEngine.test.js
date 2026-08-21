const payroll = require('../lib/payrollEngine');

test('hourly pay without overtime', () => {
  const emp = { payType: 'hourly', payRate: 20, taxPercent: 10 };
  const r = payroll.calculatePay(emp, { hours: 30, periodStart: '2026-08-01', periodEnd: '2026-08-14' });
  expect(r.gross).toBe(600);
  expect(r.taxWithheld).toBeCloseTo(60);
});

test('hourly pay with overtime', () => {
  const emp = { payType: 'hourly', payRate: 20, taxPercent: 10 };
  const r = payroll.calculatePay(emp, { hours: 45, periodStart: '2026-08-01', periodEnd: '2026-08-14' });
  // 40*20 + 5*20*1.5 = 800 + 150 = 950
  expect(r.gross).toBe(950);
});

test('salaried prorated', () => {
  const emp = { payType: 'salaried', payRate: 52000, taxPercent: 12 };
  const r = payroll.calculatePay(emp, { periodStart: '2026-01-01', periodEnd: '2026-01-15' });
  // ~14 days -> approx 14/365 * 52000
  expect(r.gross).toBeGreaterThan(1900);
});

