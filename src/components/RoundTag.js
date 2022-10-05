import styled from 'styled-components';

const Tag = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: ${props => props.backgroundColor || '#02b799'};
    color: white;
    border-radius: 12px;
    font-size: 12px;
    padding-top: 2px;
    text-align: center;
`;

function RoundTag({ text, backgroundColor }) {
    return <Tag backgroundColor={backgroundColor}>{text}</Tag>
}

export default RoundTag;