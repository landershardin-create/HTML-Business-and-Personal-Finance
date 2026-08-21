const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const user = process.env.DEV_ADMIN_USER || 'admin';
    const pass = process.env.DEV_ADMIN_PASS || 'password';

    if (body.username === user && body.password === pass) {
      const token = jwt.sign({ sub: user }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
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
