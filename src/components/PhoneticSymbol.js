import styled from 'styled-components';
import RoundTag from './RoundTag';

const Container = styled.div`
    padding-right: 8px;
    text-align: left;
    display: inline-block;
`;

const Small = styled.small`
    margin: auto 4px;
`;

function PhoneticSymbol({category, symbol}) {
    let backgroundColor = null;
    if (category === 'br') {
        backgroundColor = '#9f57b5';
    }

    return <Container>
        <RoundTag text={category} backgroundColor={backgroundColor}></RoundTag>
        <Small>/ {symbol} /</Small>
    </Container>
}

export default PhoneticSymbol;