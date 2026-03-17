exports.handler = async function(event) {
  const TOKEN = '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';
  
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const { endpoint, method, body } = JSON.parse(event.body);
    const response = await fetch('https://api.notion.com' + endpoint, {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN,
        'Notion-Version': '2022-06-28'
      },
      body: body ? JSON.stringify(body) : undefined
    });
    
    const data = await response.json();
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
