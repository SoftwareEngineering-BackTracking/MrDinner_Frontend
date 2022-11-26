var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"

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
        method: "POST",
        credentials: 'same-origin',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*'
        },
        body: JSON.stringify({
            'email': document.getElementById('email').value
        })
    })
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            return console.log(response.json());
        }}).then((response) => {
            console.log("response:", response);
            var tempRes = JSON.stringify(response);
            var resData = JSON.parse(tempRes);
            
            document.getElementById('recovered-id').innerHTML = resData.id;
            openIdModal();

        }).catch((error) => {
            console.log('결제 정보 생성 실패');
            console.log(error);
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
        }}).catch((error) => {
            console.log('이메일 인증 실패');
            console.log(error);
        })
    
}