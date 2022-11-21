var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";
var i = 0;

const fetchUser = async () => {
  const postResponse = await fetch(url + "/api/user", {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      var tc = new Array();
      var html = "";

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in resData.userList) {
        html += "<tr>";
        html += "<td>" + resData.userList[i].name + "</td>";
        html += "<td>" + resData.userList[i].id + "</td>";
        html += "<td>" + resData.userList[i].nickname + "</td>";
        html += "<td>" + resData.userList[i].phoneNumber + "</td>";
        html += "<td>" + resData.userList[i].email + "</td>";
        html += "</tr>";
      }

      $("#userTbody").empty();
      $("#userTbody").append(html);
    })
    .catch((error) => console.log("error", error));
};

function fetchDemand() {
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
      console.log(response);

      var tc = new Array();
      var html = "";

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in resData.demandList) {
        const dateData =
          resData.demandList[i].createdDate.match(/\d{4}-\d{2}-\d{2}/);

        html += "<tr>";
        html += "<td>" + dateData + "</td>";
        html += "<td>" + resData.demandList[i].price + "</td>";
        html += "</tr>";
      }

      $("#earnTbody").empty();
      $("#earnTbody").append(html);
    })
    .catch((error) => console.log("error", error));
}
