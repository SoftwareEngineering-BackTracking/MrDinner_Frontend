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

      console.log(JSON.stringify(resData.dinnerList[1].detail));

      for (var i = 0; i < 4; i++) {
        document.getElementById("dinner" + toString(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].dinner);
        document.getElementById("detail" + toString(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].detail);
        document.getElementById("price" + toString(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].price);
      }
    })
    .catch((error) => console.log("error", error));
}
