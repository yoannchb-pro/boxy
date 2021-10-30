<template>
    <div class="h-screen w-screen overflow-y-auto flex flex-wrap justify-center items-center">
        <!-- APPS -->
        <template v-for="item of apps" :key="item">
            <div class="flex flex-col justify-center items-center m-12 cursor-pointer" @click="openApp(item)">
                <div class="bg-special h-60 w-96 rounded-lg bg-cover mb-2 bg-center" 
                :style="`background-image: url('${require('../apps/'+item.img)}')`"></div>

                <h2 class="text-white uppercase font-bold text-lg">{{ item.name }}</h2>
            </div>
        </template>

        <!-- FILL -->
        <div class="flex flex-col justify-center items-center m-12 cursor-pointer" v-for="item of minimumApps" :key="item">
            <div class="bg-special h-60 w-96 rounded-lg" ></div>
            <h2 class="text-white uppercase font-bold text-lg">&nbsp;</h2>
        </div>

        <!-- MODAL -->
        <div class="bg-gray-800 h-full w-full fixed top-0 left-0 go-to-top z-50" v-if="modal">
            <header class="w-full h-c1 bg-special flex justify-center items-center">
                <h2 class="text-lg text-white font-bold">{{ selected.name }}</h2>

                <span class="text-white cursor-pointer font-bold absolute right-3" @click="closeModal()">X</span>
            </header>

            <webview :src="selected.url" class="h-c2"></webview>
        </div>
    </div>
</template>
<script>
export default {
    name: "Applications",
    data(){
        return {
            minimumApps: 15,

            selected: {},
            modal: false,

            apps: require("../apps/app.json") || []
        }
    },
    mounted(){
        this.minimumApps -= this.apps.length;
    },
    methods: {
        openApp(app = {}){
            if(app instanceof String) app = this.apps.find(e => e.name == app);

            this.modal = true;
            this.selected = app;
        },
        closeModal(){
            this.modal = false;
            this.selected = {};
        }
    }
}
</script>
<style scoped>
.h-c1{
    height: 2rem;
}

.h-c2{
    height: calc(100% - 2rem);
}

@keyframes go-to-top-animation {
    100% {
        top: 0;
        opacity: 1;
    }
}

.go-to-top{
    top: 50%;
    opacity: 0;
    animation: go-to-top-animation 0.5s forwards;
}
</style>
