<<<<<<< HEAD
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
    }
};

var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io"

function loadMenu(){
    fetch(url+"/api/dinner", {
        method: "POST",
        headers: {
        'Content-Type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            dinner: null
        })
    }).then((response) => {
        if (response.status == 200) {
            console.log("response:", response.json());
            setTimeout(function() {
                console.log("timeout");},3000);
            setTimeout(function() {
                console.log("timeout");},3000);
        }}).catch((error) => console.log("error", error))
};
=======
var url = "https://e308edc5-f1f5-4191-942d-9173192644d7.mock.pstmn.io";

function fetchAllDinner() {
  fetch(url + "/api/dinner", {
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
>>>>>>> 765164219aacc05f66f683c83987e0e536737269
