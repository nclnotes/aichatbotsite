exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const fetch = (await import('node-fetch')).default;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a friendly and knowledgeable second-year Newcastle University medical student. You help first-year students by explaining complex medical topics clearly and concisely, especially anatomy, physiology, and common clinical questions."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "No reply from OpenAI.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("ChatGPT function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Internal error: " + error.message })
    };
  }
};