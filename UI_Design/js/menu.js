
var url = "http://127.0.0.1:8080";
document.write('<script src="../js/cookie.js"></script>');
//var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";

function fetchAllDinner() {
  fetch(url + "/api/dinner", {
    mode: 'cors',
    method: "GET",
    headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*',
      Connection: 'keep-alive',
      Accept: '*/*'
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i = 0; i < 4; i++) {
        document.getElementById("dinner" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].dinner);
        document.getElementById("detail" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].detail);
        document.getElementById("price" + String(i)).innerHTML =
          JSON.stringify(resData.dinnerList[i].price) + "원";
      }
    })
    .catch((error) => console.log("error", error));
}

function createAddress(){
  fetch(url + "/api/address", {
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
      'detail': document.getElementsByClassName('address-setting')[0].value
    })
  })
}

function get_voice(){
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'ko-KR';

  recognition.start();
  recognition.onstart = function() {
    console.log('녹음 시작'); // 음성 인식 시작시마다 새로운 문단을 추가한다.
  };
  setTimeout(() => recognition.onend = function() {
    recognition.start();
    console.log('녹음 종료');
  }, 3000);
  
  recognition.onresult = function(e) {
    let texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");

    texts.replace(/느낌표|강조|뿅/gi, '❗️');
  
    
    };
  console.log(texts);
  
}