function daysBetween(start, end) {
  const s = new Date(start); const e = new Date(end);
  return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)));
}

exports.calculatePay = function(employee, { hours = 0, periodStart, periodEnd } = {}, opts = {}) {
  const payType = (employee.payType || 'hourly');
  const rate = Number(employee.payRate || 0);
  const overtimeThreshold = opts.overtimeThreshold || 40;
  const overtimeMultiplier = opts.overtimeMultiplier || 1.5;
  const preTax = Number(employee.preTaxDeductions || 0);
  const postTax = Number(employee.postTaxDeductions || 0);
  const taxPercent = Number(employee.taxPercent || 0);

  let gross = 0;
  if (payType === 'hourly' || payType === 'contractor') {
    const ot = Math.max(0, hours - overtimeThreshold);
    const reg = Math.max(0, hours - ot);
    gross = (reg * rate) + (ot * rate * overtimeMultiplier);
  } else if (payType === 'salaried') {
    // rate is annual salary
    const days = daysBetween(periodStart, periodEnd);
    gross = rate * (days / 365);
  }

  const taxable = Math.max(0, gross - preTax);
  const taxWithheld = (payType === 'contractor') ? 0 : taxable * (taxPercent / 100);
  const net = Math.max(0, taxable - taxWithheld - postTax);

  return {
    payType,
    gross: Number(gross.toFixed(2)),
    preTax: Number(preTax.toFixed(2)),
    taxable: Number(taxable.toFixed(2)),
    taxWithheld: Number(taxWithheld.toFixed(2)),
    postTax: Number(postTax.toFixed(2)),
    net: Number(net.toFixed(2))
  };
};
