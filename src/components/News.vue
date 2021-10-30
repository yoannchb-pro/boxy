<template>
    <div class="h-screen w-screen overflow-y-auto">
        <div class="flex bg-gray-800 justify-center items-center h-1/4 w-full bg-cover bg-center sticky top-0" :style="`background-image: url('${wave}')`">
            <h1 class="text-9xl text-white">Actualités</h1>
        </div>

        <div v-for="item of results" :key="item" class="flex m-5 ml-52 mr-52 rounded-xl shadow-lg bg-special">
            <div class="flex flex-col flex-auto p-3">
                <h2 class="text-white text-lg font-bold">"{{ item.title }}"</h2>
                <br>
                <span class="text-white text-sm italic">{{ item.author }} : {{ item.publishedAt.split('T')[0] }}</span>
                <br>
                <p class="text-white">{{ item.description}}</p>
            </div>
            <div class="flex justify-center items-center p-3">
                <div :style="`background-image: url('${item.urlToImage}')`" class="rounded-lg h-32 w-40 bg-cover bg-center"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "News",
    data(){
        return {
            apiKey: "a32c98109ecc4f939d9c7ebe35891ee1",
            wave: require("../assets/wave.svg"),
            results: [],
            intervalNews: null,
            test: [{
                "source": {
                    "id": null,
                    "name": "Sud Ouest"
                },
                "author": "Sud Ouest",
                "title": "Le 13 Novembre au Bataclan, « on n’a pas obéi aux ordres », raconte un policier de la BAC - Sud Ouest",
                "description": "Alain, Michel, Emmanuel, « primo-intervenants » dans l’enfer du Bataclan font partie des policiers qui se sont constitués partie civile pour que leur rôle et la bravoure quasiment insensée dont ils ont fait preuve, ne soient pas oubliés",
                "url": "https://www.sudouest.fr/justice/le-13-novembre-au-bataclan-on-n-a-pas-obei-aux-ordres-raconte-un-policier-de-la-bac-6735974.php",
                "urlToImage": "https://media.sudouest.fr/6735974/1200x-1/sudouest-photo-1-26252470.jpg",
                "publishedAt": "2021-10-27T19:15:21Z",
                "content": "À la suite de leur « patron », le commissaire C, ce sont les premiers policiers à être entrés dans le Bataclan assiégé, le 13 novembre 2015. Plusieurs ex-policiers de la « BAC de nuit » de Paris, ont… [+3816 chars]"
                }
            ]
        }
    },
    async mounted(){
        try{
            await this.getNews();
        } catch(e) {
            console.log(e);
        }

        this.intervalNews = setInterval(this.getNews.bind(this), 3 * 60 * 60 * 1000);
    },
    beforeUnmount(){
        clearInterval(this.intervalNews);
    },
    methods: {
        async getNews(){
            const req = await fetch("https://newsapi.org/v2/top-headlines?country=fr&apiKey="+this.apiKey);
            this.results = (await req.json()).articles;
        }
    }
}
</script>