var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";

function fetchDinner() {
  fetch(url + "/api/dinner", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      'dinner': 1
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.dinnerList);

      })
    .catch((error) => console.log("error", error));
}
