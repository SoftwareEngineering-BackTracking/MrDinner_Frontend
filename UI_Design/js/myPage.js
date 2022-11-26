document.write('<script src="../js/cookie.js"></script>');

//var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";
var url = "http://127.0.0.1:8080";

var modifiedNickname;
var modifiedPhone;
var modifiedEmail;
var modifiedAddress

function fetchUser() {
  fetch(url + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      id: getCookie("id"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      document.getElementById("name").innerHTML =
        "이름 : " + JSON.stringify(response.name);
      document.getElementById("phone").innerHTML =
        "Tel. : " + JSON.stringify(response.phoneNumber);
      document.getElementById("nickname").innerHTML =
        "닉네임 : " + JSON.stringify(response.nickname);
      document.getElementById("email").innerHTML =
        "이메일 : " + JSON.stringify(response.email);
      document.getElementById("type").innerHTML =
        "유형 : " + JSON.stringify(response.department);
    })
    .catch((error) => console.log("error", error));
}

// function fetchAddress() {
//   fetch(url + "/api/address", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//       "Access-Control-Allow-Origin": "*",
//       Connection: "keep-alive",
//       Accept: "*/*",
//       id: getCookie("id"),
//       addressNo: null,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((response) => {
//       console.log(response);

//       var tempRes = JSON.stringify(response);
//       var resData = JSON.parse(tempRes);

//       document.getElementById("address").innerHTML =
//         "주소 : " + JSON.stringify(resData.addressList[0].detail);
//     })
//     .catch((error) => console.log("error", error));
// }

function chngNickname() {
  modifiedNickname = prompt("변경할 닉네임을 입력하세요.");
  alert("닉네임이 변경되었습니다.");
}

function chngPhone() {
  modifiedPhone = prompt("변경할 전화번호를 입력하세요.");
  alert("전화번호가 변경되었습니다.");
}

function chngEmail() {
  modifiedEmail = prompt("변경할 이메일 입력하세요.");
  alert("이메일이 변경되었습니다.");
}

function chngAddress() {
  modifiedAddress = prompt("변경할 주소를 입력하세요.");
  alert("주소가 변경되었습니다.");
}

function changeAll() {
    fetch(url + "/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
          Accept: "*/*",
          id: getCookie("id"),
        },
        body: {
            "id": getCookie("id"),
            "name": null,
            "birth": null,
            "phoneNumber": modifiedPhone,
            "email": modifiedEmail,
            "nickname": modifiedNickname,
            "address": modifiedAddress,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log("error", error));
}

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
          var cardNumber = response.purchaseList[response.purchaseList.length - 1].cardNumber;
          var bank = response.purchaseList[response.purchaseList.length - 1].bank;
          // 결제 수단 정보 innerHTML 바꾸기
          document.getElementById('bank').innerHTML += bank;
          document.getElementById('card-number').innerHTML += cardNumber;
          setCookie('purchaseNo', purchaseNo);
      }).catch((error) => {
          console.log('결제 정보 불러오기 실패');
          alert('결제 정보 불러오기 실패');
      })
};

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
            <div id = 'coupon-list'>
              <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                  <div class="col-md-6">
                    <div class="coupon p-3 bg-white">
                      <div class="row no-gutters">
                        <div class="col-md-4 border-right">
                          <div class="d-flex flex-column align-items-center">
                            <img src="../assets/img/logos/icons8-개구리.gif" width="100px">
                            <span class="d-block"></span>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div>
                            <div class="d-flex flex-row justify-content-end off">
                              <h1 id = 'price'>${res.couponList[i].price}</h1><h1>원</h1>
                            </div>
                            <div class="d-flex flex-row justify-content-between off px-3 p-2">
                              <span id = name>${res.couponList[i].name}</span>
                              <span class="border border-success px-3 rounded code" id = 'endTime'>${res.couponList[i].endTime.substr(0, 10)}</span>
                            </div>
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

const fetchDemand = async () => {
  const postResponse = await fetch(url+"/api/demand", {
      mode: 'cors',
      method: "GET",
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      Accept: '*/*',
      filter: getCookie('id')
      }})
  .then((res) => {
      return res.json();
      }).then((res) => {
          console.log(res.demandList);
          var orderInfoBox = document.getElementById('order-info-box');

          for(i=0; i<res.demandList.length; i++){
            orderInfoBox.innerHTML += `
            <div class = 'order-info'>
              <div id = 'No' style="padding-right: 1rem;">${res.demandList[i].demandno}</div>
              <div id = 'title' style="font-weight: bold; padding-right: 0.5rem;">${res.demandItemList[i].dinner}</div>
              <div id = 'style' style="padding-right: 2rem;">(${res.demandItemList[i].style})</div>
              <div id = 'price' style="padding-right: 2rem;">${res.demandList[i].price}원</div>
              <div class = 'status-box' onclick="cancelDemand(${res.demandList[i].demandno})">
                <div id = 'status'>${res.demandList[i].status}</div>
              </div>
            </div>
            `
              
          }
      }).catch((error) => {
          console.log(error);
      })
  
}

function cancelDemand(demandNo) {
  fetch(url + "/api/demand", {
      mode: "cors",
      method: "GET",
      headers: {
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
          Accept: "*/*",
          "Content-Type": "application/json;charset=utf-8",
          demandNo: demandNo
      },
  })
      .then((response) => {
        if (response.ok){
          location.href = 'myPage.html';
          return response.json()
        }
          
      }).catch((error) => console.log("error", error));
}