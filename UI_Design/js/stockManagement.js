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
      dinnerIngredient: null,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      for (i = 0; i < response.dinnerIngredientList.length; i++) {
        document.getElementById("dinnerIngredient" + String(i)).innerHTML =
          response.dinnerIngredientList[i].dinnerIngredient;
        ("<br>");
        document.getElementById("price" + String(i)).innerHTML =
          "가격 : " + response.dinnerIngredientList[i].price + "<br>";
        document.getElementById("demandDate" + String(i)).innerHTML =
          "입고일 : " +
          response.dinnerIngredientList[i].demandDate.match(
            /\d{4}-\d{2}-\d{2}/
          );
        document.getElementById("stock" + String(i)).innerHTML =
          "남은 수량 : " + response.dinnerIngredientList[i].quantity;
      }
    })
    .catch((error) => console.log("error", error));
};

const addStock = async () => {
  let stock = prompt("추가할 물품을 입력하세요.");
  let stockNum = prompt("추가할 갯수를 입력하세요.");
  let quantity = stockNum;
  var i = 0;
  while(true){
    console.log(document.getElementById("dinnerIngredient" + String(i)).innerText);
    console.log(document.getElementById("dinnerIngredient" + String(i)).innerText, stock);
    if(document.getElementById("dinnerIngredient" + String(i)).innerText == stock){
      console.log (parseInt(stockNum));

      quantity = parseInt(document.getElementById("stock" + String(i)).innerText.slice(8, )) + parseInt(stockNum);
      break;
    }
    i++;
  }
  
  
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const postResponse = await fetch(url + "/api/dinneringredient", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
      dinnerIngredient: null,
    },
    body: JSON.stringify({
      dinnerIngredient: stock,
      quantity: quantity,
      demandDate: date,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      alert(stock + " " + String(stockNum) + "개가 추가되었습니다.");
      location.href = 'StockManagement.html';
    })
    .catch((error) => {
      console.log("error", error)
      alert("해당 재고가 없습니다.");
    }
    );
};