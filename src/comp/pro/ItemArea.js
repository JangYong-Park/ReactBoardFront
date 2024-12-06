// 아이템 리스트 영역
export default function ItemArea(props) {
    const { item, index } = props;

    function goodUp(index) {
        console.log('좋아요 증가할 아이템 인덱스:', index);
        props.onGoodUp(index);
    }

    return (
        <div
            key={index}
            style={{
                border: '2px solid blue',
                width: '400px',
                margin: '10px',
                cursor: 'pointer',
            }}
        >
            <p>IDX: {item.itemIdx}</p>
            <p>NAME: {item.name}</p>
            <p>가격: {item.price}</p>
            <p>
                추천: {item.good}{' '}
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        goodUp(item.itemIdx);
                    }}
                >
                    👍 추천
                </a>
            </p>
            <p>카테고리 이름: {item.categoryName}</p>
            <p>카테고리 idx: {item.categoryId}</p>
        </div>
    );
}
