<script>
export default{
    name:"Card",
    props:{
        isSanctuary: Boolean,
        id: Number,
        isFlipped: Boolean,
        isPlaceholder: {
            type: Boolean,
            default: false
        },
        placeHolderNumber: Number,
        isLocked: Boolean
    },
    methods:{
        cardClicked(){
            if(this.isLocked) return;
            this.$emit("cardClicked", this.id)
        }
    }
}
</script>

<template>
    <div class="card">
        <div v-if="!isPlaceholder">
            <img :src="'../../'+(isSanctuary?'sanctuary/':'region/')+'tile'+(isSanctuary?String(id+1).padStart(3, '0'):String(id).padStart(3, '0'))+'.jpg'" v-if="!isFlipped" @click="cardClicked" :class="{'sanctuary':isSanctuary}" />
            <img src="../../flipped.jpg" v-else/>
        
        </div>
        <div class="placeHolder" v-else>
            {{ placeHolderNumber }}
        </div>
    </div>
    
</template>

<style scoped>

.sanctuary{
    /* width: 6.5vw !important; */
    max-height: 10vh;
    border-radius: 15px;
    width: auto !important;
}
img:hover{
    cursor: pointer;
    opacity: 0.8;
}
.isLocked:hover{
    cursor: not-allowed !important;
    opacity: 1 !important;
}
img{
    width: 10vw;
    max-width: 150px;
    height: auto;
    border-radius: 20px;
}
.placeHolder{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main);
    width: 10vw;
    max-width: 150px;
    height:10vw;
    max-height: 150px;
    border-radius: 20px;
    border: solid 2px var(--grey);
}
</style>