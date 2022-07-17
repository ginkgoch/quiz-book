import { Button } from 'antd';

function IndexCard(props) {
    const style = { display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid 1px #cccccc', flexDirection: 'column', width: 80, height: 80 };

    return <Button style={style} onClick={props.onClick}>
        <div>
            <div>{props.name}</div>
            <div>{props.type}</div>
        </div>
    </Button>
}

export default IndexCard;