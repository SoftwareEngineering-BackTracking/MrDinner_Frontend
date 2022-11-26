document.write('<script src="../js/cookie.js"></script>');
function modalOn() {
    const waiting_modal = document.getElementsByClassName('modal-overlay')[0];
    waiting_modal.style.display = 'flex';
}

function modalOn2() {
    const waiting_modal = document.getElementsByClassName('modal-overlay2')[0];
    waiting_modal.style.display = 'flex';
}

function modalOff() {
    const waiting_modal = document.getElementsByClassName('modal-overlay')[0];
    waiting_modal.style.display = 'none';
}

function modalOff2() {
    const waiting_modal2 = document.getElementsByClassName('modal-overlay2')[0];
    waiting_modal2.style.display = 'none';
}

function getPromise() {
    return fetch(endpoint)
      .then(res => res.json())
      .then(funcData => console.log(`이것이 바로 우리가 추출하고 싶어하는 value : ${funcData}`))
}

function go_login() {
    location.href= "login.html";
}

//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
var url = "http://localhost:8080";

var CheckId = true

const checkId = async () => {
    const postResponse = await fetch(url+"/api/auth/signup/checkid", {
        mode: 'cors',
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'id': document.getElementsByClassName('id')
        }}).then((response) => {
            return response.json();
          })
        .then((response) => {
            console.log(response)
            var exception = response.dtoMetaData.exception;
            if (exception == null){
                modalOn();
                CheckId = true;
            }
            else{
                modalOn2();
                CheckId = false;
            }
        })
        .catch((error) => {
            console.log('중복 인증 실패');
            console.log("response:", error);
        })
}
function getCheckboxValue()  {
    // 선택된 목록 가져오기
    const query = 'input[name="department"]:checked';
    const selectedEls = 
        document.querySelectorAll(query);
    
    // 선택된 목록에서 value 찾기
    let result = '';
    selectedEls.forEach((el) => {
      result += el.value;
    });
    
    // 출력
    return result
}
var department = '직원'

const signup = async () => {
    department = getCheckboxValue();

    // data = {
    //     'id': document.getElementsByClassName('id')[0].value,
    //     'password': document.getElementsByClassName('password')[0].value,
    //     'name': getCookie('name'),
    //     'birth': getCookie('birth'),
    //     'phoneNumber': getCookie('phone'),
    //     'email': getCookie('email'),
    //     'nickname': document.getElementsByClassName('nickname')[0].value,
    //     'department': department
    // };
    
    const postResponse = await fetch(url+"/api/user", {
        mode: 'cors',
        method: "POST",
        headers: {
            'Content-Type':'application/json;charset=utf-8',
            'Access-Control-Allow-Origin':'*',
            Connection: 'keep-alive',
            Accept: '*/*',
        },
        body: JSON.stringify({
            'id': document.getElementsByClassName('id')[0].value,
            'password': document.getElementsByClassName('password')[0].value,
            'name': getCookie('name'),
            'birth': getCookie('birth'),
            'phoneNumber': getCookie('phone'),
            'email': getCookie('email'),
            'nickname': document.getElementsByClassName('nickname')[0].value,
            'department': department
        })
    })
    .then((response) => {
        if (response.ok && CheckId == true){
            console.log("response:", response.json());
            go_login();
            return console.log('회원가입 성공');
        }}).catch((error) => {
            console.log('회원가입 실패');
            console.log("error:", error);
        })
    
}
