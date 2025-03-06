const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const port = process.env.PORT || 8080;

// const cors = require("cors");

var io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

//function to generate 5 character id
function generateId() {
  return Math.random().toString(36).substring(2, 7);
}

//load /class/cards.ts
const {regions, sanctuaries} = require('./class/cards.js');

var rooms = {};

function beginGame(room){
  io.to(room).emit('beginGame');

  rooms[room].turn = 0;
  //pool is a list of numbers between 0 and regions.length -1
  rooms[room].pool = [];
  for(let i = 0; i < regions.length; i++){
    rooms[room].pool.push(i);
  }

  rooms[room].sanctuaryPool = [];
  for(let i = 0; i < sanctuaries.length; i++){
    rooms[room].sanctuaryPool.push(i);
  }

  rooms[room].phase = "play"; //play, sanctuary, shop, end

  rooms[room].players = {};
  rooms[room].players[rooms[room].users[0]] = {hand: [], sanctuaries: [], playedCards: [], playedSanctuaries: [], hasPlayed:false, hasToChoose: false, sanctuaryChoose: []};
  rooms[room].players[rooms[room].users[1]] = {hand: [], sanctuaries: [], playedCards: [], playedSanctuaries: [], hasPlayed:false, hasToChoose: false, sanctuaryChoose: []};

  for(let i = 0; i<rooms[room].users.length; i++){
    for(let j=0; j<3; j++){
      rooms[room].players[rooms[room].users[i]].hand.push(drawCard(rooms[room].pool));
    }
  }
  generateShop(room);

  //add delay
  setTimeout(() => {
    rooms[room].state = true;
    io.to(room).emit('update', rooms[room]);
  }, 1000);
}

function goToShop(room){
  if(rooms[room].turn == 7){
    //TRIGGER FIN
    rooms[room].players[rooms[room].users[0]].hasPlayed = true;
    rooms[room].players[rooms[room].users[1]].hasPlayed = true;
    finishGame(room);
    io.to(room).emit('update', rooms[room]);
    return;
  }
  resetHasPlayed(room);
  rooms[room].phase = "shop";
  //find which player had the smallest last card id
  let lastCard0 = rooms[room].players[rooms[room].users[0]].playedCards[rooms[room].players[rooms[room].users[0]].playedCards.length-1];
  let lastCard1 = rooms[room].players[rooms[room].users[1]].playedCards[rooms[room].players[rooms[room].users[1]].playedCards.length-1];
  if(lastCard0 < lastCard1){
    rooms[room].players[rooms[room].users[0]].hasToChoose = true;
  }else{
    rooms[room].players[rooms[room].users[1]].hasToChoose = true;
  }
}

function countMaps(player){
  let total = 0;
  for(let i = 0; i < player.playedSanctuaries.length; i++){
    if(sanctuaries[player.playedSanctuaries[i]].clue){
      total++;
    }
  }
  for(let j = 0; j < player.playedCards.length; j++){
    if(regions[player.playedCards[j]].clue){
      total++;
    }
  }
  return total;
}



function goToSanctuary(room){
  resetHasPlayed(room);
  rooms[room].phase = "sanctuary";
  let player0 = rooms[room].players[rooms[room].users[0]];
  let player1 = rooms[room].players[rooms[room].users[1]];

  if(player0.playedCards[player0.playedCards.length-1] > player0.playedCards[player0.playedCards.length-2]){
    player0.hasToChoose = true;
    let count = countMaps(player0) + 1;
    player0.sanctuaryChoose = drawSanctuary(rooms[room].sanctuaryPool, count);
  }else{
    player0.hasPlayed = true;
  }
  if(player1.playedCards[player1.playedCards.length-1] > player1.playedCards[player1.playedCards.length-2]){
    player1.hasToChoose = true;
    let count = countMaps(player1) + 1;
    player1.sanctuaryChoose = drawSanctuary(rooms[room].sanctuaryPool, count);
  }else{
    player1.hasPlayed = true;
  }

  if(player0.hasPlayed && player1.hasPlayed){
    goToShop(room);
  }
}

function finishGame(room){
  rooms[room].phase = "end";
  let player0 = rooms[room].players[rooms[room].users[0]];
  let player1 = rooms[room].players[rooms[room].users[1]];

  let score0 = countPoints(player0);
  let score1 = countPoints(player1);

  rooms[room].winner = score0.total > score1.total ? rooms[room].users[0] : rooms[room].users[1];
  rooms[room].score = [score0, score1];

}

