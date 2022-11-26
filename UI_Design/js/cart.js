//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var url = "http://127.0.0.1:8080"
document.write('<script src="../js/cookie.js"></script>');


const fetchCartItem = async () => {
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
    .then((res) => {
        return res.json();
        }).then((res) => {
            console.log(res.cartItems);
            var cartTest = document.getElementById('cart-test');

            for(i=0; i<res.cartItems.length; i++){
                cartTest.innerHTML += `
                <div class = 'cart-box'>
                <div class = 'cart-img-box'>
                    <div class = 'cart-img'></div>
                </div>
                <div class = 'cart-info-box'>
                    <div class = 'title'>${res.cartItems[i].dinner.dinner}</div>
                    <div class = 'style'>${res.cartItems[i].style.style}</div>
                    <div class = 'hash-tag'>${res.cartItems[i].dinner.detail}</div>
                    <div class = 'hash-tag'>${res.cartItems[i].style.detail}</div>
                </div>
                <div class = 'cart-right-box'>
                    <button class = 'cart-delete' id = '${i}delete-button' onclick = "deleteCartItem(${res.cartItems[i].cartItemNo})">삭제하기</button>
                    <div class = 'cart-price'>${res.cartItems[i].price}원</div>
                </div>
            </div>
        
                `
                
            }
        }).catch((error) => {
            console.log(error);
        })
    
}

const deleteCartItem = async (cartNo) => {
    const postResponse = await fetch(url+"/api/cartitem", {
        mode: 'cors',
        method: "DELETE",
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
                location.href = 'cart.html';
            }
        response.json()
        }).then((response) => {
            return response
        }).catch((error) => {
            console.log('장바구니 아이템 불러오기 실패');
        })
    
};