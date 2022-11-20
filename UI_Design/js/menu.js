var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";

function fetchAllDinner() {
  fetch(url + "/api/dinner", {
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

      for (var i = 0; i < 4; i++) {
        document.getElementById("dinner" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].dinner);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].detail);
        document.getElementById("price" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].price) + "원";
      }
    })
    .catch((error) => console.log("error", error));
}

function createAddress(){
  fetch(url + "/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: {
      'detail': document.getElementsByClassName('address-setting')[0].value;
    }
  })
}