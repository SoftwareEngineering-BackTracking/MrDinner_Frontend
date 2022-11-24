document.write('<script src="../js/cookie.js"></script>');
//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
var url = "http://localhost:8080";

document.getElementsByClassName('next-button1')[0].addEventListener('click', () => {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone-number').value;
    var address = document.getElementById('address').value;
    var birth = document.getElementById('birth').value;
    setCookie('name', name , 5);
    setCookie('email', email , 5);
    setCookie('phone', phone , 5);
    setCookie('address', address , 5);
    setCookie('birth', birth , 5);
}); 

const duplicate_name = async () => {
    const postResponse = await fetch(url+"/api/auth/signup/checkid", {
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'id': document.getElementById('name').value
        }}).then(response => response.json())
        .then(console.log())
        .then((postResponse) => {
            console.log(postResponse.dtoMetaData.message);
        })
        .catch((error) => {
            console.log('로그인 실패');
            console.log("response:", error);
        })
    
}

function onInputEmail(){
    document.getElementsByClassName('input-email-box')[0].style.display = 'flex';
    sendEmail();
}

function offInputEmail(){
    document.getElementsByClassName('input-email-box')[0].style.display = 'none';
}

const verifyEmail = async () => {
    data = {email : document.getElementById('email').value,
            authCode: document.getElementById('email-auth-code').value};
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
            offInputEmail();
            console.log('이메일 인증 완료');
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
        })
    
}