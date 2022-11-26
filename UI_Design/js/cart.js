//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var url = "http://127.0.0.1:8080"
document.write('<script src="../js/cookie.js"></script>');


const fetchCartItem = async () => {
    console.log(1);
    const postResponse = await fetch(url+"/api/cartitem", {
        mode: 'cors',
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        Accept: '*/*',
        id: getCookie('id')
        }})
    .then((response) => {
        return response.json()
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    
}

const deleteCartItem = async (cartNo) => {
    const postResponse = await fetch(url+"/api/cartitem", {
        mode: 'cors',
        method: "DEL",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        Accept: '*/*',
        id: getCookie('id')
        },
        body:JSON.stringify({
            'cartItemNo': cartNo
        })}).then((response) => {
            if (response.ok){
                alert('장바구니 품목이 삭제되었습니다!');
            }
        response.json()
        }).then((response) => {
            return response
        }).catch((error) => {
            console.log('장바구니 아이템 불러오기 실패');
        })
    
};