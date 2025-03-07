<script>
import socket from "../functions/socket.js";
import cardDisplay from "./cardDisplay.vue";
export default{
    name:"Game",
    components:{
        cardDisplay
    },
    data(){
        return{
            roomName:"",
            rooms:{},
            game:{state:false},
            roomId:"",
            userProfile:{},
            opponent:"",

            titleState:"Both players play",
            detailsState:"You have to choose a card to play",
        }
    },
    mounted(){
        this.roomId = this.$route.params.id;
        console.log("Game ID:", this.$route.params.id);
        console.log(socket.id)
        console.log(socket)
        if(socket.id == null){
            socket.connect();
            socket.on("wellConnected", ()=>{
                this.joinRoom(this.roomId);
            });
        }
        socket.on("roomFull", ()=>{
            alert("Room is full")
            this.$router.push("/");
        });
        socket.on("roomNotFound", ()=>{
            alert("Room not found")
            this.$router.push("/");
        });
        socket.on("roomStarted", ()=>{
            alert("Room has already started")
            this.$router.push("/");
        });

        socket.on("update", (game)=>{
            this.updateGame(game)
        });
        socket.on("roomJoined", (game)=>{
            this.game = game;
        })
    },
    methods:{
        joinRoom(room){
            socket.emit("joinRoom", room);
        },
        updateGame(game){
            console.log("Game updated", game)
            this.game = game;

            this.userProfile = this.game.players[socket.id];
            this.opponent = this.game.users.find(id => id != socket.id);

            switch(this.game.phase){
                case "play":
                    this.titleState="Both players play";
                    this.detailsState="You have to choose a card to play";
                    break;
                case "shop":
                    if(this.userProfile.hasToChoose){
                        this.titleState="You have to choose a card";
                        this.detailsState="You have to choose a card";
                    }else{
                        this.titleState="Waiting for your opponent";
                        this.detailsState="Your opponent chooses a card";
                    }
                    break;
                case "sanctuary":
                    if(this.userProfile.hasToChoose){
                        this.titleState="You have to choose a sanctuary";
                        this.detailsState="You have to choose a sanctuary";
                    }else{
                        this.titleState="Waiting for your opponent";
                        this.detailsState="Your opponent chooses a sanctuary";
                    }
                    break;
                case "end":
                    this.titleState="The game is over";
                    this.detailsState="";
                    console.log(this.game)
                    break;
            }
        },
        leaveRoom(){
            socket.emit("leaveRoom");
            this.$router.push("/");
        },
        // method that copies the url of the page
        copyUrl(){
            navigator.clipboard.writeText(window.location.href);
        },

        cardClickedHandle(card){
            if(this.game.phase == "play"){
                socket.emit("playCard", card);
            }
        },
        shopClickedHandle(card){
            console.log(card)
            console.log(this.game.phase)
            console.log(this.userProfile)
            if(this.game.phase == "shop" && this.userProfile.hasToChoose){
                socket.emit("shopChooseCard", card);
            }
        },
        sanctuaryChooseClick(card){
            if(this.game.phase == "sanctuary" && this.userProfile.hasToChoose){
                socket.emit("sanctuaryChoose", card);
            }
        }
    }
}
</script>