function countPoints(player){
  let totalScore = 0;

  let roundScores = [];

  let total = {
    stone: 0,
    clue: 0,
    chimera: 0,
    thistle: 0,
    red: 0,
    green: 0,
    blue: 0,
    yellow: 0,
    colorless: 0,
    night: 0,

    wonderSet: 0,
    colorSet: 0
  }

  for(let i = 0; i < player.playedSanctuaries.length; i++){
    let sanctuary = sanctuaries[player.playedSanctuaries[i]];
    if(sanctuary.wonders && sanctuary.wonders.stone){
      total.stone+=sanctuary.wonders.stone;
    }
    if(sanctuary.wonders && sanctuary.wonders.chimera){
      total.chimera+=sanctuary.wonders.chimera;
    }
    if(sanctuary.wonders && sanctuary.wonders.thistle){
      total.thistle+=sanctuary.wonders.thistle;
    }
    if(sanctuary.clue){
      total.clue++;
    }
    if(sanctuary.biome == "red"){
      total.red++;
    }
    if(sanctuary.biome == "green"){
      total.green++;
    }
    if(sanctuary.biome == "blue"){
      total.blue++;
    }
    if(sanctuary.biome == "yellow"){
      total.yellow++;
    }
    if(sanctuary.biome == "colorless"){
      total.colorless++;
    }
    if(sanctuary.night){
      total.night++;
    }
  }

  for(let j = 7; j >= 0; j--){
    let region = regions[player.playedCards[j]];
    if(region.wonders && region.wonders.stone){
      total.stone+=region.wonders.stone;
    }
    if(region.wonders && region.wonders.chimera){
      total.chimera+=region.wonders.chimera;
    }
    if(region.wonders && region.wonders.thistle){
      total.thistle+=region.wonders.thistle;
    }
    if(region.clue){
      total.clue++;
    }
    if(region.biome == "red"){
      total.red++;
    }
    if(region.biome == "green"){
      total.green++;
    }
    if(region.biome == "blue"){
      total.blue++;
    }
    if(region.biome == "yellow"){
      total.yellow++;
    }
    if(region.biome == "colorless"){
      total.colorless++;
    }
    if(region.night){
      total.night++;
    }

    //count wonderSet and colorSet
    total.wonderSet = Math.min(total.stone, total.chimera, total.thistle);
    total.colorSet = Math.min(total.red, total.green, total.blue, total.yellow);

    let tempScore = 0;
    if(region.fame && (!region.quest || region.quest && checkQuest(total, region.quest))){
      console.log(region.number)
      if(typeof region.fame.per == 'string'){
        tempScore+=total[region.fame.per]*region.fame.score;
      }else if(typeof region.fame == 'number'){
        tempScore+=region.fame;
      }else if(typeof region.fame.per == 'object'){
        for(const prop in region.fame.per){
          tempScore+=total[region.fame.per[prop]]*region.fame.score;
        }
      }
    }
    roundScores.push(tempScore);
    totalScore+=tempScore;
  }

  //Sanctuary points
  let tempScore = 0;
  for(let i = 0; i < player.playedSanctuaries.length; i++){
    let sanctuary = sanctuaries[player.playedSanctuaries[i]];
    if(sanctuary.fame){
      if(typeof sanctuary.fame.per == 'string'){
        tempScore+=total[sanctuary.fame.per]*sanctuary.fame.score;
      }else if(typeof sanctuary.fame == 'number'){
        tempScore+=sanctuary.fame;
      }else if(typeof sanctuary.fame.per == 'object'){
        for(const item in sanctuary.fame.per){
          tempScore+=total[sanctuary.fame.per[item]]*sanctuary.fame.score;
        }
      }
    }
  }
  roundScores.push(tempScore);
  totalScore+=tempScore;

  return {total: totalScore, round: roundScores};
}

function checkQuest(total, quest){
  for(const questItem in quest){
    console.log(questItem)
    console.log(total[questItem])
    console.log(quest[questItem])
    if(total[questItem] < quest[questItem]){
      return false;
    }
  }
  return true;
}

function roomUpdate(room){
  switch(rooms[room].phase){
    case "play":
      if(rooms[room].players[rooms[room].users[0]].hasPlayed && rooms[room].players[rooms[room].users[1]].hasPlayed){
        if(rooms[room].turn != 0){
          goToSanctuary(room);
        }else{
          goToShop(room);
        }
      }
      io.to(room).emit('update', rooms[room]);
      break;
    case "shop":
      if(rooms[room].players[rooms[room].users[0]].hasPlayed && rooms[room].players[rooms[room].users[1]].hasPlayed){
        rooms[room].phase = "play";
        //END OF A TURN
        rooms[room].turn++;
        if(rooms[room].turn == 8){
          finishGame(room);
          io.to(room).emit('update', rooms[room]);
          return;
        }
        resetHasPlayed(room);
        generateShop(room);
      }else if(rooms[room].players[rooms[room].users[0]].hasPlayed || rooms[room].players[rooms[room].users[1]].hasPlayed){
        //if only one has played, set the other to choose
        if(rooms[room].players[rooms[room].users[0]].hasPlayed){
          rooms[room].players[rooms[room].users[1]].hasToChoose = true;
        }else{
          rooms[room].players[rooms[room].users[0]].hasToChoose = true;
        }
      }
      io.to(room).emit('update', rooms[room]);
      break;
    case "sanctuary":
      if(rooms[room].players[rooms[room].users[0]].hasPlayed && rooms[room].players[rooms[room].users[1]].hasPlayed){
        goToShop(room);
      }
      io.to(room).emit('update', rooms[room]);
      break;
  }
}

