var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";
var i = 0;

function fetchDinnerIngredient() {
  fetch(url + "/api/dinneringredinet", {
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

      console.log(resData.dinnerIngredientList[1]);
    })
    .catch((error) => console.log("error", error));
}

function lookPrev() {
  fetch(url + "/api/dinneringredinet", {
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

      console.log(resData.dinnerIngredientList[1]);

      for (; i > i - 4; i--) {
        document.getElementById("dinner" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinnerIngredient);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinner);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].demandDate);
        document.getElementById("price" + String(i)).innerHTML = JSON.stringify(
          resData.dinnerIngredientList[i].quantity
        );
      }
    })
    .catch((error) => console.log("error", error));
}

function lookNext() {
  fetch(url + "/api/dinneringredinet", {
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
      1;

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      console.log(resData.dinnerIngredientList[1]);

      for (; i < i + 4; i++) {
        document.getElementById("dinner" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinnerIngredient);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinner);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].demandDate);
        document.getElementById("price" + String(i)).innerHTML = JSON.stringify(
          resData.dinnerIngredientList[i].quantity
        );
      }
    })
    .catch((error) => console.log("error", error));
}
