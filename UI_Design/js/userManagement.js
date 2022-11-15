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

      var tc = new Array();
      var html = '';

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in resData.userList) {
        html += '<tr>';
        html += '<td>' + resData.userList[i].name + '</td>';
        html += '<td>' + resData.userList[i].id + '</td>';
        html += '<td>' + resData.userList[i].nickname + '</td>';
        html += '<td>' + resData.userList[i].phoneNumber + '</td>';
        html += '<td>' + resData.userList[i].email + '</td>';
        html += '</tr>';
      }

      $("#userTbody").empty();
      $("#userTbody").append(html);
    })
    .catch((error) => console.log("error", error));
}

function fetchDemand() {
  fetch(url + "/api/demand", {
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

      var tc = new Array();
      var html = '';

      var tempRes = JSON.stringify(response);
      var resData = JSON.parse(tempRes);

      for (var i in resData.demandList) {
        const dateData = resData.demandList[i].createdDate.match(/\d{4}-\d{2}-\d{2}/);

        html += '<tr>';
        html += '<td>' + dateData + '</td>';
        html += '<td>' + resData.demandList[i].price + '</td>';
        html += '</tr>';
      }

      $("#earnTbody").empty();
      $("#earnTbody").append(html);

    })
    .catch((error) => console.log("error", error));
}
