var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";

function fetchUser() {
    fetch(url + "/api/user", {
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

            document.getElementById("name").innerHTML =
                "이름 : " + JSON.stringify(resData.userList[0].name);
            document.getElementById("phone").innerHTML =
                "Tel. : " + JSON.stringify(resData.userList[0].phoneNumber);
            document.getElementById("nickname").innerHTML =
                "닉네임 : " + JSON.stringify(resData.userList[0].nickname);
            document.getElementById("email").innerHTML =
                "이메일 : " + JSON.stringify(resData.userList[0].email);
            document.getElementById("type").innerHTML =
                "유형 : " + JSON.stringify(resData.userList[0].department);
        })
        .catch((error) => console.log("error", error));
}

function fetchAddress() {
    fetch(url + "/api/address", {
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

            document.getElementById("address").innerHTML =
                "주소 : " + JSON.stringify(resData.addressList[0].detail);

        })
        .catch((error) => console.log("error", error));
}