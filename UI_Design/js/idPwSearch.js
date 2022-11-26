//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
var url = "http://localhost:8080";

function openIdModal(){
    document.getElementById('modal').style.display = 'flex';
};

function closeIdModal(){
    document.getElementById('modal').style.display = 'none';
};

function openPwModal(){
    document.getElementById('modal2').style.display = 'flex';
};

function closePwModal(){
    document.getElementById('modal2').style.display = 'none';
};

const recoverId = async () => {
    const postResponse = await fetch(url+"/api/recover/id", {
        mode: 'cors',
        method: "GET",
        credentials: 'same-origin',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'email': document.getElementById('email').value
        }
    })
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            return response.json();
        }}).then((response) => {
            console.log("response:", response);
            
            document.getElementById('recovered-id').innerHTML = response.id;
            openIdModal();

        }).catch((error) => {
            console.log('ID 정보 생성 실패');
            console.log(error);
        })
};

const recoverPw = async () => {
    if (document.getElementById('recovered-password').value == ''){
        return alert('비밀번호를 입력하세요.');
    }
    const postResponse = await fetch(url+"/api/recover/password", {
        mode: 'cors',
        method: "PUT",
        credentials: 'same-origin',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*'
        },
        body:JSON.stringify({
            'id': document.getElementById('id').value,
            'newPassword': document.getElementById('recovered-password').value 
        })
    })
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            alert('변경되었습니다.');
            closePwModal();
            return response.json();
        }}).catch((error) => {
            console.log('비밀번호 수정 실패');
            console.log(error);
            alert('비밀번호 수정 실패');
        })
};

const verifyEmail = async () => {
    data = {email : document.getElementById('email').value,
            authCode: document.getElementById('auth-code').value};
    const postResponse = await fetch(url+"/api/auth/code/send", {
        method: "POST",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)})
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            console.log("response:", response.json());
            console.log('이메일 인증 완료');
            recoverId();
        }}).catch((error) => {
            console.log('이메일 인증 실패');
            console.log(error);
        })
    
}

const sendEmail = async () => {
    data = {email : document.getElementById('email').value};
    const postResponse = await fetch(url+"/api/auth/code/send", {
        method: "POST",
        mode: 'cors',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        Connection: 'keep-alive',
        Accept: '*/*'
        },
        body: JSON.stringify(data)
    })
    //const post = await postResponse.json()
    .then((response) => {
        console.log(response.json());
//        onInputEmail();
        if (response.ok){
            console.log("response:", response);
            return console.log('메일 보내기 완료')
        }}).catch((error) => {
            console.log('메일 보내기 실패');
            console.log(error);
            alert('메일 보내기 실패');
        })
    
}

const verifyEmail2 = async () => {
    data = {email : document.getElementById('email').value,
            authCode: document.getElementById('auth-code').value};
    const postResponse = await fetch(url+"/api/auth/code/send", {
        method: "POST",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)})
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            console.log("response:", response.json());
            console.log('이메일 인증 완료');
            openPwModal();
        }}).catch((error) => {
            console.log('이메일 인증 실패');
            console.log(error);
            alert('이메일 인증 실패')
        })
    
}