import { Button } from 'antd';
import { useCallback } from 'react';

function IndexCard(props) {
    const style = { display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid 1px #cccccc', flexDirection: 'column', width: 80, height: 80 };

    const onClick = useCallback(() => {
        console.log('hello')
    }, []);

    return <Button style={style} onClick={onClick}>
        <div>
            <div>{props.name}</div>
            <div>{props.type}</div>
        </div>
    </Button>
}

export default IndexCard;