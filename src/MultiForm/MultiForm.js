import useFormContext from '../hooks/useFormContext';
import FormInput from './FormInput';

const MultiForm = () => {
    // useFormContext로 데이타 불러오기
    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide, 
        nextHide, 
        submitHide
    } = useFormContext();



    // 이전버튼
    const handlePrev = () => setPage(current => current -1)
    // 다음버튼
    const handleNext = () => setPage(current => current +1)

    // 섭밋버튼
    const handleSubmit = e => {
        e.preventDefault();
        console.log(JSON.stringify(data));
    }


// 리턴문 안에 들어가던 jSX
    const content = (
        <form 
            className='form flex-col'
            onSubmit={handleSubmit} >
                <header>
                    <h2>{title[page]}</h2>

                    <div className="btn-container">
                        <button
                            className={`button ${prevHide}`}
                            type='button'
                            onClick={handlePrev}
                            disabled={disablePrev}>Prev</button>
                        <button
                            className={`button ${nextHide}`}
                            type='button'
                            onClick={handleNext}
                            disabled={disableNext}>Next</button>
                        <button 
                            className={`button ${submitHide}`}
                            type='submit'
                            disabled={!canSubmit}>Submit</button>
                    </div>

                </header>

                <FormInput/>
          
        </form>
    )

    return content;
}

export default MultiForm