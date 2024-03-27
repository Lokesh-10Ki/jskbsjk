const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");

app.use(bodyParser.json());
app.use(cors());

const withDB = async (operations) => {
  const mongoURL =
    "mongodb+srv://lokesh:PherVt8bl9VwhLcV@cluster0.8isnfub.mongodb.net/?retryWrites=true&w=majority";

  try {
    const client = await MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("chatbot"); // Replace with your database name
    const result = await operations(db);
    client.close();
    return result; // Return the result of the operations
  } catch (error) {
    console.log("connection error")
    console.error(error);
    throw error; // Throw the error for handling in the calling function
  }
};

// Use the withDB function in the signup API
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const result = await withDB(async (db) => {
      const usersCollection = db.collection("users");

      // Check if the username already exists
      const existingUser = await usersCollection.findOne({ username });

      if (existingUser) {
        return { status: 409, message: "Username already exists." };
      }

      // Insert the new user into the "users" collection
      const newUser = { username, password };
      await usersCollection.insertOne(newUser);

      return { status: 201, message: "User registered successfully." };
    });

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/details", async (req, res) => {
  const { username, firstname, lastname, age, gender, address, profession } =
    req.body;

  // Validate that username and user details are provided
  if (
    !username ||
    !firstname ||
    !lastname ||
    !age ||
    !gender ||
    !address ||
    !profession
  ) {
    return res
      .status(400)
      .json({ message: "Username and user details are required." });
  }

  try {
    await withDB(async (db) => {
      const usersCollection = db.collection("users"); // Replace with your collection name

      // Check if the username exists
      const existingUser = await usersCollection.findOne({ username });

      if (!existingUser) {
        return res.status(404).json({ message: "Username not found." });
      }

      // Update user details in the user's document
      const result = await usersCollection.updateOne(
        { username },
        { $set: { firstname, lastname, age, gender, address, profession } },
      );

      if (result.modifiedCount === 1) {
        return res
          .status(200)
          .json({ message: "User details updated successfully." });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to update user details." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/update-details", async (req, res) => {
  const { username, updates } = req.body;

  // Validate that username and updates are provided
  if (!username || !updates) {
    return res
      .status(400)
      .json({ message: "Username and updates are required." });
  }

  try {
    await withDB(async (db) => {
      const usersCollection = db.collection("users"); // Replace with your collection name

      // Check if the username exists
      const existingUser = await usersCollection.findOne({ username });

      if (!existingUser) {
        return res.status(404).json({ message: "Username not found." });
      }

      // Construct the update object with the provided updates
      const updateObject = {};
      if (updates.firstname) updateObject.firstname = updates.firstname;
      if (updates.lastname) updateObject.lastname = updates.lastname;
      if (updates.age) updateObject.age = updates.age;
      if (updates.gender) updateObject.gender = updates.gender;
      if (updates.address) updateObject.address = updates.address;
      if (updates.profession) updateObject.profession = updates.profession;

      // Update the user's details in the user's document
      const result = await usersCollection.updateOne(
        { username },
        { $set: updateObject },
      );

      if (result.modifiedCount === 1) {
        return res
          .status(200)
          .json({ message: "User details updated successfully." });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to update user details." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/signin", async (req, res) => {
  const { username } = req.body;

  // Validate that username is provided
  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const result = await withDB(async (db) => {
      const usersCollection = db.collection("users");
      
      // Check if the username exists
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        // Return the user's details (excluding password)
        const userDetails = {
          username: existingUser.username,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          age: existingUser.age,
          gender: existingUser.gender,
          address: existingUser.address,
          profession: existingUser.profession,
        };
        return userDetails;
      } else {
        // Username doesn't exist
        return false;
      }
    });

    if (result === false) {
      res.status(404).json({ status: false, message: "User not found." });
    } else {
      res.status(200).json({ status: true, user: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred",error });
  }
});

const openai = new OpenAI({
  apiKey: "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",
  // Add your organization if needed
  // organization: 'YOUR_ORGANIZATION_ID',
});

app.use(bodyParser.json());
app.use(cors());

// Define an array to store messages
let messages = [];

app.post("/ask/:username", async (req, res) => {
  try {
    const { messages } = req.body;
    const { username } = req.params;
    console.log(username);
    console.log(username);

    // Fetch user details from the database based on the username
    const getUserDetailsFromDatabase = async (username) => {
      try {
        const result = await withDB(async (db) => {
          const usersCollection = db.collection("users");
          // Find the user by username
          const user = await usersCollection.findOne({ username });
          return user;
        });

        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Database error: Unable to fetch user details");
      }
    };

    const userDetails = await getUserDetailsFromDatabase(username);

    if (!userDetails) {
      // Handle the case where the user details are not found
      const inputMessage = [
        {
          role: "system",
          content:
            "You are a student seeking advice on study strategies and academic planning.",
        },
        {
          role: "user",
          content: messages[messages.length - 1].content, // Use the latest user message
        },
      ];
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: inputMessage,
        max_tokens: 30,
      });

      return res.json({ response: completion.choices[0].message.content });
    }

    // Extract the user's input from the latest message
    const userMessage = messages[messages.length - 1].content;

    // Generate a dynamic prompt based on user details

    const generateDynamicPrompt = (userMessage, userDetails) => {
      // Construct a dynamic prompt using various user details
      const dynamicPrompt = `Hi ${userDetails.firstname}, you are a ${userDetails.age}-year-old ${userDetails.gender} ${userDetails.profession}. You asked: "${userMessage}". What are your study strategies and academic planning goals?`;
      console.log(dynamicPrompt);
      return dynamicPrompt;
    };

    const dynamicPrompt = generateDynamicPrompt(userMessage, userDetails);

    // Construct the full message structure
    const inputMessages = [
      {
        role: "system",
        content:
          "You are a student seeking advice on study strategies and academic planning.",
      },
      {
        role: "user",
        content: userMessage,
      },
      {
        role: "assistant",
        content: dynamicPrompt,
      },
    ];

    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: inputMessages,
      max_tokens: 500,
    });

    res.json({ response: completions.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
