import { AutoComplete } from 'antd';
import _ from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import BackToHomeButton from '../components/BackToHomeButton';
import { loadWords } from '../shared/resources';
import WordCard from '../components/WordCard';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    width: 100%;
    max-width: 414px;
    padding: 0 20px;
    margin-bottom: 44px;
`;

function _renderOption(word) {
    return { value: word.english, label: <EnglishSearchOption word={word}></EnglishSearchOption> };
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

    const onSelect = useCallback(data => { 
        const searchingWord = words.find(w => w.english === data);
        setSelectedWord(searchingWord);
    }, [words]);

    useEffect(() => {
        loadWords('english', 'words').then(d => {
            setWords(d);
        });
    }, []);

    return <>
        <BackToHomeButton></BackToHomeButton>
        <SearchWrapper>
            <AutoComplete
                options={options}
                onSearch={onSearch}
                onSelect={onSelect}
                style={{ width: "100%" }}
                placeholder="Input searching text"></AutoComplete>
        </SearchWrapper>
        <div style={{textAlign: 'center'}}>
            {_.isEmpty(selectedWord) ? <></> : <WordCard answerBlured={false} symbolBlured={false} swapAnswer={false} {...selectedWord}></WordCard>}
        </div>
    </>
}

export default EnglishSearchPage;