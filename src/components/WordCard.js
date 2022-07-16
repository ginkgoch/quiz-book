import { useCallback } from 'react';

function WordCard({ english, chinese, symbol, phrase, similar, answerBlured, swapAnswer }) {
    let blurStyle = useCallback(() => {
        return { filter: answerBlured ? "blur(8px)" : 'unset' };
    }, [answerBlured]);

    return (<div style={{ width: 640, height: 360 }}>
        <h1>{swapAnswer ? chinese : english}</h1>
        <div direction='vertical' style={blurStyle()} size="large">
            <h2>{swapAnswer ? english : chinese}</h2>
            <div>{symbol}</div>
            <div>{phrase}</div>
            <div>{similar}</div>
        </div>
    </div>);
}

export default WordCard;