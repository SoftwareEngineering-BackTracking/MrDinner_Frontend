//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var url = "http://localhost:8080";
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
      "dinnerIngredient": null
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      

      for (i=0; i<response.dinnerIngredientList.length; i++) {
        document.getElementById("dinnerIngredient" + String(i)).innerHTML =
        response.dinnerIngredientList[i].dinnerIngredient;
          "<br>";
        document.getElementById("price" + String(i)).innerHTML =
          "가격 : " +
          response.dinnerIngredientList[i].price +
          "<br>";
        document.getElementById("demandDate" + String(i)).innerHTML =
          "입고일 : " +
          response.dinnerIngredientList[i].demandDate.match(/\d{4}-\d{2}-\d{2}/);
        document.getElementById("stock" + String(i)).innerHTML =
          "남은 수량 : " +
          response.dinnerIngredientList[i].quantity;
      }
    })
    .catch((error) => console.log("error", error));
};