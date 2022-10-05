import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons'

const Wrapper = styled.div`
    position: fixed;
    left: 10px;
    top: 10px;
`;


function BackToHomeButton() {
    const navigate = useNavigate();

    return <Wrapper>
        <Button icon={<LeftOutlined />} shape="circle" size="large" onClick={() => navigate('/')} />
    </Wrapper>
}

export default BackToHomeButton;