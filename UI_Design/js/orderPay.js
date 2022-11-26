//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
var url = "http://localhost:8080";
document.write('<script src="../js/cookie.js"></script>');

function openPurchaseModal(){
    document.getElementById('modal').style.display = 'flex';
};

function closePurchaseModal(){
    document.getElementById('modal').style.display = 'none';
};

const modal1 = document.getElementById('pay-modal');
modal1.addEventListener("click", (e) => {
    if (e.target === modal1) document.getElementById('modal').style.display = 'none'
})
const fetchPurchase = async () => {
    const postResponse = await fetch(url+"/api/purchase", {
        mode: 'cors',
        method: "GET",
        credentials: 'same-origin',
        headers: {
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'id': getCookie('id')
        }
    })
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            return response.json()
        }}).then((response) => {
            console.log("response:", response);
            const purchaseNo = response.purchaseList[response.purchaseList.length - 1].purchaseNo;
            var cardNumber = response.purchaseList[response.purchaseList.length - 1].cardNumber;
            var bank = response.purchaseList[response.purchaseList.length - 1].bank;
            // 결제 수단 정보 innerHTML 바꾸기
            document.getElementById('bank').innerHTML = bank;
            document.getElementById('card-number').innerHTML = cardNumber;
            setCookie('purchaseNo', purchaseNo);
        }).catch((error) => {
            console.log('결제 정보 불러오기 실패');
            alert('결제 정보 불러오기 실패');
        })
};

const createPurchase = async () => {
    var cardNumbmer = document.getElementById('card-number1').value+ document.getElementById('card-number2').value+ document.getElementById('card-number3').value+ document.getElementById('card-number4').value;
    var bank = document.getElementById('bank-select');
    const postResponse = await fetch(url+"/api/purchase", {
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
          'id': getCookie('id'),
          'cardNumber': cardNumbmer,
          'bank': bank.options[bank.selectedIndex].value
        })
    })
    //const post = await postResponse.json()
    .then((response) => {
        if (response.ok){
            return console.log(response.json());
        }}).then((response) => {
            console.log("response:", response);
            document.getElementById('modal').style.display = 'none';
            fetchPurchase();
        }).catch((error) => {
            console.log('결제 정보 생성 실패');
            console.log(error);
        })
};

const createDemand = async () => {
    const postResponse = await fetch(url + "/api/demand", {
      method: "POST",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*',
      Connection: 'keep-alive',
      Accept: '*/*'
      },
      body: JSON.stringify({
        'id': getCookie('id')
      })
    }).then((response) => {
      if (response.ok){
        alert('주문 생성 완료');
      }
        return response.json();
      })
      .catch((error) => {
        console.log("error", error);
        alert('주문 생성 실패!');
    });
};

const payCart = async () => {
    if (getCookie('id') == null){
      return alert('다시 로그인하세요!')
    };
    createDemand();
    const postResponse = await fetch(url + "/api/cart/payment", {
      method: "POST",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*',
      Connection: 'keep-alive',
      Accept: '*/*'
      },
      body: JSON.stringify({
        'id': getCookie('id'),
        'couponNo': 1,
        'purchaseNo': getCookie('purchaseNo')
      })
    }).then((response) => {
      if (response.ok){
        alert('결제 성공');
        }
        return response.json();
      })
      .catch((error) => console.log("error", error));
};


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
          var orderContent = document.getElementById('order-content');

          for(i=0; i<res.cartItems.length; i++){
            orderContent.innerHTML += `
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