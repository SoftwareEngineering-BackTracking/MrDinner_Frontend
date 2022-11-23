//var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";
//var url =  "http:127.0.0.1:8080"
var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080"

const createCartItem = async () => {
  var style = document.getElementById('style-select');
  data = {
    'dinner': dinner,
    'style': style.options[style.selectedIndex].value
  };
  const postResponse = await fetch(url + "/api/cartitem", {
    method: "POST",
    mode: 'cors',
    headers: {
    'Content-Type':'application/json;charset=utf-8',
    'Access-Control-Allow-Origin':'*',
    'withCredentials': true,
    'rejectUnauthorized': false,
    Connection: 'keep-alive',
    Accept: '*/*'
    },
    body: JSON.stringify(data)
  }).then((response) => {
      console.log(response.json())
      return response.json();
    })
    .catch((error) => console.log("error", error));
}