<template>
    <div id="container" class="h-screen bg-gray-800 flex">
        <Diaporama ref="diapo"></Diaporama>
        <News ref="news"></News>
        <Applications ref="apps"></Applications>
    </div>
</template>
<script>
import News from '../components/News.vue';
import Diaporama from '../components/Diaporama.vue'
import Applications from '../components/Applications.vue';


export default {
    name: "Home",
    data(){
        return {

        }
    },
    components: {
        Diaporama,
        News,
        Applications
    },
    mounted(){
        this.keyEvent = document.addEventListener("keydown", (e) => {
            switch(e.key){
                case "ArrowRight":
                    this.slide(1);
                    break;
                case "ArrowLeft":
                    this.slide(-1);
                    break;
            }
        });
    },
    created(){
        window.scrollBy({left: -10000000, top: 0});
    },
    beforeUnmount(){
        document.removeEventListener("keydown", this.keyEvent);
    },
    methods: {
        recognition(phr = ""){
            console.log(phr);

            const speech = require('../speech/speech').speech;

            const words = phr.split(' ');

            if(phr.includes(speech.prefix)){
                for(let word of words){
                    const ai = speech.ai.find(e => e.words.indexOf(word) != -1);
                    if(ai){
                        const fn = ai.fn;
                        fn.call(this);
                    }
                }
            }
        },
        slide(delta = 1){
            const calc = Math.floor(window.scrollX)%Math.floor(window.innerWidth);
            
            if(calc < 10){
                window.scrollBy({
                    left: delta*window.innerWidth,
                    top: 0,
                    behavior: "smooth"
                });
            }
        },
    }
}
</script>
<style scoped>
#container{
    flex-wrap: nowrap;
    width: 300vw;
}
</style>