const express = require('express');
const app = express();
const port = 3000;

const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const cors = require('cors');

app.use(cors());

// TODO: create character list
// implement character list to /chat
// create caracter list endpoint
// create character list 
// create character detail

const characterList = [
    {
        character_name: "Novel Writing AI",
        characterID: "eP7G9I6yOj7hNwd_N1UQnc6DyK7tKnjqQ7dKasi2_d4"
    },
    {
        character_name: "Pair Programmer",
        characterID: "qtEICpGfFS8f5Zr5kCHR1EsGsHlawNutYSZJq_IEZDY",
    },
    {
        character_name: "Alternate Timeline",
        characterID: "W4MWmsvbFFnKF8b9e3Eg6ZUNzdhqvEZYy-tNRtxB_Og",
    },
    {
        character_name: "Character Assistant",
        characterID: "YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8",
    },
    {
        character_name: "Creative Helper",
        characterID: "9ZSDyg3OuPbFgDqGwy3RpsXqJblE4S1fKA_oU3yvfTM",
    }
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res)=>{
    return res.send('API is running');
});

app.post('/chat', async (req, res)=>{
    const { message, character_name, email}  = req.body;
    try{
        const characterID = characterList.find(character => character.character_name === character_name).characterID;

        const chat = await characterAI.createOrContinueChat(characterID);
        const response = await chat.sendAndAwaitResponse(message, true);
    
        console.log(response);
    
        return res.send(response.text);
    }catch(e){
        console.log(e.message)
        return res.send(e.message);
    }
  
    
});

app.post('/history', async (req, res)=>{
    const { character_name } = req.body;
    try{
        const characterID = characterList.find(character => character.character_name === character_name).characterID;
        const chat = await characterAI.createOrContinueChat(characterID);
        const history = await chat.fetchHistory();
        console.log(history.messages[0].text)
        return res.send(history.messages[0].text);
    }catch(e){
        console.log(e.message)
        return res.send(e.message);
    }
});

app.listen(port, async()=>{
    try{
        characterAI.authenticateAsGuest();
    }catch(e){
        console.log(e);
    }
    console.log(`Server is running on port ${port}`);
})