export const handler = async (_event, _context, _callback) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ up: true }),
  };
};
