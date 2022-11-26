document.write('<script src="../js/cookie.js"></script>');

//var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";
var url = "http://127.0.0.1:8080";

var modifiedNickname;
var modifiedPhone;
var modifiedEmail;
var modifiedAddress

function fetchUser() {
  fetch(url + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      id: getCookie("id"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      document.getElementById("name").innerHTML =
        "이름 : " + JSON.stringify(response.name);
      document.getElementById("phone").innerHTML =
        "Tel. : " + JSON.stringify(response.phoneNumber);
      document.getElementById("nickname").innerHTML =
        "닉네임 : " + JSON.stringify(response.nickname);
      document.getElementById("email").innerHTML =
        "이메일 : " + JSON.stringify(response.email);
      document.getElementById("type").innerHTML =
        "유형 : " + JSON.stringify(response.department);
    })
    .catch((error) => console.log("error", error));
}

// function fetchAddress() {
//   fetch(url + "/api/address", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//       "Access-Control-Allow-Origin": "*",
//       Connection: "keep-alive",
//       Accept: "*/*",
//       id: getCookie("id"),
//       addressNo: null,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((response) => {
//       console.log(response);

//       var tempRes = JSON.stringify(response);
//       var resData = JSON.parse(tempRes);

//       document.getElementById("address").innerHTML =
//         "주소 : " + JSON.stringify(resData.addressList[0].detail);
//     })
//     .catch((error) => console.log("error", error));
// }

function chngNickname() {
  modifiedNickname = prompt("변경할 닉네임을 입력하세요.");
  alert("닉네임이 변경되었습니다.");
}

function chngPhone() {
  modifiedPhone = prompt("변경할 전화번호를 입력하세요.");
  alert("전화번호가 변경되었습니다.");
}

function chngEmail() {
  modifiedEmail = prompt("변경할 이메일 입력하세요.");
  alert("이메일이 변경되었습니다.");
}

function chngAddress() {
  modifiedAddress = prompt("변경할 주소를 입력하세요.");
  alert("주소가 변경되었습니다.");
}

function changeAll() {
    fetch(url + "/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
          Accept: "*/*",
          id: getCookie("id"),
        },
        body: {
            "id": getCookie("id"),
            "name": null,
            "birth": null,
            "phoneNumber": modifiedPhone,
            "email": modifiedEmail,
            "nickname": modifiedNickname,
            "address": modifiedAddress,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log("error", error));
}
