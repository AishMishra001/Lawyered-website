// This API route exists to maintain Next.js structure but the form submits directly to the webhook
// This allows the request to originate from the browser rather than the server
// Import removed since we want client-side submission

export async function POST() {
  // Return an error to indicate client-side submission should be used
  return new Response(JSON.stringify({
    status: 'error',
    message: 'This endpoint is not intended for server-side use. Use client-side fetch.',
    data: {}
  }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
