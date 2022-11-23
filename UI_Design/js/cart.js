
var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
//var url = "http://127.0.0.1:8080"

function addLoadEvents(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            onload();
            func();
        }
    }
}

const cartItemNo = -1;

function fetchCartItem() {
    fetch(url+"/api/cartitem", {
        method: "GET",
        mode: 'cors',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*'
        }}).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.cartItems.length)
            for (var i = 0; i < response.cartItems.length; i++){
                cartItemNo = response.cartItems[i].cartItemNo;
                const dinner = response.cartItems[i].dinner;
                const cartNo = response.cartItems[i].cartNo;
                const price = response.cartItems[i].price;
                const style = response.cartItems[i].style;
            }
        })
}
addLoadEvents(fetchCartItem); // onload 추가

for(var k = 0; k < cartItemNo.length ; k++){
    function fetchCartDetail() {
        fetch(url+"/api/cartdetail", {
            method: "GET",
            mode: 'cors',
            headers: {
            'Content-Type':'application/json;charset=utf-8',
            'Access-Control-Allow-Origin':'*',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'cartItemNo': cartItemNo[k]
            }}).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response.cartItems.length)
                for (var i = 0; i < response.cartItems.length; i++){
                    const name = response.cartDetails[i].name;
                    const status = response.cartDetails[i].status;
                }
            })
    }
    addLoadEvents(fetchCartDetail); // onload 추가
}


function deleteCartItem() {
    fetch(url+"/api/cartitem", {
        method: "DELETE",
        mode: 'cors',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'cartItemNo': cartItemNo[input] // input 값이 들어와야함 -> html에서 받아오자
        }}).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.dtoMetaData.message);
        })
}

function deleteCartDetail() {
    fetch(url+"/api/cartdetail", {
        method: "DELETE",
        mode: 'cors',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'cartDetailNo': cartItemNo[input] // input 값이 들어와야함 -> html에서 받아오자
        }}).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.dtoMetaData.message);
        })
}