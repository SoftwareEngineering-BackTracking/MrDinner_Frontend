var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";


function createCartItem() {
  var style = document.getElementById('style-select');
  fetch(url + "/api/cartitem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      dinner: document.getElementById('Password').value,
      style: style.options[style.selectedIndex].value
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.dinnerList);

      })
    .catch((error) => console.log("error", error));
}
