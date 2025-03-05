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
    <div v-if="!isPlaceholder">
        <img :src="'../../public/'+(isSanctuary?'sanctuary/':'region/')+'tile'+(isSanctuary?String(id+1).padStart(3, '0'):String(id).padStart(3, '0'))+'.jpg'" v-if="!isFlipped" @click="cardClicked" :class="{'sanctuary':isSanctuary}" />
        <img src="../../public/flipped.jpg" v-else/>
        
    </div>
    <div class="placeHolder" v-else>
        {{ placeHolderNumber }}
    </div>
    
</template>

<style scoped>
.sanctuary{
    width: 6.5vw !important;
    border-radius: 15px;
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
    height: 10vw;
    border-radius: 20px;
}
.placeHolder{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main);
    width: 10vw;
    height: 10vw;
    border-radius: 20px;
    border: solid 2px var(--grey);
}
</style>