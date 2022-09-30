import axios from 'axios';
import csv from 'csvtojson'


async function loadResourcesV2(category, type) {
    const result = [];
    const resWords = await axios.get(`/assets/${category}/${type}/index.csv`);
    const csvWords = resWords.data;
    const content = await csv().fromString(csvWords);
    result.push(...content);

    return result;
}

async function loadResources(category, type) {
    const res = await axios.get(`/assets/${category}/${type}/index.json`);

    const result = [];
    for (let path of res.data) {
        const resWords = await axios.get(`/assets/${category}/${type}/${path}`);
        const csvWords = resWords.data;
        const content = await csv().fromString(csvWords);
        content.forEach(r => r['source'] = path.replace(/\.csv/ig, ''));
        result.push(...content);
    }

    return result;
}

async function loadWords(category, type) {
    let resources = await loadResourcesV2(category, type);
    let result = [];
    for (let resource of resources) {
        result.push(resource);
    }

    return result;
}

async function loadIndex() {
    const res = await axios.get('/assets/index.json');
    return res.data;
}

export {
    loadResources,
    loadResourcesV2,
    loadWords,
    loadIndex
}