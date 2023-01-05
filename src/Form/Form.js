import {useState} from 'react'
import Billing from './Billing'

const Form = () => {
    const [data, setData] = useState({
        billFirstName: '',
        billLastName: '',
        billAddress1: '',
        billAddress2: '',
        billCity: '',
        billState: '',
        billZipCode: '',

    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log(JSON.stringify(data));
    }

    const handleChange = (e) => {
    //    setData(e.target.value);
        // 각각 데이터에 타입과 네임이 있어
        const type = e.target.type;
        const name = e.target.name;

        // 값의 타입이 체크박스이면 들어온 것은 체크하는거 아니면 그냥 값으로 받아옴
        const value = type === "checkbox" ?
            e.target.checked : e.target.value;
        
            // 데이타 셋팅을 해주는데 이전 데이타를 받아와서
            // 현재 바뀐 데이터를 맞춰 넣어준다
        setData( prevData => ({ ...prevData, [name]:value}))
    }

    // billAddress2만 필수가 아니다.
    const { billAddress2, ...otherProps} = data;
    // billAddress2(필수아님)를 제외한 다른 props들을 데이터에서 뽑아다가
    // 불리언으로 거른다 안채워지면 true반환을 안해서 버튼활성화 안됨
    const canSave = [...Object.values(otherProps)].every(Boolean);



// 리턴문 안에 들어가던 jSX
    const content = (
        <form 
            className='form flex-col'
            onSubmit={handleSubmit} >
                <h2>Billing Info</h2>
                <Billing 
                data={data}
                handleChange={handleChange}/>
                {/* 중요한 인풋이 안적히면 버튼이 활성화되지 않는다 */}
            <button 
                className='button'
                disabled={!canSave}>Submit</button>
        </form>
    )

    return content;
}

export default Form