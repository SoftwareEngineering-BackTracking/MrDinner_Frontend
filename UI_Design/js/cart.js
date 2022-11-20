var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io"

const login = async () => {
    const postResponse = await fetch(url+"/api/auth/login", {
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'id': document.getElementById('ID').value,
        'password': document.getElementById('Password').value
        }})
    //const post = await postResponse.json()
    .then((response) => {
        
        modalOn(); // 일단 대기창 띄워놓기
        if (response.ok){
            console.log("response:", response.json());
            setCookie(document.getElementById('ID').value, document.getElementById('ID').value, 20); // 쿠키 저장
            setTimeout(function() {
                modalOff()}, 1000); // 성공시 1초 후 대기창 내리기
            go_main();
            return console.log('쿠키 저장 완료(로그인 성공)')
        }}).catch((error) => {
            console.log('로그인 실패');
        })
    
}

window.onload = function() {
    fetch(url+"/api/cartitem", {
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8'
        }}).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.cartItems.length)
            for (var i = 0; i < response.cartItems.length; i++){
                const dinner = response.cartItems[i].dinner;
                const cartNo = response.cartItems[i].cartNo;
                const price = response.cartItems[i].price;
                const style = response.cartItems[i].style;
            }
            
            
        })
}