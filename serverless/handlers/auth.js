const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const user = process.env.DEV_ADMIN_USER;
    const pass = process.env.DEV_ADMIN_PASS;
    const jwtSecret = process.env.JWT_SECRET;

    // Require configuration explicitly to avoid issuing tokens with weak defaults
    if (!user || !pass || !jwtSecret) {
      return {
        statusCode: 503,
        body: JSON.stringify({ error: 'Service misconfigured: required environment variables missing (JWT_SECRET, DEV_ADMIN_USER, DEV_ADMIN_PASS)' })
      };
    }

    if (body.username === user && body.password === pass) {
      const token = jwt.sign({ sub: user }, jwtSecret, { expiresIn: '8h' });
      return {
        statusCode: 200,
        body: JSON.stringify({ token })
      };
    }

    return { statusCode: 401, body: JSON.stringify({ message: 'Invalid credentials' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
