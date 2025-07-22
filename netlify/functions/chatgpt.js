exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body);

    const fetch = (await import('node-fetch')).default;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
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
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

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