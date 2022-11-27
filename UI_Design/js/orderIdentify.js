document.write('<script src="../js/cookie.js"></script>');
var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";

function cancelStep() {
    fetch(url + "/api/demand", {
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
            delete response.demandList[0]; //세션 유지 성공 시 수정
        })
        .catch((error) => console.log("error", error));
}

function orderChange() {
    if (confirm("주문을 변경하시겠습니까?"))
        location.href = "Menu.html";
}

function orderCancel() {
    if (confirm("주문을 취소하시겠습니까?")) {
        cancelStep();
        alert("주문이 취소되었습니다.");
    }
}

function fetchDemand() {

    fetch(url + "/api/demand", {
        mode: "cors",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
            Accept: "*/*",
            "Content-Type": "application/json;charset=utf-8",
            "filter": "ms9648",
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

            //
            let crntindex = response.demandList.length - 1;
            document.getElementById("crntname").innerHTML =
                resData.demandList[crntindex].name;
            document.getElementById("crntstyle").innerHTML =
                "스타일 : " + resData.userList[crntindex].phoneNumber;
            document.getElementById("crntnum").innerHTML =
                "갯수 : " + resData.userList[crntindex].nickname;
            document.getElementById("crntadd").innerHTML =
                "추가사항 : " + resData.userList[crntindex].email;
            document.getElementById("crntprice").innerHTML =
                "주문 금액 : " + resData.userList[crntindex].department;
        })
        .catch((error) => console.log("error", error));
}

function fetchPastDemand() {

    fetch(url + "/api/demand", {
        mode: "cors",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
            Accept: "*/*",
            "Content-Type": "application/json;charset=utf-8",
            "filter": "ms9648",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);

            var i = 0;
            var tempRes = JSON.stringify(response);
            tempRes.replace(/"/g, "");

            var resData = JSON.parse(tempRes);

            for (let j = (resData.demandList.length - 2); j < (resData.demandList.length - 4); i--) {
                document.getElementById("crntname").innerHTML =
                    resData.demandList[j].name;
                document.getElementById("crntstyle").innerHTML =
                    "스타일 : " + resData.userList[j].phoneNumber;
                document.getElementById("crntnum").innerHTML =
                    "갯수 : " + resData.userList[j].nickname;
                document.getElementById("crntadd").innerHTML =
                    "추가사항 : " + resData.userList[j].email;
                document.getElementById("crntprice").innerHTML =
                    "주문 금액 : " + resData.userList[j].department;
                if(i > 2) i = 0;   
                i++; 
            }
        })
        .catch((error) => console.log("error", error));
}