document.write('<script src="../js/cookie.js"></script>');

// var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var url = "http://127.0.0.1:8080";

if (document.getElementsByClassName('dinner-name')[0].textContent == 'Valentine Dinner'){
  var dinner = '발렌타인';
} else if(document.getElementsByClassName('dinner-name')[0].textContent == 'English Dinner'){
  var dinner = '잉글리시';
} else if(document.getElementsByClassName('dinner-name')[0].textContent == 'French Dinner'){
  var dinner = '프렌치';
} else{
  var dinner = '샴페인';
};

const createCartItem = async () => {
  var style = document.getElementById('style-select');
  data = {
    'id': getCookie('id'),
    'dinner': dinner,
    'style': style.options[style.selectedIndex].value
  };
  const postResponse = await fetch(url + "/api/cartitem", {
    method: "POST",
    mode: 'cors',
    headers: {
    'Content-Type':'application/json;charset=utf-8',
    'Access-Control-Allow-Origin':'*',
    Connection: 'keep-alive',
    Accept: '*/*'
    },
    body: JSON.stringify({
      'id': getCookie('id'),
      'dinner': dinner,
      'style': style.options[style.selectedIndex].value
    })
  }).then((response) => {
    if (response.ok){
      location.href = 'cart.html'
    }
      return response.json();
    })
    .catch((error) => console.log("error", error));
}

// document.getElementsByClassName('add-cart-box')[0].onclick = function() {
//   createCartItem();
// }


// 카트 아이템 
const fetchCartItem = async () => {
  const postResponse = await fetch(url+"/api/cartitem", {
      mode: 'cors',
      method: "GET",
      headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      Accept: '*/*'
      }
  })
  //const post = await postResponse.json()
  .then((response) => {
      if (response.ok){
          console.log("response:", response.json());
          console.log(response.headers);
          return console.log(document.cookie);
      }}).catch((error) => {
          console.log('로그인 실패');
      })
};