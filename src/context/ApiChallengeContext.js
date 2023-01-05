import { createContext, useState, useEffect } from "react";

const ApiChallengeContext = createContext({});

export const ApiChallengeProvider = ({ children }) => {

    const API_URL = 'https://jsonplaceholder.typicode.com/'

    const [reqType, setReqType] = useState('users');
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        console.log('heyyy');
        const fetchItem = async () => {
            try {
                const res = await fetch(`${API_URL}${reqType}`);
                if(!res.ok) throw Error(res);
                const data = await res.json();
                // console.log(data);
                setItems(data)
            } catch (err) {
                console.log(err);
            }
    
        }
        fetchItem();
      },[reqType])
     
   
    return (
        <ApiChallengeContext.Provider
            value={{
                reqType,
                setReqType,
                setItems,
                items
            }}
        >
            {children}
        </ApiChallengeContext.Provider>
    )
}

export default ApiChallengeContext