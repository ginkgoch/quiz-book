import { AutoComplete } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import BackToHomeButton from '../components/BackToHomeButton';
import { loadWords } from '../shared/resources';

function _renderOption(word) {
    return { value: word['english'], label: <EnglishSearchOption word={word}></EnglishSearchOption> };
}

function EnglishSearchOption({ word }) {
    return `${word.english} /${word.chinese}/`;
}

function EnglishSearchPage() {
    const [options, setOptions] = useState([]);
    const [words, setWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);

    const onSearch = useCallback(searchText => {
        const searchingWords = words.filter(w => w.english.startsWith(searchText)).map(_renderOption);
        setOptions(searchingWords);
    }, [words]);

    const onSelect = useCallback(data => {}, [

    ]);

    useEffect(() => {
        loadWords('english', 'words').then(d => {
            setWords(d);
        });
    }, []);

    return <>
        <BackToHomeButton></BackToHomeButton>
        <div>
            <AutoComplete
                options={options}
                onSearch={onSearch}
                style={{ width: 200 }}
                placeholder="Input searching text"></AutoComplete>
        </div>
    </>
}

export default EnglishSearchPage;