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
      document.getElementById("birth").innerHTML =
        "생년월일 : " + resData.userList[0].birth;
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
const nicknamechng = async () => {
  let chngnickname = prompt("변경할 닉네임을 입력하세요." + "");
  alert("닉네임이 변경되었습니다.");

  const postResponse = await fetch(url + "/api/user", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      nickname: chngnickname,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log("error", error));
};

function phonechng() {
  let chngphone = prompt("변경할 전화번호를 입력하세요." + "");
  alert("전화번호가 변경되었습니다.");

  fetch(url + "/api/user", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      phoneNumber: chngphone,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log("error", error));
}

function emailchng() {
  let chngemail = prompt("변경할 이메일을 입력하세요." + "");
  alert("이메일이 변경되었습니다.");

  fetch(url + "/api/user", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: chngemail,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log("error", error));
}

function addchng() {
  let chngadd = prompt("변경할 주소를 입력하세요." + "");
  alert("주소가 변경되었습니다.");

  fetch(url + "/api/address", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      detail: chngadd,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log("error", error));
}
