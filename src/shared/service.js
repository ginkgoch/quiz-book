import axios from 'axios';
import _ from 'lodash';

const service = axios.create({ baseURL: 'http://localhost:3300' });

async function translate(words) {
    const resp = await service.post('/english/words/query', words.map(w => w['english']).filter(w => !_.isNil(w)));
    return resp.data;
}

export { translate };