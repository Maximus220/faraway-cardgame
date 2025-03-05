<script>
// import io from 'socket.io-client';
import socket from "./functions/socket.js";
export default{

    name:"Index",
    components:{
    },
    data(){
        return{
            roomName:"",
            rooms:{},
        }
    },
    mounted(){
        socket.connect();
        socket.on('connect_error', err => console.log(err))
        socket.emit("hello")
        socket.on("joinedRoom", (room) => {
            console.log("Joined room", room)
            this.$router.push("/game/" + room)
        });

        socket.on("rooms", (rooms) => {
            this.rooms = rooms
            console.log(socket.id)
            console.log(socket)
        });
    },
    methods:{
        createRoom(){
            socket.emit("createRoom")
        },
        joinRoom(room){
            socket.emit("joinRoom", room)
            //go to to /game/id without refresh
            this.$router.push("/game/" + room)
        }
    }
}
</script>

<template>
    <!-- Form, with text input of 5 character string, and button to submit, that will start the method joinGame(text) -->
     <div class="mainDiv">
        <h1>Rooms</h1>
        <ul class="roomList">
            <li v-for="(room, index) in Object.keys(rooms)" :key="index" @click="joinRoom(room)">
                {{room}} : {{ rooms[room].users.length }} / 2
            </li>
            <div class="noRoom" v-if="Object.keys(rooms).length == 0">No available room</div>
        </ul>
        <div class="btn" @click="createRoom">Create room</div>
     </div>
</template>

<style scoped>
.mainDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
.noRoom{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top:15px;
}
.roomList{
    list-style-type: none;
    padding: 10px 40px;
    width: 20vw;
    border: solid 2px var(--grey);
    border-radius: 20px;
    height: 30vh;
    max-height:30vh;
    overflow-y: auto;
}
li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: solid 2px var(--main);
    border-radius: 20px;
    cursor: pointer;
    margin: 15px;
}
li:hover{
    background-color: var(--main);
    color: var(--white);
}
</style>