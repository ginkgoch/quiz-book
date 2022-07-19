import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd';
import { useCallback } from 'react';


function FavoriteButton({ checked, onFavoriteChanged }) {
    const onCheckedChanged = useCallback(() => {
        const currentChecked = !checked;
        if (onFavoriteChanged) {
            onFavoriteChanged(currentChecked);
        }
    }, [onFavoriteChanged, checked]);

    return <Button size="large" shape="circle"
        icon={checked ? <StarFilled style={{ fontSize: 20, color: "#f2c132" }} /> : <StarOutlined style={{ fontSize: 20 }} />}
        onClick={onCheckedChanged} />;
}

export default FavoriteButton;