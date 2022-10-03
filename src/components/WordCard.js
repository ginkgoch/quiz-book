import { useCallback } from 'react';
import _ from 'lodash';

function _symbolLabel(symbol, symbolBr) {
    let labels = [];
    if (!_.isNil(symbol)) {
        labels.push(`US. / ${symbol} /`);
    }

    if (!_.isNil(symbolBr)) {
        labels.push(`Br. / ${symbolBr} /`);
    }

    return labels.join(' ');
}

function EnWordLabel({ english, symbol, symbolBr, symbolBlured }) {
    return <>
        <div>{english}<small style={{ fontSize: 18, lineHeight: 1, display: 'block', filter: symbolBlured ? "blur(8px)" : 'unset' }}>{_symbolLabel(symbol, symbolBr)}</small></div>
    </>
}

function WordCard({ english, chinese, symbol, symbol_br, phrase, similar, answerBlured, symbolBlured, swapAnswer }) {
    let blurStyle = useCallback(() => {
        return { filter: answerBlured ? "blur(8px)" : 'unset' };
    }, [answerBlured]);

    return (<div style={{ width: "100%", maxWidth: 414, height: 360, padding: "0px 20px" }}>
        <h1>{swapAnswer ? chinese : <EnWordLabel english={english} symbol={symbol} symbolBr={symbol_br} symbolBlured={symbolBlured} />}</h1>
        <div direction='vertical' style={blurStyle()} size="large">
            <h2>{swapAnswer ? <EnWordLabel english={english} symbol={symbol} symbolBlured={symbolBlured} /> : chinese}</h2>
            <div>{phrase}</div>
            <div>{similar}</div>
        </div>
    </div>);
}

export default WordCard;