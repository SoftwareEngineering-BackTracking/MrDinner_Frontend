var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";

function fetchUser() {
  fetch(url + "/api/user", {
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
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      var swiperWrapper = document.getElementById('swiper-wrapper');

      for (var i in response.demandList.length) {
        swiperWrapper.innerHTML +=
        `
        <div class="swiper-slide">
          <div class="container0">
            <div class=outercontainer0>
              <div class="innercontainer">
                <div class="area1">
                  <div class="dinnercontainer">
                    <div class="dinnername" id="dinner" style="margin-top: 1rem;">발렌타인</div>
                    <div class="add">추가사항</div>
                    <div id = 'add-info'>참치</div>
                  </div>
                </div>
                <div class = 'line-box' style="display: flex; justify-content: center;">
                  <div class = 'line' style="border: 1px solid black; width: 90%;"></div>
                </div>
                <div class="area2">
                  <div class="dinnercontainer">
                    <div class="username" id="username" style="margin-top: 1rem; padding-left: 2rem;">주문인 정보:</div>
                    <div class="name" style="margin-top: 1rem; padding-left: 2rem;">이름: </div>
                    <div id = 'tel'style="margin-top: 1rem; padding-left: 2rem;">Tel.</div>
                    <div id = 'address'style="margin-top: 1rem; padding-left: 2rem;"></div>
                  </div>
                </div>
              </div>
              <div class="ordernumber0" id="order0">주문번호 n</div>
            </div>
            <div class="orderstatus0" id="status0">주문대기중</div>
          </div>
        </div>
        `
        const dateData = JSON.stringify(resData.demandList[i].createdDate).match(/[0-2][0-4]:[0-5][0-9]:[0-5][0-9]/);

        document.getElementById("order" + String(i)).innerHTML =
          "주문번호 " + JSON.stringify(resData.demandList[i].demandno);
        document.getElementById("status" + String(i)).innerHTML =
          JSON.stringify(resData.demandList[i].status);
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchCartItem() {
  fetch(url + "/api/cartitem", {
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

function prevLook() {}

function nextLook() {}


const swiper = new Swiper('.swiper-container', {
  //기본 셋팅
  //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
  direction: 'horizontal',
  //한번에 보여지는 페이지 숫자
  slidesPerView: 3,
  //페이지와 페이지 사이의 간격
  spaceBetween: 30,
  //드레그 기능 true 사용가능 false 사용불가
  debugger: true,
  //마우스 휠기능 true 사용가능 false 사용불가
  mousewheel: true,
  //반복 기능 true 사용가능 false 사용불가
  loop: true,
  //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
  centeredSlides: true,
  // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
  // effect: 'fade',
  
  
  //자동 스크를링
  autoplay: {
    //시간 1000 이 1초
    delay: 2500,
    disableOnInteraction: false,
   },
  
  //페이징
  pagination: {
    //페이지 기능
    el: '.swiper-pagination',
    //클릭 가능여부
    clickable: true,
  },

  //방향표
  navigation: {
    //다음페이지 설정
    nextEl: '.swiper-button-next',
    //이전페이지 설정
    prevEl: '.swiper-button-prev',
  },
  
});