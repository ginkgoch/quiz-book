import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd';
import { useCallback } from 'react';


function FavoriteButton({ checked, onClick }) {
    const onClickCallback = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return <Button size="large" shape="circle"
        icon={checked ? <StarFilled style={{ fontSize: 20, color: "#f2c132" }} /> : <StarOutlined style={{ fontSize: 20 }} />}
        onClick={onClickCallback} />;
}

export default FavoriteButton;