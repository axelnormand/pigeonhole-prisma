export const handler = async (_event: any, _context: any, _callback: any) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ up: true }),
  };
};
