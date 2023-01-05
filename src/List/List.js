// 리스트 체크박스 관련
import React, { useEffect, useState } from 'react';
import AddItem from './AddItem';
import Content from './Content';
// data
// import { ListData } from '../data/data'
import SearchItem from './SearchItem';

import apiRequest from '../apiRequest';

const List = () => {
  const [isLoading, setIsLoading ] = useState(true);

  const [items, setItems] = useState([]);
  const [addItem, setAddItem ] = useState('');
  const [search, setSearch] = useState('');
  const [fetchErr, setFetchErr] = useState(null);

  const API_Url = 'http://localhost:3500/items'

 useEffect(()=> {

  const fetchItem = async () => {
    try {
      const res = await fetch(API_Url);
      // res가 에러일때 
      if(!res.ok) throw Error('데이터를 받아올 수 없습니다.')
      
      const listItems = await res.json();
      setItems(listItems);
      setFetchErr(null);
    } catch (err) {
      // console.log(err.message);
      setFetchErr(err.message);

    } finally {
      setIsLoading(false);
    }
  }
  (async () => await fetchItem())();
  //  const showItem =JSON.parse(localStorage.getItem('checkList'))
  //  setItems(showItem);
  },[])

 const setAndSave = (itemList) => {
  setItems(itemList);
  localStorage.setItem('checkList',JSON.stringify(itemList))
 }

 const addNewItem = async(item) => {
  const id = items.length ? items[items.length -1 ].id + 1 : 1;
  // 아이디는 전체 아이템의 마지막아이템id에 + 1 
  //길이가 없으면 아이템이 존재하지 않으니까 id는 1로
  const newItem = {id, checked: false, item};
  // 새로운 아이템을 꾸려주고
  // 이전 리스트에 추가해준다.
  const newItemList = [...items, newItem];
  // 추가된 새로운 리스트를 셋팅해줌
  setAndSave(newItemList);

  const postOptions = {
    method: 'POST',
    headers: {
      "Content-Type" : 'application/json'

    },
    body: JSON.stringify(newItem)
  }
  
  const result = await apiRequest(API_Url, postOptions)
  if(result)  setFetchErr(result);


 }

 
 const handleCheck = async(id) => {
  console.log('key', id);
  const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item);
  // 아이템각각을 받아서 아이템의 아이디와 선택한 아이디가 같으면
  // 각각의 아이템에서 check를 반대로 해주고 아닌건은 그냥 item 으로 받아오기
  setAndSave(listItems);

  const myItem = listItems.filter(item => item.id === id);
  const updateOptions = {
    method: 'PATCH',
    headers: {
      "Content-Type" : 'application/json'

    },
    body: JSON.stringify({checked: myItem[0].checked})
  };
  const reqUrl = `${API_Url}/${id}`
  const result = await apiRequest(reqUrl, updateOptions);

  if(result)  setFetchErr(result);


 }

 const handleDelete = async(id) => {
  console.log('delete id:', id);
  const deletedItem = items.filter(item => item.id !== id);
  //아이템 아이디와 선택아이디가 같지 않은거만 필터링해줘
  // --> 선택된것은 제거함.
  // console.log(deletedItem);
  setAndSave(deletedItem);
 
  const deleteOptions = { method: 'DELETE' }
  const reqUrl = `${API_Url}/${id}`
  const result = await apiRequest(reqUrl, deleteOptions);

  if(result)  setFetchErr(result);


 }

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log('submitted');
  console.log(addItem);
  if(!addItem) return;
  // submit 됐으면 인풋 비워주기
  addNewItem(addItem);
  setAddItem('');

 }


  return (
    
    <section>
      {isLoading && <p style={{color: 'white'}}>Loading...</p>}

      <AddItem
        handleSubmit={handleSubmit} 
        addItem={addItem}
        setAddItem={setAddItem}
      />
        
      <br />
      <SearchItem 
      search={search}
      setSearch={setSearch}
      />

      {/* 아이템 리스트 */}
      <main>
        {fetchErr && <p style={{color: 'red'}}>{`error: ${fetchErr}`}</p> }
        {!fetchErr && !isLoading &&
          <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck} 
          handleDelete={handleDelete} />
        }
      </main>

       
    </section>
  )
}

export default List