var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var i = 0;

const fetchDinnerIngredient = async () => {
  const postResponse = await fetch(url + "/api/dinneringredient", {
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
      var resData = JSON.parse(tempRes);

      for (; i < 4; i++) {
        document.getElementById("dinnerIngredient" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinnerIngredient);
        document.getElementById("dinner" + String(i)).innerHTML =
          "디너 : " +
          JSON.stringify(resData.dinnerIngredientList[i].dinner) +
          "<br>";
        document.getElementById("price" + String(i)).innerHTML =
          "가격 : " +
          JSON.stringify(resData.dinnerIngredientList[i].price) +
          "<br>";
        document.getElementById("demandDate" + String(i)).innerHTML =
          "입고일 : " +
          JSON.stringify(resData.dinnerIngredientList[i].demandDate);
        document.getElementById("stock" + String(i)).innerHTML =
          "남은 수량 : " +
          JSON.stringify(resData.dinnerIngredientList[i].quantity);
      }
    })
    .catch((error) => console.log("error", error));
};

function lookPrev() {
  fetch(url + "/api/dinneringredient", {
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
      var tempRes = JSON.stringify(response);
      tempRes.replaceAll('\\"', "");
      var resData = JSON.parse(tempRes);
      var j = 0;

      console.log(resData.dinnerIngredientList[1]);

      for (i -= 4; i < i + 4; i++) {
        document.getElementById("dinnerIngredient" + String(j)).innerHTML =
          JSON.stringify(resData.dinnerIngredientList[i].dinnerIngredient);
        document.getElementById("dinner" + String(j)).innerHTML =
          "디너 : " +
          JSON.stringify(resData.dinnerIngredientList[i].dinner) +
          "<br>";
        document.getElementById("price" + String(j)).innerHTML =
          "가격 : " +
          JSON.stringify(resData.dinnerIngredientList[i].price) +
          "<br>";
        document.getElementById("demandDate" + String(j)).innerHTML =
          "입고일 : " +
          JSON.stringify(resData.dinnerIngredientList[i].demandDate);
        document.getElementById("stock" + String(j)).innerHTML =
          "남은 수량 : " +
          JSON.stringify(resData.dinnerIngredientList[i].quantity);
        j++;
      }
      console.log(i);
    })
    .catch((error) => console.log("error", error));
}

function lookNext() {
  fetch(url + "/api/dinneringredinet", {
    mode: "cons",
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
      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);
      var j = 0;

      console.log(resData.dinnerIngredientList[1]);

      for (; i < i + 4; i++) {
        document.getElementById("dinnerIngredient" + String(j)).innerHTML =
          resData.dinnerIngredientList[i].dinnerIngredient;
        document.getElementById("dinner" + String(j)).innerHTML =
          "디너 : " + resData.dinnerIngredientList[i].dinner + "<br>";
        document.getElementById("price" + String(j)).innerHTML =
          "가격 : " + resData.dinnerIngredientList[i].price + "<br>";
        document.getElementById("demandDate" + String(j)).innerHTML =
          "입고일 : " + resData.dinnerIngredientList[i].demandDate;
        document.getElementById("stock" + String(j)).innerHTML =
          "남은 수량 : " + resData.dinnerIngredientList[i].quantity;
        j++;
      }
      console.log(i);
    })
    .catch((error) => console.log("error", error));
}
