
import css from './ApiChallenge.module.css';
import List from './List';
import Form from './Form';
import Table from './Table';

const ApiChallenge = () => {

 
  return (
    <>
        <div className={css.container}>
            <Form />
            {/* <List /> */}
            <Table />
        </div>
    </>
  )
}

export default ApiChallenge