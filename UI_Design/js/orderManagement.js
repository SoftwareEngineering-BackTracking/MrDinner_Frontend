//var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";
var url = "http://localhost:8080";

function acceptOrder() {
  document.getElementById("status0").innerHTML = "주문 진행중";
}

function deliveryStart() {
  const deletediv = document.getElementsByClassName("swiper-slide")[0];

  if (document.getElementById("status0").innerHTML != "주문 진행중") {
    alert("먼저 주문을 수락하셔야합니다.");
  } else {
    document.getElementById("status0").innerHTML = "배달 진행중";
    setTimeout(function () {
      document.getElementById("status0").innerHTML = "배달 완료";
      setTimeout(function () {
        deletediv.remove();
      }, 3000);
    }, 3000);
  }
}

function fetchUser() {
  fetch(url + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in response.userList) {
        document.getElementById("nameinfo" + String(i)).innerHTML =
          "이름 : " + JSON.stringify(resData.userList[i].name);
        ("<br>");
        document.getElementById("phoneinfo" + String(i)).innerHTML =
          "Tel. : " + JSON.stringify(resData.userList[i].phoneNumber) + "<br>";
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchDemand() {
  fetch(url + "/api/demand", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      var swiperWrapper = document.getElementsByClassName("swiper-wrapper")[0];

      for (i = 0; i < response.demandList.length; i++) {
        for (j = 0; j < response.demandItemList[i].length; j++) {
          //for(k=0; j < response.demandDetailList.length ; k++){
          if (
            response.demandList[i].demandno ==
            response.demandItemList[i][j].demandNo.demandno
          ) {
            console.log(j);
            //if(response.demandItemList[i][j].demandNo.demandno == response.demandDetaiList[j][k].demandItemNo.demanditemno){
            swiperWrapper.innerHTML += `
        <div class="swiper-slide" id="swiper">
          <div class="container0">
            <div class=outercontainer0>
              <div class="innercontainer">
                <div class="area1">
                  <div class="dinnercontainer">
                    <div class="dinnername" id="dinner" style="margin-top: 1rem;">${
                      response.demandItemList[i][j].dinner.dinner
                    } / ${response.demandItemList[i][j].style.style}</div>
                    <div class="dinnername" id="dinner" style="margin-top: 1rem;">${
                      response.demandItemList[i][j].price
                    }원</div>
                    </div>
                </div>
                <div class = 'line-box' style="display: flex; justify-content: center;">
                  <div class = 'line' style="border: 1px solid black; width: 90%;"></div>
                </div>
                <div class="area2">
                  <div class="dinnercontainer">
                    <div class="username" id="username" style="margin-top: 1rem; padding-left: 2rem;">주문인 정보: ${
                      response.demandList[i].userId.id
                    }</div>
                    <div class="name" style="margin-top: 1rem; padding-left: 2rem;">이름: ${
                      response.demandList[i].userId.name
                    }</div>
                    <div id = 'tel'style="margin-top: 1rem; padding-left: 2rem;">Tel. ${
                      response.demandList[i].userId.phoneNumber
                    }</div>
                    <div id = 'address'style="margin-top: 1rem; padding-left: 2rem;"></div>
                  </div>
                </div>
              </div>
              <div class="ordernumber0" id="order0">주문번호 ${j + 1}</div>
            </div>
            <div class="orderstatus0" id="status0">수락</div>
            <div class="btncontainer" style="margin-top: 3rem;">
                      <button class="orderbtn" style="margin-right: 0.5rem;" id="orderstatus" onclick="acceptOrder()">주문
                          수락</button>
                      <button class="orderbtn" style="margin-left: 0.5rem;" id="deliverystatus" onclick="deliveryStart()">배달
                          시작</button>
                  </div>
          </div>
        </div>
        `;
          }
        }
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchCartItem() {
  fetch(url + "/api/cartitem", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in response.cartItems) {
        document.getElementById("dinner" + String(i)).innerHTML =
          JSON.stringify(resData.cartItems[i].dinner) +
          "(" +
          JSON.stringify(resData.cartItems[i].style) +
          ")";
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchCartDetail() {
  fetch(url + "/api/cartdetail", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in response.cartDetails) {
        document.getElementById("add" + String(i)).innerHTML =
          "* " +
          JSON.stringify(resData.cartDetails[i].name) +
          JSON.stringify(resData.cartDetails[i].status);
      }
    })
    .catch((error) => console.log("error", error));
}

/*function fetchAddress() {
  fetch(url + "/api/address", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);
      for (var i in response.addressList) {
        document.getElementById("addressinfo" + String(i)).innerHTML =
          "주소 : " + JSON.stringify(resData.addressList[i].detail);
      }
    })
    .catch((error) => console.log("error", error));
}*/
