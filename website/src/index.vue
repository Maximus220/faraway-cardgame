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
        console.log("MOUNTED")
        socket.on('connect_error', err => console.log(err))
        socket.emit("getRooms")
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
        <div class="roomList">
            <div class="innerRooms scroll">
                <div class="inside" v-for="(room, index) in Object.keys(rooms)" :key="index" @click="joinRoom(room)">
                    {{room}} : {{ rooms[room].users.length }} / 2
                </div>
                <div class="noRoom" v-if="Object.keys(rooms).length == 0">No available room</div>
            </div>
        </div>
        <div class="btn" @click="createRoom">Create room</div>
     </div>
</template>

<style scoped>
.innerRooms{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height:100vh;
    width: 80%;
}
.mainDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    gap: 20px;
    height:100vh;
}
.noRoom{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top:15px;
}
.roomList{
    list-style-type: none;
    /* padding: 10px 40px; */
    width: 20vw;
    border: solid 2px var(--grey);
    border-radius: 20px;
    height: 30vh;
    max-height:30vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.inside{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border: solid 2px var(--main);
    border-radius: 20px;
    cursor: pointer;
    margin: 15px 0px;
    width: 80%;
    font-size: 0.8em;
    text-wrap: nowrap;
}
.inside:hover{
    background-color: var(--main);
    color: var(--white);
}

@media (max-width: 1000px){
    .roomList{
        width: 50vw !important;
    }
}
</style>