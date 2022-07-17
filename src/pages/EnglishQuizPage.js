import { useCallback, useEffect, useState } from 'react';
import { loadWords } from '../shared/resources'

import WordCard from '../components/WordCard';
import { Button, Checkbox } from 'antd';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

function EnglishQuizPage() {
    const [words, setWords] = useState([]);
    const [wordCount, setWordCount] = useState(0);
    const [current, setCurrent] = useState(0);
    const [answerBlured, setAnswerBlured] = useState(true);
    const [swapAnswer, setSwapAnswer] = useState(false);
    const [shuffled, setShuffled] = useState(false);
    const { category, type } = useParams();

    useEffect(() => {
        loadWords(category, type).then(d => {
            setWords(d);
            setWordCount(d.length);
            setCurrent(0);
        });
    }, [category, type]);

    let onNextWord = useCallback(() => {
        if (current < wordCount - 1) {
            setCurrent(current + 1);
        }
    }, [current, wordCount]);

    let onPreviousWord = useCallback(() => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    }, [current]);

    let onAnswerBluredChanged = useCallback(e => {
        setAnswerBlured(e.target.checked);
    }, [])

    let onSwapAnswerChanged = useCallback(e => {
        setSwapAnswer(e.target.checked);
    }, []);

    let onShuffledChanged = useCallback(e => {
        setShuffled(e.target.checked);
        if (e.target.checked) {
            let shuffledWords = _.shuffle(words);
            setWords(shuffledWords);
        } else {
            loadWords().then(d => {
                setWords(d);
                setWordCount(d.length);
            });
        }
    }, [words]);

    return (
        <div className="App">
            <div style={{ 'flexGrow': 1 }}>
                <WordCard answerBlured={answerBlured} swapAnswer={swapAnswer} {...words[current]}></WordCard>
            </div>
            <div>
                <Button size="large" type="normal" disabled={!(current > 0)} onClick={onPreviousWord}>Previous</Button>
                <span style={{ display: "inline-block", width: 100 }}>{current + 1}/{wordCount}</span>
                <Button size="large" type="primary" disabled={!(current < wordCount - 1)} onClick={onNextWord}>Next</Button>
            </div>
            <div className='settings'>
                <div style={{ width: 120 }}>
                    <div><Checkbox defaultChecked={answerBlured} onChange={onAnswerBluredChanged}>Blur Answer</Checkbox></div>
                    <div><Checkbox defaultChecked={swapAnswer} onChange={onSwapAnswerChanged}>Swap Q&A</Checkbox></div>
                    <div><Checkbox defaultChecked={shuffled} onChange={onShuffledChanged}>Shuffle</Checkbox></div>
                </div>
            </div>
        </div>
    );
}

export default EnglishQuizPage;
