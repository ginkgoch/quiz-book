import { useCallback } from 'react';

function WordCard({ english, chinese, symbol, phrase, similar, blurCn }) {
    let blurCnStyle = useCallback(() => {
        return { filter: blurCn ? "blur(8px)" : 'unset' };
    }, [blurCn]);

    return (<div style={{ width: 460, height: 360 }}>
        <h1>{english}</h1>
        <h3 style={blurCnStyle()}>{chinese}</h3>
        <div style={blurCnStyle()}>{symbol}</div>
        <div style={blurCnStyle()}>{phrase}</div>
        <div style={blurCnStyle()}>{similar}</div>
    </div>);
}

export default WordCard;