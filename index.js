const express = require('express');
const app = express();
const port = 3000;

const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const characterID = "eP7G9I6yOj7hNwd_N1UQnc6DyK7tKnjqQ7dKasi2_d4";

// TODO: create character list
// implement character list to /chat
// create caracter list endpoint
// create character list 
// create character detail


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/')

app.post('/chat', async (req, res)=>{
  const message = req.body.message;

  const chat = await characterAI.createOrContinueChat(characterID);
  const response = await chat.sendAndAwaitResponse(message, true);

  console.log(response);

  res.send(response.text);
});

app.listen(port, async()=>{
  try{
    characterAI.authenticateAsGuest();
  }catch(e){
    console.log(e);
  }
  console.log(`Server is running on port ${port}`);
})