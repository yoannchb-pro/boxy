function callChild(child, method, params){
    this.$refs[child][method].call(this, ...params);
}

const speech = {
    prefix: "ok boxi",
    ai: [
        {
            words: ["droite", "gauche"],
            fn: (phr) => {
                if(phr.includes("droite")){
                    this.slide(1);
                } else {
                    this.slide(-1);
                }
            }
        },
        {
            words: ["lance", "ouvre"],
            fn: (phr) => {
                const w = phr.split(' ');
                const app = w[w.length-1];

                this.slide(2);
                callChild("apps", "openApp", [app]);
            }
        },

    ]
}

exports.speech = speech;