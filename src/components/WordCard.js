import { useCallback } from 'react';
import _ from 'lodash';

function EnWordLabel({ english, symbol }) {
    return <>
        <div>{english}<small style={{ fontSize: 18, lineHeight: 1, display: 'block' }}>{_.isEmpty(symbol) ? '' : `[${symbol}]`}</small></div>
    </>
}

function WordCard({ english, chinese, symbol, phrase, similar, answerBlured, swapAnswer }) {
    let blurStyle = useCallback(() => {
        return { filter: answerBlured ? "blur(8px)" : 'unset' };
    }, [answerBlured]);

    return (<div style={{ width: 540, height: 360 }}>
        <h1>{swapAnswer ? chinese : <EnWordLabel english={english} symbol={symbol} />}</h1>
        <div direction='vertical' style={blurStyle()} size="large">
            <h2>{swapAnswer ? <EnWordLabel english={english} symbol={symbol} /> : chinese}</h2>
            <div>{phrase}</div>
            <div>{similar}</div>
        </div>
    </div>);
}

export default WordCard;