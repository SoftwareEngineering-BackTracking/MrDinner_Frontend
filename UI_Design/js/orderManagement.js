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

      for (var i in response.demandList) {
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
