document.write('<script src="../js/cookie.js"></script>');
var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io"

document.getElementsByClassName('next-button1')[0].addEventListener('click', () => {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone-number').value;
    var address = document.getElementById('address').value;
    setCookie('name', name , 5);
    setCookie('email', email , 5);
    setCookie('phone', phone , 5);
    setCookie('address', address , 5);
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