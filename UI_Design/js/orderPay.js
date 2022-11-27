//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"
var url = "http://localhost:8080";
document.write('<script src="../js/cookie.js"></script>');

function openPurchaseModal(){
    document.getElementById('modal').style.display = 'flex';
};

function closePurchaseModal(){
    document.getElementById('modal').style.display = 'none';
};

function openCouponModal(){
  document.getElementById('modal2').style.display = 'flex';
};

function closeCouponModal(){
  document.getElementById('modal2').style.display = 'none';
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
        'couponNo': getElementById('couponNo').value,
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

var address;

const fetchMyAddress = async () => {
  const postResponse = await fetch(url+"/api/address", {
      mode: 'cors',
      method: "GET",
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      Accept: '*/*',
      id: getCookie('id'),
      addressNo: null
      }})
  .then((res) => {
      return res.json();
      }).then((res) => {
          console.log(res.addressList);
          address = res.addressList[res.addressList.length - 1];
      }).catch((error) => {
          console.log(error);
      })
  
}

const fetchUser = async () => {
  const postResponse = await fetch(url+"/api/user", {
      mode: 'cors',
      method: "GET",
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      Accept: '*/*',
      id: getCookie('id'),
      name: null,
      department: null
      }})
  .then((res) => {
      return res.json();
      }).then((res) => {
          console.log(res.cartItems);
          var custInfoBox = document.getElementById('customer-info-box');
          
          custInfoBox.innerHTML += `
            <div class = 'customer-info-top'>
                <div class = 'customer-title'>주문자 정보</div>
            </div>
            <div class = 'customer-info'>
                <div class = 'name'>${res.name}</div>
                <div class = 'phone-number'>${res.phoneNumber.substr(0, 3)} - ${res.phoneNumber.substr(3, 4)} - ${res.phoneNumber.substr(7, 4)}</div>
                <div class = 'address'>${address}</div>
            </div>
              `
      }).catch((error) => {
          console.log(error);
      })
  
}

const fetchMyCoupon = async () => {
  const postResponse = await fetch(url+"/api/coupon", {
      mode: 'cors',
      method: "GET",
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      Accept: '*/*',
      id: getCookie('id'),
      couponNo: null
      }})
  .then((res) => {
      return res.json();
      }).then((res) => {
          console.log(res.cartItems);
          var couponList = document.getElementById('coupon-list');

          for(i=0; i<res.couponList.length; i++){
            couponList.innerHTML += `
            <div class="container mt-5">
              <div class="d-flex justify-content-center row">
                <div class="col-md-6">
                  <div class="coupon p-3 bg-white" style="width: 100%">
                    <div class="row no-gutters">
                      <div class="col-md-4 border-right">
                        <div class="d-flex flex-column align-items-center">
                          <img src="../assets/img/logos/icons8-개구리.gif" width="100px">
                          <span class="d-block"></span>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div>
                          <div id = 'couponNo' style = 'color:transparent;'>${res.couponList[i].couponNo}</div>
                          <div class="d-flex flex-row justify-content-end off">
                            <h1 id = 'price' style = "font-size: 30px;">${res.couponList[i].price}</h1><h1 style = "font-size: 30px;">원</h1>
                          </div>
                          <div class="d-flex flex-row justify-content-between off px-3 p-2">
                            <span id = 'endTime'>~${res.couponList[i].endTime.substr(0, 10)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
          }
      }).catch((error) => {
          console.log(error);
      })
  
}