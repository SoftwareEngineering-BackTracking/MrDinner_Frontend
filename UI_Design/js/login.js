document.write('<script src="../js/cookie.js"></script>');

var LoginModalController = {
  tabsElementName: ".logmod__tabs li",
  tabElementName: ".logmod__tab",
  inputElementsName: ".logmod__form .input",
  hidePasswordName: ".hide-password",

  inputElements: null,
  tabsElement: null,
  tabElement: null,
  hidePassword: null,

  activeTab: null,
  tabSelection: 0, // 0 - first, 1 - second

  findElements: function () {
    var base = this;

    base.tabsElement = $(base.tabsElementName);
    base.tabElement = $(base.tabElementName);
    base.inputElements = $(base.inputElementsName);
    base.hidePassword = $(base.hidePasswordName);

    return base;
  },

  setState: function (state) {
    var base = this,
      elem = null;

    if (!state) {
      state = 0;
    }

    if (base.tabsElement) {
      elem = $(base.tabsElement[state]);
      elem.addClass("current");
      $("." + elem.attr("data-tabtar")).addClass("show");
    }

    return base;
  },

  getActiveTab: function () {
    var base = this;

    base.tabsElement.each(function (i, el) {
      if ($(el).hasClass("current")) {
        base.activeTab = $(el);
      }
    });

    return base;
  },

  addClickEvents: function () {
    var base = this;

    base.hidePassword.on("click", function (e) {
      var $this = $(this),
        $pwInput = $this.prev("input");

      if ($pwInput.attr("type") == "password") {
        $pwInput.attr("type", "text");
        $this.text("Hide");
      } else {
        $pwInput.attr("type", "password");
        $this.text("Show");
      }
    });

    base.tabsElement.on("click", function (e) {
      var targetTab = $(this).attr("data-tabtar");

      e.preventDefault();
      base.activeTab.removeClass("current");
      base.activeTab = $(this);
      base.activeTab.addClass("current");

      base.tabElement.each(function (i, el) {
        el = $(el);
        el.removeClass("show");
        if (el.hasClass(targetTab)) {
          el.addClass("show");
        }
      });
    });

    base.inputElements.find("label").on("click", function (e) {
      var $this = $(this),
        $input = $this.next("input");

      $input.focus();
    });

    return base;
  },

  initialize: function () {
    var base = this;

    base.findElements().setState().getActiveTab().addClickEvents();
  },
};

var url = "http://ec2-15-164-24-71.ap-northeast-2.compute.amazonaws.com:8080";

//var url = "http://127.0.0.1:8080"

function modalOn() {
  const waiting_modal = document.getElementsByClassName("modal-overlay")[0];
  waiting_modal.style.display = "flex";
}

function modalOff() {
  const waiting_modal = document.getElementsByClassName("modal-overlay")[0];
  waiting_modal.style.display = "none";
}

function go_main() {
  location.href = "main.html";
}

/*
function login(){

    fetch(url+"/api/user", {
        method: "POST",
        headers: {
        'Content-Type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: document.getElementById('ID').value,
            password: document.getElementById('Password').value
        })
    }).then((response) => {
        modalOn();
        if (response.status == 200) {
//            console.log("response:", response.json());
            let json = response.json();
            console.log(json.value);
            setTimeout(function() {
                modalOff()}, 3000);
            //setTimeout(function() {
          //      go_main()}, 3000);
        }}).catch((error) => console.log("error", error))
};
*/

/*
function login(){
    fetch(url+"/api/auth/login", {
        method: "POST",
        headers: {
        'Content-Type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: document.getElementById('ID').value,
            password: document.getElementById('Password').value
        })
    }).then((response) => {
        modalOn(); // 일단 대기창 띄워놓기
        // 정상 status = 200번 대
        if (response.ok) {
            
        }
    }).then((data) => { // 세션 아이디 받아오기
        
})
};
*/

const login = async () => {
  const postResponse = await fetch(url + "/api/auth/login", {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      Accept: "*/*",
      id: document.getElementById("ID").value,
      password: document.getElementById("Password").value,
    },
  })
    //const post = await postResponse.json()
    .then((response) => {
      modalOn(); // 일단 대기창 띄워놓기
      if (response.ok) {
        console.log("response:", response.json());
        setCookie("isLoggedin", true, 30); // 쿠키 저장
        setTimeout(function () {
          modalOff();
        }, 1000); // 성공시 1초 후 대기창 내리기
        //go_main();
        console.log(response.headers);
        return console.log(document.cookie);
      }
    })
    .catch((error) => {
      console.log("로그인 실패");
    });
};

function go_signup() {
  location.href = "SignUp1.html";
}
