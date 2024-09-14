const cors = require('cors');  
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require("openai");

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Initialize OpenAI
const openai = new OpenAI({
    // change api key
  apiKey: "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"
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // ChatGPT call structure with prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI designed to answer questions. Answer each question to the best of your ability.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extracting the response from OpenAI
    const aiResponse = response.choices[0].message.content;
    console.log(`AI Response: ${aiResponse}`);

    // Sending the response back as JSON
    res.status(200).json({ answer: aiResponse });

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));