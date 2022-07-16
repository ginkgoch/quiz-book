import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { loadWords } from './shared/resources'

import WordCard from './components/WordCard';
import { Button, Checkbox } from 'antd';

function App() {
  const [words, setWords] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [blurCn, setBlurCn] = useState(true);

  useEffect(() => {
    loadWords().then(d => {
      setWords(d);
      setWordCount(d.length);
      setCurrent(0);
    });
  }, []);

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

  let onBlurCnChanged = useCallback(e => {
    setBlurCn(e.target.checked);
  }, [])

  return (
    <div className="App">
      <div style={{ 'flexGrow': 1 }}><WordCard blurCn={blurCn} {...words[current]}></WordCard></div>
      <div>
        <Button type="normal" disabled={!(current > 0)} onClick={onPreviousWord}>Previous</Button>
        <span style={{ display: "inline-block", width: 60 }}>{current + 1}/{wordCount}</span>
        <Button type="primary" disabled={!(current < wordCount - 1)} onClick={onNextWord}>Next</Button>
      </div>
      <div style={{ marginTop: 40 }}>
        <Checkbox defaultChecked={blurCn} onChange={onBlurCnChanged}>Blur Chinese</Checkbox>
      </div>
    </div>
  );
}

export default App;
