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
            var cartTest = document.getElementById('cart-test');
            for(i=0; i<res.cartItems.length; i++){
                cartTest.innerHTML += `
                    <div class = 'cart-box'>
                        <div class = 'show-detail' onclick="openrenderDetail('${res.cartItems[i].cartItemNo}')">?</div>
                        <div class = 'cart-img-box'>
                            <div class = 'cart-img'></div>
                        </div>
                        <div class = 'cart-img-box'>
                            <div class = 'cart-img'></div>
                        </div>
                        <div class = 'cart-info-box'>
                            <p id = 'cartItemNo'></p>
                            <div class = 'title'>${res.cartItems[i].dinner.dinner}</div>
                            <div class = 'style'>${res.cartItems[i].style.style}</div>
                            <div class = 'style' style = 'cursor: pointer;' onclick="renderDetail('${res.cartItems[i].dinner.dinner}', ${res.cartItems[i].cartItemNo})">추가메뉴</div>
                            <div class = 'hash-tag'>${res.cartItems[i].style.detail}</div>
                        </div>
                        <div class = 'cart-right-box'>
                            <button class = 'cart-delete' id = '${i}delete-button' onclick = "deleteCartItem(${res.cartItems[i].cartItemNo})">삭제하기</button>
                            <div class = 'cart-price'>${res.cartItems[i].price}원</div>
                        </div>
                    </div>
                `
                console.log("\'"+res.cartItems[i].dinner.dinner+"\'");
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


function renderDetail(dinner, cartNo){
    document.getElementsByClassName('detail-modal')[0].style.display = 'flex';
    var modalContent = document.getElementById('modal-content');
    if (dinner == '발렌타인'){
        modalContent.innerHTML += 
        `
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('발렌타인_고기', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>발렌타인_고기</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>6000원</div>
                </div>
            </div>
        </div>
        `
    }
    else if (dinner == '잉글리시'){
        modalContent.innerHTML += 
        `
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('잉글리시_고기', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>잉글리시_고기</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>8000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('샐러드_채소', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>샐러드_채소</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>4000원</div>
                </div>
            </div>
        </div>
        `
    }
    else if (dinner == '프렌치'){
        modalContent.innerHTML += 
        `
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('프렌치_고기', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>프렌치_고기</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>7000원</div>
                </div>
            </div>
        </div>
        `
    }
    else if (dinner == '샴페인'){
        modalContent.innerHTML += 
        `
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('샴페인_축제_고기', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>샴페인_축제_고기</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>9000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('와인', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>와인</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>7000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('샴페인', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>샴페인</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>8000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('계란', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>계란</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>2000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('빵', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>빵</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>2000원</div>
                </div>
            </div>
        </div>
        <div class = 'detail-box'>       
            <div class = 'detail-img-box'>
                <div class = 'detail-img'></div>
            </div>
            <div class = 'detail-info-box'>
                <button id = 'add-detail' onclick = "createCartDetail('베이컨', ${cartNo})">추가하기</button>
                <div id = 'dinnerIngredient'>베이컨</div>
                <div class = 'price-quantity-box'>
                    <div id = 'price'>2000원</div>
                </div>
            </div>
        </div>
        `
    }
    else{
        alert('세부사항 불러오기 오류!');
    }
}

const createCartDetail = async (dinner, cartItemNo) => {
    data = {
        cartItemNo : cartItemNo,
        name: [dinner],
        status: ['추가'],
        dinnerStyles: ['디너']
        };
    const postResponse = await fetch(url+"/api/cartdetail", {
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


const fetchCartDetail = async (cartNo) => {
    const postResponse = await fetch(url+"/api/cartdetail", {
        mode: 'cors',
        method: "GET",
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        Accept: '*/*',
        cartItemNo: cartNo
        }})
    .then((res) => {
        return res.json();
        }).then((res) => {
            var renderDetailBox = document.getElementById('render-detail');
            for(i=0; i<res.cartDetails.length; i++){
                renderDetailBox.innerHTML += `
                <div id = 'close-detail-btn' onclick="closeDetail()">X</div>
                <div class = 'title'>추가된 목록</div>
                <p style="font-size: 20px; padding-left: 2rem;">${i + 1}. ${res.cartDetails[i].name}, 가격:${res.cartDetails[i].price}원</p>
                `
            }
        }).catch((error) => {
            console.log(error);
        })
    
}