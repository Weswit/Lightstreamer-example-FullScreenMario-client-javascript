define(["./lsClient","Gamepad"],function(lsClient,Gamepad) {
  
  var loggedIn = false;
  var wasIn = false;
  
  lsClient.addListener({
    
    onListenStart: function() {
      this.onStatusChange(lsClient.getStatus());
    },
    
    onStatusChange: function(newStatus) {
      console.log(newStatus);
      if (newStatus.indexOf("CONNECTED:") == 0 || newStatus == "STALLED") {
        enableLogin();
        if (wasIn) {
          wasIn = false;
          login.submitNick();
        }
      } else {
        if (loggedIn) {
          logOut();
          showLoginError("Connection Lost");
        }
        disableLogin();
        
        if (newStatus == "DISCONNECTED:WILL-RETRY") {
          //hack
          setTimeout(function() {
            console.log("hack")
            lsClient.connect();
          },5000);
        }
        
      }
     
    }
  });
  
  
  
  
  function enableLogin() {
    document.getElementById("loginForm").style.display = "";
    document.getElementById("nick_button").disabled = false;
    document.getElementById("user_nick").disabled = false;
    hideLoginError();
  }
  function disableLogin() {
    document.getElementById("nick_button").disabled = true;
    document.getElementById("user_nick").disabled = true;
  }

  function letsGo(userName,changed) {
    loggedIn = true;
        
    hideLoginError();
    disableLogin();
    
    readyFun(userName,changed);
    showLoading();
    
  }
  
  function logOut() {
    loggedIn = false;
    wasIn = true;
    login.init();
    
    stopFun();
  }

  function showLoginError(text) {
    document.getElementById("errorDiv").innerHTML = text;
    document.getElementById("errorDiv").style.display = "";
  }

  function hideLoginError() {
    document.getElementById("errorDiv").style.display = "none";
  }
  
  function showLoading() {
    if (document.getElementById("loadingDiv")) {
      document.getElementById("loadingDiv").style.display = "";
    }
  }

  function hideLoading() {
    if (document.getElementById("loadingDiv")) {
      document.getElementById("loadingDiv").style.display = "none";
    }
  }
  
  var readyFun = function(){};
  var stopFun = function(){};
  
  var login = {
    init: function(callback,callbackStop) {
      readyFun = callback || readyFun;
      stopFun = callbackStop || stopFun;
      hideLoading();
      hideLoginError();
      document.getElementById('user_nick').focus();
    },
    
    loadingComplete: function() {
      hideLoading();
      Gamepad.create();
    },
    
    submitNick: function() {
      
      hideLoginError();
      
      if (document.getElementById("user_nick")) {
        var myNick = document.getElementById("user_nick").value;
        if (!myNick) {
          showLoginError("Please choose a nickname");
        } else if (myNick.indexOf(" ") != -1) {
          showLoginError("Space character is not allowed in the nickname");
        } else {
          disableLogin();
          lsClient.sendMessage("n|"+myNick, "Nick", 3000, {
            onAbort: function(originalMex, snt) {
              showLoginError("Unexpected error. Please try again.");
              enableLogin();
            },
            onDeny: function(originalMex, code, message) {
            
              if ( code == -2720 ) {
                letsGo(message,true);
              } else {
                showLoginError(message);
                enableLogin();
              }
            },
            onDiscarded: function(originalMex) {
              showLoginError("Unexpected error. Please try again.");
              enableLogin();
            },
            onError: function(originalMex) {
              showLoginError("Unexpected error. Please try again.");
              enableLogin();
            },
            onProcessed: function(originalMex) {
              // OK.
              letsGo(myNick);
            }
          });      
        }
      }
    }
  };
  
  return login;
  
});