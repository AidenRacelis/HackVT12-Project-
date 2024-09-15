const cors = require('cors');  
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require("openai");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Ensure API_KEY is set in your .env file
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // ChatGPT API call with the custom prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use "gpt-4" or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a client looking to buy a house. You have a family, lifestyle, and specific preferences (e.g., number of bedrooms, location, type of home). Answer questions posed by the real estate agent (the user) based on your needs, lifestyle, and personal situation. Keep responses concise (under 4-5 sentences), and at the end, rate the agent's recommendation and interaction (how good the questions and help was) out of five stars. Ensure you rate it out of 5 stars."
        },
        {
          role: "user",
          content: question,
        }
      ],
      temperature: 0.7, // Adjusts creativity. 1 is more creative, 0 is more focused
      max_tokens: 1000, // Set an appropriate token limit
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extracting the response from OpenAI
    const aiResponse = response.choices[0].message.content;
    console.log(`AI Response: ${aiResponse}`);

    // Send back the AI's response as JSON
    res.status(200).json({ answer: aiResponse });

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
