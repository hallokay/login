// axios register
import { useRef, useEffect, useState } from 'react';
import {faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import './Register.css'

// 아이디 / 비밀번호 정규식
const USER_REGEX = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{3,23}$/;
const PW_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,24}$/; 

// /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/
 // \d는 숫자! 아이디와 마찬가지로 () 내의 조건은 반드시 필요
// [0-9a-zA-Z!@#$%^&*] // [] 내의 조건은 선택적 조건

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();
    // ref는 는 변경 가능한 값을 담고 있는 상자로서, 객체입니다.
    //  이때 ref 객체 안의 값은 React의 생명주기에 독립적 
    //  즉, re-render와 상관 없이 유지되는 값 입니다. 
    // 값이 변경되더라도 render를 발생시키지 않고, 
    // render 되더라도 값이 유지되는 특징을 가집니다!
    
    // 아이디
    const [user, setUser] = useState('');
    const [vaildName, setVaildName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    //비밀번호
    const [pwd, setPwd] = useState('');
    const [vaildPwd, setVaildPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    // 비밀번호 확인
    const [matchPwd, setMatchPwd] = useState('');
    const [vaildMatch, setVaildMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // 성공 / 에러 여부
    // 에러시 에러메시지
    const [errMsg, setErrMsg] = useState('');
    // 성공 미성공 -- api에 보낼 상태
    const [sucess, setSuccess] = useState(false);

    // 페이지 로드시 한번만
    useEffect(() => {   
        userRef.current.focus();
        // 켜자마자 자동으로 user Id 인풋에 커서가 맞춰짐...
    }, [])

    // user 관련 --ID가 바뀔때마다 그게 정규식과 맞는지 안맞는지 테스트해서 
    // 결과를 vaildName에 전달
    useEffect(() => {   
      const result = USER_REGEX.test(user);
      // console.log('result',result);
      // console.log('user',user);
      setVaildName(result);
  }, [user]);


// 비밀번호 관련 -- 패스워드가 변경되면 정규식 테스트
// 정규식 결과값을 전달하고 입력 패스워드와 재입력이 일치하는지 결과를 또 결과값 전달
  useEffect(() => {   
    const result = PW_REGEX.test(pwd);
    // console.log('result',result);
    // console.log('pwd',pwd);
    setVaildPwd(result);
 
    const match = pwd === matchPwd;
    setVaildMatch(match);

}, [pwd, matchPwd]);

// 에러 메세지 관련 -- 아이디 비번 비번매치에 따라 에러메세지 전달.
useEffect(() => {   
  setErrMsg('');
}, [user, pwd, matchPwd]);

// submit
const handleSubmit = async(e) => {
  e.preventDefault();
  // 만약 버튼을 이용하지 않은js hack
  const v1 = USER_REGEX.test(user);
  const v2 = USER_REGEX.test(pwd);

  if( !v1 || !v2 ) {
    setErrMsg("Invaild Entry");
    return;
  }
  console.log('submit id pw', user , pwd);
 try{
  const url = '/register';
  const payload = {
    user,
    pwd
  }
  // axios로 포스트 할때 URL , payload(뭘 보낼지),{header:{'Content-Type:'}}
  const res = await axios.post(url, 
    JSON.stringify(payload),
    {
      header:{'Content-Type': 'application/json'},
      withCredentials: true
    }
  );

    console.log(res.data);
    console.log(res.accessToken);
    console.log(JSON.stringify(res));
    setSuccess(true);



 } catch (err) {
  if(!err?.response) {
    setErrMsg('No server response')
  } else if (err.response?.status === 409) {
    setErrMsg('userName taken')
  } else {
    setErrMsg('registration failed.')
  }
  errRef.current.focus();

 }


  
}


  return (

    <> {sucess ? (
        //만약 이미 등록이 완료된 상태일때. -- 또 등록창을 보여주면 안되니까
      // 회원가입 창으로 유도
      <section>
        <h1>Success!</h1>
        <p> 
          <a href="#">sign In</a>
        </p>
      </section>
    ) : (
      // 등록이 성공이지 않을때 등록창이 뜸.
    <section>  
      {/* 에러메세지 */}
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
      >{errMsg}</p>

      <h1>register</h1>
      <form 
      className='rigister-form'
      onSubmit={handleSubmit}
      >
        {/* ID 입력 */}
        <label htmlFor="username">
          username
          {/* vaildName이 통과이면 체크 */}
          <span className={vaildName ? "vaild" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* vaildName이 통과이거나 인풋창이 공백일때도 불통과 아이콘을 숨긴다. */}
          <span className={vaildName ||!user ? "hide" : "vaild"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input 
          type="text"
          id="username"
          ref={userRef}
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          // 스크린리더와 관련
          aria-invalid={vaildName ? "false" : "true"}
          aria-describedby="uidnote"
          required
          autoComplete="off"
           />
           {/* 유저인풋 경고창 -- vaildName에 통과하지 못한 경우에 대한 경고*/}
           <p 
           id="uidnote"
           className={userFocus && user && !vaildName ? "instructions" : "offscreen"}
           >
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 ~ 24자. <br/>
            반드시 문자로 시작.<br/>
            문자, 숫자, -, _ 가능.
           </p>
        {/*// ID 입력 */}

        {/* PWD 입력 */}
        <label htmlFor="password">
          password:
          {/* vaildPwd 통과이면 체크 */}
          <span className={vaildPwd ? "vaild" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* vaildPwd 통과이거나 인풋창이 공백일때도 불통과 아이콘을 숨긴다. */}
          <span className={vaildPwd ||!pwd ? "hide" : "vaild"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input 
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          // 스크린리더와 관련
          aria-invalid={vaildPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          required
           />
           {/* 유저인풋 경고창 -- vaildName에 통과하지 못한 경우에 대한 경고*/}
           <p 
           id="pwdnote"
           className={pwdFocus && pwd && !vaildPwd ? "instructions" : "offscreen"}
           >
            <FontAwesomeIcon icon={faInfoCircle}/>
            8 ~ 24자. <br/>
            영문 숫자 조합.<br />
            허용되는 특수문자 : 
            <span aria-label="exclamation mark">!</span>
            <span aria-label="골뱅이">@</span>
            <span aria-label="hash tag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
           </p>
        {/* // PWD 입력 */}

        {/* PWD 확인 입력 */}
        <label htmlFor="confirm_pwd">
          confirm password:
          {/* vaildPwd 통과이면 체크 */}
          <span className={vaildMatch && matchPwd ? "vaild" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* vaildPwd 통과이거나 인풋창이 공백일때도 불통과 아이콘을 숨긴다. */}
          <span className={vaildMatch ||!matchPwd ? "hide" : "vaild"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input 
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          // 스크린리더와 관련
          aria-invalid={vaildMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          required
           />
           {/* 유저인풋 경고창 -- vaildName에 통과하지 못한 경우에 대한 경고*/}
           <p 
           id="confirmnote"
           className={matchFocus && !vaildMatch ? "instructions" : "offscreen"}
           >
            <FontAwesomeIcon icon={faInfoCircle}/>
            비밀번호를 재입력 해주세요.
           </p>
           {/* // PWD 재입력 */}

           <button 
            disabled={!vaildName || !vaildPwd || !vaildMatch ? true : false }
           >등록</button>

           <p>
            회원가입을 하셨나요?<br/>
            <span className="line">
              {/* put router Link */}
              <a href="#">sign in</a>
            </span>
           </p>



      </form>

    
    </section>
      )}
    </>
  )
}

export default Register