function resetHasPlayed(room){
  rooms[room].players[rooms[room].users[0]].hasPlayed = false;
  rooms[room].players[rooms[room].users[1]].hasPlayed = false;
}

function generateShop(room){
  rooms[room].shop = [];
  for(let i = 0; i < 3; i++){
    rooms[room].shop.push(drawCard(rooms[room].pool));
  }
}

function drawCard(pool){
  let card = Math.floor(Math.random() * (pool.length));

  return pool.splice(card, 1)[0];
}

function drawSanctuary(pool, number){
  let final =[];
  for(let i = 0; i < number; i++){
    sanctuary = Math.floor(Math.random() * (pool.length));
    final.push(pool.splice(sanctuary, 1)[0]);
  }
  return final;
}

function leaveRoom(socket){
  for (let room in rooms) {
    if (rooms[room].users.includes(socket.id)) {
      rooms[room].users = rooms[room].users.filter((id) => id != socket.id);
      if (rooms[room].users.length == 0) {
        delete rooms[room];
      }
    }
  }
}

function locatePlayer(socketId){
  for (let room in rooms) {
    if (rooms[room].users.includes(socketId)) {
      return room;
    }
  }
}

io.on('connection', (socket) => {
  socket.emit("wellConnected");
  socket.emit("rooms", rooms);
  socket.on("getRooms", ()=>{
    socket.emit("rooms", rooms);
  });

  socket.on('disconnect', function () {
    //find all rooms where the socket.id is in, and removes him (if the room is empty delete it)
    leaveRoom(socket)
  });

  socket.on("leaveRoom", ()=>{
    leaveRoom(socket)
  })

  socket.on('createRoom', (msg) => {
    let id = generateId();

    socket.join(id);
    socket.emit('joinedRoom', id);
    rooms[id] = {users: [socket.id], state: false};
    console.log(rooms)
  });

  socket.on("joinRoom", (msg) => {
    if (rooms[msg]) {
      if(rooms[msg].users.length == 2){
        socket.emit("roomFull");
        return;
      }
      if(rooms[msg].state){
        socket.emit("roomStarted");
        return;
      }

      socket.join(msg);
      rooms[msg].users.push(socket.id);
      //if room lenght = 2, start the game
      if (rooms[msg].users.length == 2) {
        beginGame(msg);
      }

      socket.emit("roomJoined", rooms[msg]);
    }else{
      socket.emit("roomNotFound");
    }
  });

  //GAME INTERACTIONS
  socket.on("playCard", (card)=>{
    let r = locatePlayer(socket.id);
    let player = rooms[r].players[socket.id];
    if(rooms[r].phase != "play"){
      return;
    }
    if(player.hasPlayed){
      return;
    }
    if(player.hand.includes(card)){
      player.hand = player.hand.filter((c) => c != card);
      player.hasPlayed = true;
      player.playedCards.push(card);
      roomUpdate(r);
    }
  })

  socket.on("shopChooseCard", (card)=>{
    let r = locatePlayer(socket.id);
    let player = rooms[r].players[socket.id];
    if(rooms[r].phase != "shop"){
      return;
    }
    if(!player.hasToChoose){
      return;
    }
    if(rooms[r].shop.includes(card)){
      player.hand.push(card);
      player.hasToChoose = false;
      player.hasPlayed = true;
      rooms[r].shop = rooms[r].shop.filter((c) => c != card);
      
      roomUpdate(r);
    }
  })

  socket.on("sanctuaryChoose", (card)=>{
    let r = locatePlayer(socket.id);
    let player = rooms[r].players[socket.id];
    if(rooms[r].phase != "sanctuary"){
      return;
    }
    if(!player.hasToChoose){
      return;
    }
    if(player.sanctuaryChoose.includes(card)){
      player.sanctuaryChoose = player.sanctuaryChoose.filter((c) => c != card);
      player.hasToChoose = false;
      player.hasPlayed = true;
      player.playedSanctuaries.push(card);
      roomUpdate(r);
    }
  })
})
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});