<template>
    <div class="mainDiv">
        <div class="waitingScreen" v-if="!game.state">
            <h1>Waiting for another player...</h1>
            
            <div class="room">
                <h2>Room: {{ roomId }}</h2>
                <img class="smallImg" @click="copyUrl" src="../../clipboard.svg" />
            </div>

            <div class="btn" @click="leaveRoom">Leave room</div>
        </div>
        <div class="gameDiv" v-else>
            <!-- Opponent -->
            <div class="playerHand">
                <!-- Placed cards -->
                <cardDisplay cardsNumber="8" :cards="game.players[opponent].playedCards" :fill="true"/>
                <!-- Opponent cards -->
                <!-- USER CARDS-->
                <div class="sideCards">
                    <cardDisplay cardsNumber="3" :cards="game.players[opponent].hand" :flipped="true" :locked="[0,1,2]"/>
                    <cardDisplay cardsNumber="3" :cards="game.players[opponent].playedSanctuaries" :isSanctuary="true"/>
                </div>
            </div>
            <!-- Shop -->
            <div class="centerDiv" v-if="game.phase != 'end'">
                <cardDisplay cardsNumber="3" :cards="userProfile.sanctuaryChoose" :fill="false" @cardClicked="sanctuaryChooseClick" :isSanctuary="true" v-if="game.phase == 'sanctuary' && userProfile.hasToChoose"/>
                <div class="gameState" v-else>
                    <div id="titleState">{{ titleState }}</div>
                    <div id="detailsState">{{ detailsState }}</div>
                </div>
                <cardDisplay cardsNumber="4" :cards="game.shop" :fill="false" @cardClicked="shopClickedHandle"/>
            </div>
            <div class="centerDiv" v-else>
                <!-- display the score as a horizontal table with the score of each round (player 1 : game.score[0].round / player 2 : game.score[1].round), and at last the total (game.score[].total) -->
                <table class="scoreTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th v-for="(round, index) in game.score[0].round" :key="index">{{index!=8?'Round '+ (index + 1):'Sanctuaries' }}</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Player 1</td>
                            <td v-for="(round, index) in game.score[0].round" :key="index">{{ round }}</td>
                            <td>{{ game.score[0].total }}</td>
                        </tr>
                        <tr>
                            <td>Player 2</td>
                            <td v-for="(round, index) in game.score[1].round" :key="index">{{ round }}</td>
                            <td>{{ game.score[1].total }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="btn" @click="leaveRoom">Leave room</div> -->
            </div>
            <div class="playerHand">
                <!-- Placed cards -->
                <cardDisplay cardsNumber="8" :cards="userProfile.playedCards" :fill="true"/>
                <!-- USER CARDS-->
                <div class="sideCards">
                    <cardDisplay cardsNumber="3" :cards="userProfile.hand" @cardClicked="cardClickedHandle"/>
                    <cardDisplay cardsNumber="3" :cards="userProfile.playedSanctuaries" :isSanctuary="true"/>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
#titleState{
    font-size: 2em;
    font-weight: bold;
}
#detailsState{
    font-size: 1.5em;
    color: var(--grey);
}
.mainDiv{
    padding: 20px;
}
.sideCards{
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1; /* Makes it take the full available height */
    min-height: 0; /* Prevents overflow issues */
}
.centerDiv{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: flex-end;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
    height: 100%;
    flex: 1; /* Make it take up the remaining space */
    min-height: 0; /* Ensure it shrinks properly */
}
.gameState{
    border: solid 2px var(--main);
    border-radius: 15px;
    padding: 20px;
    height: 100%;
    width: 100%;
    white-space: nowrap;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.cardDisplay {
    flex: 1;
}
.gameState > h3{
    color: var(--grey)
}
.gameDiv{
    display:flex;
    flex-direction:column;
    gap:20px;
    align-items:center;
    height: 95vh;
}
.playerHand{
    display:flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: center;
    align-items: center;
    max-height:36vh;
    
}
/* responsive make it a column */
@media (max-width: 800px){
    .playerHand{
        flex-direction: column;
    }
    .centerDiv{
        flex-direction: column;
    }
}
.smallImg{
    width:20px;
    height:20px;
    cursor:pointer;
}
.room{
    display:flex;
    gap:10px;
    align-items:center;
}
.mainDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
}
.waitingScreen{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
    gap:50px;
    height:100vh;
}
.scoreTable {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    text-align: center;
}
.scoreTable th, .scoreTable td {
    padding: 12px 15px;
    border: 1px solid #ddd;
}
.scoreTable thead tr {
    background-color: var(--main);
    color: #ffffff;
    text-align: center;
}
.btn {
    white-space: nowrap;
}
</style>