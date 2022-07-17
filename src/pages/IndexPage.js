import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndexCard from '../components/IndexCard';
import { loadIndex } from '../shared/resources';

function IndexPage() {
    const [indexItems, setIndexItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadIndex().then(d => {
            setIndexItems(d);
        });
    }, []);

    return (
        <Space wrap size="large">
            {
                indexItems.map(item => {
                    return (
                        <IndexCard
                            key={item.type}
                            onClick={() => navigate(`/quiz/${item.category}/${item.type}`)}
                            {...item} />);
                })
            }
        </Space>
    )
}

export default IndexPage;