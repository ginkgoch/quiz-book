import { Space } from 'antd';
import { useEffect, useState } from 'react';
import IndexCard from '../components/IndexCard';
import { loadIndex } from '../shared/resources';

function IndexPage() {
    const [indexItems, setIndexItems] = useState([]);

    useEffect(() => {
        loadIndex().then(d => {
            setIndexItems(d['english']);
        });
    }, []);

    return (
        <Space wrap size="large">
            {
                indexItems.map(item => {
                    return <IndexCard key={item.location} {...item}></IndexCard>;
                })
            }
        </Space>
    )
}

export default IndexPage;