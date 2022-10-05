import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Form, Modal, Row, Col, Progress } from 'antd';
import { LeftOutlined, SettingOutlined } from '@ant-design/icons'

import { loadWords } from '../shared/resources';
import WordCard from '../components/WordCard';
import FavoriteButton from '../components/FavoriteButton';

const storedFavoritedWordsKey = 'english-words-fav';

let getFavoritedWords = function () {
    let t = localStorage.getItem(storedFavoritedWordsKey);
    if (t !== null) {
        return t.split(',');
    } else {
        return [];
    }
}

let isFavorited = (word) => {
    return getFavoritedWords().includes(word);
};

function EnglishQuizPage() {
    const [words, setWords] = useState([]);
    const [wordsInQuiz, setWordsInQuiz] = useState([]);
    const [favorited, setFavorited] = useState(false);
    const [current, setCurrent] = useState(0);
    const [answerBlured, setAnswerBlured] = useState(true);
    const [symbolBlured, setSymbolBlured] = useState(false);
    const [swapAnswer, setSwapAnswer] = useState(false);
    const [shuffled, setShuffled] = useState(false);
    const [units, setUnits] = useState([]);
    const [settingModalVisible, setSettingModalVisible] = useState(false);
    const [favoriteOnly, setFavoriteOnly] = useState(false);
    const { category, type } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        loadWords(category, type).then(d => {
            setWords(d);
            setWordsInQuiz(d);

            if (d.length > 0) {
                setCurrent(0);
            }

            setFavorited(d.length === 0 ? false : isFavorited(d[0]?.english));
        });
    }, [category, type]);

    let onNextWord = useCallback(() => {
        if (current < wordsInQuiz.length - 1) {
            const nextPage = current + 1;
            setCurrent(nextPage);
            setFavorited(isFavorited(wordsInQuiz[nextPage]?.english));
        }
    }, [current, wordsInQuiz]);

    let getIndexName = useCallback(() => {
        if (wordsInQuiz.length === 0) {
            return '--';
        } else {
            return `${current + 1} / ${wordsInQuiz.length}`;
        }
    }, [wordsInQuiz, current]);

    let onPreviousWord = useCallback(() => {
        if (current > 0) {
            const previousPage = current - 1;
            setCurrent(previousPage);
            setFavorited(isFavorited(wordsInQuiz[previousPage]?.english));
        }
    }, [current, wordsInQuiz]);

    let onAnswerBluredChanged = useCallback(e => {
        setAnswerBlured(e.target.checked);
    }, [])

    let onSwapAnswerChanged = useCallback(e => {
        setSwapAnswer(e.target.checked);
    }, []);

    let onSymbolBluredChanged = useCallback(e => {
        setSymbolBlured(e.target.checked);
    }, []);

    let onConfigConfirmed = useCallback(() => {
        form.validateFields().then(values => {
            setShuffled(values.shuffled);
            setUnits(values.units);
            setFavoriteOnly(values.favoriteOnly);

            let newWordsInQuiz = words;
            if (values.favoriteOnly) {
                let favoritedWords = getFavoritedWords();
                newWordsInQuiz = newWordsInQuiz.filter(w => favoritedWords.includes(w.english));
            }

            newWordsInQuiz = values.units.length === 0 ? newWordsInQuiz : newWordsInQuiz.filter(w => values.units.includes(w.unit));
            if (values.shuffled) {
                newWordsInQuiz = _.shuffle(newWordsInQuiz);
            }

            setWordsInQuiz(newWordsInQuiz);

            if (newWordsInQuiz.length > 0) {
                setCurrent(0);
            }

            setFavorited(newWordsInQuiz.length === 0 ? false : isFavorited(newWordsInQuiz[0]?.english));
            setSettingModalVisible(false);
        });
    }, [form, words]);

    let onFavoriteChanged = useCallback(() => {
        let t = localStorage.getItem(storedFavoritedWordsKey);
        let ta = (t === null || t.length === 0) ? [] : t.split(',');

        if (!favorited) {
            if (!ta.includes(wordsInQuiz[current].english)) {
                ta.push(wordsInQuiz[current].english);
                setFavorited(true);
            }
        } else {
            let i = ta.indexOf(wordsInQuiz[current].english);
            if (i >= 0) {
                ta.splice(i, 1);
                setFavorited(false);
            }
        }

        localStorage.setItem(storedFavoritedWordsKey, ta.join(','))
    }, [wordsInQuiz, current, favorited]);

    let quizContent = <>No Quiz Items</>
    if (wordsInQuiz.length > 0) {
        quizContent = (<><div style={{ 'flexGrow': 1, display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
            <WordCard answerBlured={answerBlured} symbolBlured={symbolBlured} swapAnswer={swapAnswer} {...wordsInQuiz[current]}></WordCard>
        </div>
        <div className='actions'>
            <div><span style={{ display: "inline-block", width: 100 }}>{getIndexName()}</span></div>
            <Progress style={{width: 290, marginBottom: 20}} percent={(current + 1) * 100 / wordsInQuiz.length} showInfo={false}></Progress>
            <div>
                <Button size="large" type="normal" style={{height: 60, width: 120, marginRight: 10}} disabled={!(current > 0)} onClick={onPreviousWord}>Previous</Button> 
                <Button size="large" type="primary" style={{height: 60, width: 160}} disabled={!(current < wordsInQuiz.length - 1)} onClick={onNextWord}>Next</Button>
            </div>
            <div className='settings'>
                <div style={{ width: 290 }}>
                    <div><Checkbox defaultChecked={answerBlured} onChange={onAnswerBluredChanged}>Answer</Checkbox></div>
                    <div><Checkbox defaultChecked={symbolBlured} onChange={onSymbolBluredChanged}>Symbol</Checkbox></div>
                    <div><Checkbox defaultChecked={swapAnswer} onChange={onSwapAnswerChanged}>Swap Q&A</Checkbox></div>
                </div>
            </div>
        </div></>);
    }

    return (<>
        <div style={{ position: "fixed", left: 10, top: 10 }}>
            <Button icon={<LeftOutlined />} shape="circle" size="large" onClick={() => navigate('/')} />
        </div>
        <div style={{ position: "fixed", right: 10, top: 10 }}>
            <div><Button icon={<SettingOutlined style={{ fontSize: 20 }} />} shape="circle" size="large" onClick={() => setSettingModalVisible(true)} /></div>
            <div style={{ marginTop: 10 }}><FavoriteButton checked={favorited} onClick={onFavoriteChanged} /></div>

        </div>
        <div className="App">
            {quizContent}
        </div>
        <Modal title="Config" visible={settingModalVisible} okText="Okay" cancelText="Cancel"
            onCancel={() => setSettingModalVisible(false)}
            onOk={onConfigConfirmed}>
            <Form form={form} initialValues={{ shuffled, units: units, favoriteOnly }} name="ConfigForm" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item name="shuffled" label="Shuffled" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
                <Form.Item name="units" label="Units">
                    <Checkbox.Group>
                        <UnitOptions words={words} />
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="favoriteOnly" label="Favorite Only" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal>
    </>
    );
}

function UnitOptions({ words }) {
    return (<Row>
        {[...new Set(words.map(w => w['unit']))].map(s => (<Col span={8} key={s}><Checkbox name={s} value={s}>{s}</Checkbox></Col>))}
    </Row>);
}

export default EnglishQuizPage;
