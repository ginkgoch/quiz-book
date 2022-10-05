import { useCallback } from 'react';
import _ from 'lodash';
import PhoneticSymbol from './PhoneticSymbol';

const tags = ['adj.', 'adv.', 'prep.', 'n.', 'vi.', 'vt.', 'v.', 'conj.'];

function _symbolLabelV2(symbol, symbolBr) {
    return <>
        {_.isEmpty(symbol)?<></>: <PhoneticSymbol category="us" symbol={symbol}></PhoneticSymbol>}
        {_.isEmpty(symbolBr)?<></>: <PhoneticSymbol category="br" symbol={symbolBr}></PhoneticSymbol>}
    </>
}

function EnWordLabel({ english, symbol, symbolBr, symbolBlured }) {
    return <>
        <div>
            <h1>{english}</h1>
            <small style={{ fontSize: 18, display: 'block', filter: symbolBlured ? "blur(8px)" : 'unset' }}>{_symbolLabelV2(symbol, symbolBr)}</small>
        </div>
    </>
}

function _formatChinese(text) {
    for (let t of tags) {
        text = text.replace(t, `<small class="tag-small">${t.replace(/\.$/gi, '')}</small>`);
    }
    return text;
}

function WordCard({ english, chinese, symbol, symbol_br, phrase, similar, answerBlured, symbolBlured, swapAnswer }) {
    let blurStyle = useCallback(() => {
        return { filter: answerBlured ? "blur(8px)" : 'unset' };
    }, [answerBlured]);

    return (<div style={{ width: "100%", maxWidth: 414, padding: "0px 20px" }}>
        <div style={{ marginBottom: "1em" }}>
            {swapAnswer ? <h2 dangerouslySetInnerHTML={{__html:_formatChinese(chinese)}}></h2> : <EnWordLabel english={english} symbol={symbol} symbolBr={symbol_br} symbolBlured={symbolBlured} />}
        </div>
        <div style={blurStyle()}>
            {swapAnswer ? <EnWordLabel english={english} symbol={symbol} symbolBlured={symbolBlured} /> : <h2 dangerouslySetInnerHTML={{__html:_formatChinese(chinese)}}></h2>}
            <div>{phrase}</div>
            <div>{similar}</div>
        </div>
    </div>);
}

export default WordCard;