<template>
    <div class="w-screen h-screen flex justify-end items-end">
        <div class="absolute left-0 w-full h-full bg-center bg-cover" 
        :style="`top: ${top1}; background-image: url('${baseUrl}?random=${count1}'); transition: ${duration}s ease;`"></div>
        <div class="absolute left-0 w-full h-full bg-center bg-cover" 
        :style="`top: ${top2}; background-image: url('${baseUrl}?random=${count2}'); transition: ${duration}s ease;`"></div>

        <div id="capsule" class="bg-gray-800 w-96 h-72 p-3 flex flex-col justify-end items-end z-10">
            <h1 class="text-white text-9xl">{{ hours }}:{{ minutes }}<span class="text-white text-base ml-0 pl-0">{{ seconds }}</span>
            </h1>
            <p class="text-white text-6xl">{{ degree }}°</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "Diapo",
    data(){
        return {
            baseUrl: "https://picsum.photos/1920/1080",

            count1: 0,
            count2: 1,
            top1: "-100%",
            top2: "0",
            duration: 1,

            hours: "00",
            minutes: "00",
            seconds: "00",
            degree: 0,

            intervalTime: null,
            intervalDiapo: null,
            intervalWeather: null,

            latitude: null,
            longitude: null,
        }
    },
    async mounted(){
        try {
            await this.getLocalisation();
        } catch(e) {
            //Montreal
            this.latitude = 45.4978;
            this.longitude = -73.5485;
            
            console.log(e);
        }

        try {
            await this.getWeather();
        } catch(e) {
            console.log(e);
        }

        this.changeHours();

        this.intervalTime = setInterval(this.changeHours.bind(this), 1000);
        this.intervalDiapo = setInterval(this.animateDiapo.bind(this), 30*1000);
        this.intervalWeather = setInterval(this.getWeather.bind(this), 4 * 60 * 60 * 1000)
    },
    beforeUnmount(){
        clearInterval(this.intervalTime);
        clearInterval(this.intervalDiapo);
        clearInterval(this.intervalWeather);
    },
    methods: {
        changeHours(){
            const date = new Date();
            this.hours = date.getHours().toString().padStart(2,"0");
            this.minutes = date.getMinutes().toString().padStart(2,"0");
            this.seconds = date.getSeconds().toString().padStart(2, "0");
        },

        async getLocalisation(){
            const req = await fetch("https://freegeoip.app/json/");
            const rep = await req.json();
            this.latitude = rep.latitude;
            this.longitude = rep.longitude;
        },

        async getWeather(){
            const req = await fetch(`https://www.7timer.info/bin/astro.php?lon=${this.longitude}&lat=${this.latitude}&ac=0&unit=metric&output=json&tzshift=0`);
            const rep = await req.json();

            this.degree = rep.dataseries[0].temp2m;
            
        },

        animateDiapo(){
            if(this.top1 == "0"){
                this.top1 = "100%";
                this.top2 = "0";

                setTimeout(() => {
                    this.duration = 0;
                    this.top1 = "-100%";
                    this.count1++;

                    setTimeout(() => this.duration = 1, 2000);
                }, 2000);
            } else {
                this.top1 = "0";
                this.top2 = "100%";

                setTimeout(() => {
                    this.duration = 0;
                    this.top2 = "-100%";
                    this.count2++;

                    setTimeout(() => this.duration = 1, 2000);
                }, 2000);
            }
        },
    }
}
</script>
<style scoped>
#capsule{
    border-top-left-radius: 50%;
    border-top-right-radius: 10rem;
    border-bottom-left-radius: 10rem;
}
</style>