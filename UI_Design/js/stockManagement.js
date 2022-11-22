var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var i = 0;
var j = 0;

const fetchDinnerIngredient = async () => {
  const postResponse = await fetch(url + "/api/dinneringredient", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
      "dinneringredient": null,
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

      for (i; i < i + 4; i++) {
        document.getElementById("dinnerIngredient" + String(i)).innerHTML =
          resData.dinnerIngredientList[i].dinnerIngredient;
        document.getElementById("dinner" + String(j)).innerHTML =
          "디너 : " +
          resData.dinnerIngredientList[i].dinner +
          "<br>";
        document.getElementById("price" + String(j)).innerHTML =
          "가격 : " +
          resData.dinnerIngredientList[i].price +
          "<br>";
        document.getElementById("demandDate" + String(j)).innerHTML =
          "입고일 : " +
          resData.dinnerIngredientList[i].demandDate;
        document.getElementById("stock" + String(j)).innerHTML =
          "남은 수량 : " +
          resData.dinnerIngredientList[i].quantity;
        if (j > 3) j = 0;
        j++;
      }
    })
    .catch((error) => console.log("error", error));
};

function lookPrev() {
  i -= 4;
  fetchDinnerIngredient();
}

function lookNext() {
  i += 4;
  fetchDinnerIngredient();
}

function addStock() {
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
      console.log(response);
      for (let num in response.dinnerIngredientList) {
        response.dinnerIngredientList[num].quantity += 20;
        document.getElementById("stock" + String(num)).innerHTML =
          "남은 수량 : " +
          JSON.stringify(response.dinnerIngredientList[num].quantity);
      }
    })
    .catch((error) => console.log("error", error));
};
