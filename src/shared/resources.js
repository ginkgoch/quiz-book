import axios from 'axios';
import csv from 'csvtojson'

async function loadResources() {
    const res = await axios.get('./assets/english/words/index.json');
    // const res = await axios.get('./assets/english/phrases/index.json');

    const result = [];
    for (let path of res.data) {
        const resWords = await axios.get(`./assets/${path}`);
        const csvWords = resWords.data;
        const content = await csv().fromString(csvWords);
        content['source'] = path.replace(/\.csv/ig, '');
        result.push(...content);
    }

    return result;
}

async function loadWords() {
    let resources = await loadResources();
    let result = [];
    for (let resource of resources) {
        result.push(resource);
    }

    return result;
}

export {
    loadResources,
    loadWords
}