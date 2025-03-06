<script>
import Card from './card.vue'
export default{
    name:"CardDisplay",
    components:{
        Card
    },
    props:{
        cardsNumber: Number,
        cards: Array,
        fill: Boolean,
        flipped: {
            type: Boolean,
            default: false
        },
        isSanctuary:{
            type:Boolean,
            default:false
        },
        locked: {
            type: Array,
            default: []
        }
    },
    methods:{
        cardClickedHandle(id){
            this.$emit("cardClicked", id)
        }
    }
}
</script>

<template>
    <div class="cardDisplay" :class="{'sanctuaryDisplayHead':isSanctuary}">
        <div class="cardGrid" :style="{'width': cardsNumber*11 + 'vw', }" :class="{'sanctuaryDisplay':isSanctuary, 'scroll':isSanctuary}">
            <Card v-for="(card, i) in cards" :id="card" :isSanctuary="isSanctuary" :isFlipped="flipped" :isLocked="locked.includes(i)" @cardClicked="cardClickedHandle"/>
            <Card v-if="fill" v-for="i in cardsNumber-cards.length" :isPlaceholder="true" :placeHolderNumber="cardsNumber-cards.length-i+1"/>
            <div v-if="cards.length == 0 && isSanctuary" class="sanctuaryText">No sanctuaries, yet!</div>
        </div>
    </div>
</template>


<style scoped>
.sanctuaryDisplayHead{
    padding: 1vw !important;
}
.sanctuaryDisplay{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: row !important;
    overflow-y:hidden;
    flex-wrap: nowrap !important;
}
.sanctuaryText{
    color: var(--grey);
    font-size: 1.5em;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cardDisplay{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height:100%;
    padding: 2vw;

    max-width: 50vw;

    border: solid 2px var(--main);
    border-radius: 15px;
}
.cardGrid{
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-height: 47vh;
    max-width:47vw;
    overflow-x: auto;
}
@media (max-width: 800px){
    .cardGrid{
        flex-direction: column;
    }
}
</style>