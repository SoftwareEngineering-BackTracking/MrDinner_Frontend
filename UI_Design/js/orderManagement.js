var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var i = 0;

function fetchUser() {
  fetch(url + "/api/user", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");
      var resData = JSON.parse(tempRes);
      
      for (i in response.userList) {
        document.getElementById("nameinfo" + String(i)).innerHTML =
          "이름 : " + resData.userList[i].name + "<br>";
        document.getElementById("phoneinfo" + String(i)).innerHTML =
          "Tel. : " + resData.userList[i].phoneNumber + "<br>";
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchDemand() {
  fetch(url + "/api/demand", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
      "filter": "azz33",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);

      for (i in response.demandList) {
        const dateData = JSON.stringify(
          resData.demandList[i].createdDate
        ).match(/[0-2][0-4]:[0-5][0-9]:[0-5][0-9]/);

        document.getElementById("order" + String(i)).innerHTML =
          "주문번호 " + resData.demandList[i].demandno;
        document.getElementById("status" + String(i)).innerHTML =
          resData.demandList[i].status;
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchCartItem() {
  fetch(url + "/api/cartitem", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);

      for (i in response.cartItems) {
        document.getElementById("dinner" + String(i)).innerHTML =
        resData.cartItems[i].dinner + "(" + resData.cartItems[i].style + ")";
      }
    })
    .catch((error) => console.log("error", error));
}

function fetchAddress() {
  fetch(url + "/api/address", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);

      for (i in response.addressList) {
        document.getElementById("addressinfo" + String(i)).innerHTML =
          "주소 : " + resData.addressList[i].detail;
      }
    })
    .catch((error) => console.log("error", error));
}

function prevLook() {
  i -= 3;
  fetchUser();
  fetchDemand();
  fetchCartItem();
  fetchCartDetail();
  fetchAddress();
}

function nextLook() {
  i += 3;
  fetchUser();
  fetchDemand();
  fetchCartItem();
  fetchCartDetail();
  fetchAddress();
}
