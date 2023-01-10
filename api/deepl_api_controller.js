const deepl = require('deepl-node');
require('dotenv').config({ path: '../.env' });

class DeeplTranslator {
    constructor() {
        this.translator = new deepl.Translator(process.env.AUTH_KEY);
    }

    async translate(text, sourceLan, targetLan) {
        var result;
        await this.translator.
            translateText(text, sourceLan, targetLan)
            .then((data) => {
                console.log(data.text);
                result = data.text;
            })
            .catch((e) => {
                console.log("translation failed: ", e);
                result = "translation fail."
            })
        return result;
    }
}



module.exports = DeeplTranslator;