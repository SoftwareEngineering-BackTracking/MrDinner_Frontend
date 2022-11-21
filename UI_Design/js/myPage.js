var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";

function fetchUser() {
  fetch(url + "/api/user", {
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

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);

      document.getElementById("name").innerHTML =
        "이름 : " + resData.userList[0].name;
      document.getElementById("phone").innerHTML =
        "Tel. : " + resData.userList[0].phoneNumber;
      document.getElementById("nickname").innerHTML =
        "닉네임 : " + resData.userList[0].nickname;
      document.getElementById("email").innerHTML =
        "이메일 : " + resData.userList[0].email;
      document.getElementById("type").innerHTML =
        "유형 : " + resData.userList[0].department;
    })
    .catch((error) => console.log("error", error));
}

function fetchAddress() {
  fetch(url + "/api/address", {
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

      var tempRes = JSON.stringify(response);
      tempRes.replace(/"/g, "");

      var resData = JSON.parse(tempRes);

      document.getElementById("address").innerHTML =
        "주소 : " + resData.addressList[0].detail;
    })
    .catch((error) => console.log("error", error));
}
