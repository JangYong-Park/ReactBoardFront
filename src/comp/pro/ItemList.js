import { useEffect, useState } from 'react';
import { itemList, itemGood } from '../api/Item';
import ItemArea from './ItemArea';
export default function Study() {

    const [items, setItems] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [keyword, setKeyWord] = useState('');
    const categoryList = [
        {
            id: '0', 'name': '전체'
        },
        {
            id: '1', 'name': '도서'
        },
        {
            id: '2', 'name': '전자'
        },
        {
            id: '3', 'name': '생활'
        },
    ]
    //JavaScript의 오버로딩
    //Java는 오버로딩이 필요한 갯수만큼 method를 만들면.
    //JavaScript는 필요없으면 생략
    function startItemList(searchItem) {
        itemList(searchItem).then(res => {
            console.log(res);
            if (res.data.code === '200') {
                setItems(res.data.data);
            }
        });
    }

    useEffect(() => {
        startItemList();
    }, [])

    useEffect(() => {
        searchBtn();
    }, [keyword][categoryId])

    function categoryNum(num) {
        setCategoryId(num);
    }

    /** 검색 버튼 */
    function searchBtn() {
        let param = new Object();
        param.keyword = keyword;
        param.categoryIdx = categoryId;
        startItemList(param);
    }

    function changeItem(idx) {
        let obj = new Object();
        obj.itemIdx = idx;
        itemGood(obj).then(res => {
            console.log(res);

            const copyItems = [...items];
            copyItems[idx - 1] = { ...copyItems[idx - 1], good: copyItems[idx - 1].good + 1 };
            setItems(copyItems);
        })
    }

    return (
        <div>
            <h1>아이템 리스트</h1>
            {/**카테고리 리스트 */}
            {categoryList.map((item, index) => (
                <div key={index}>
                    <a onClick={
                        e => {
                            e.preventDefault();
                            categoryNum(item.id);
                        }
                    }>{item.name}</a>
                </div>
            ))}

            <input type="text" placeholder='검색' value={keyword} onChange={e => {
                setKeyWord(e.target.value);
            }} />
            <input type="button" value="검색" onClick={searchBtn}></input>
            {/**아이템 리스트 */}
            {items.map((item, index) => (
                <ItemArea item={item} index={index} onGoodUp={(idx) => {
                    const copy = items.copy;
                    changeItem(idx);

                }}></ItemArea>
            ))

            }
        </div >
    )
}