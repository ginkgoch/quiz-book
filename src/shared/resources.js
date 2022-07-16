import axios from 'axios';
import csv from 'csvtojson'

async function loadResources() {
    const res = await axios.get('./assets/english/words/index.json');

    const result = {};
    for (let path of res.data) {
        const resWords = await axios.get(`./assets/english/words/${path}`);
        const csvWords = resWords.data;
        const content = await csv().fromString(csvWords);
        result[path.replace(/\.csv/ig, '')] = content;
    }

    return result;
}

async function loadWords(units = []) {
    let resources = await loadResources();
    let result = [];
    for (let key in resources) {
        if (units.length === 0 || units.includes(key)) {
            result.push(...resources[key]);
        }
    }

    return result;
}

export {
    loadResources,
    loadWords
}