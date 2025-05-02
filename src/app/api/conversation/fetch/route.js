export async function GET(req) {
  try {
    // Extract id from the URL query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id') || 1; // Default to 1 if id is not provided
    
    // Check if we have data for this chat
    if (!global.chatData || !global.chatData[id]) {
      return new Response(JSON.stringify({
        success: false,
        message: "No data found for this chat"
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    // Return the chat data
    return new Response(JSON.stringify({
      success: true,
      data: global.chatData[id]
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}