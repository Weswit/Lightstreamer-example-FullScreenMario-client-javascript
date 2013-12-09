define(["AxisControl"],function(AxisControl) {
  function TouchHandler(num,opt) {
    var obj = opt || {};
    obj.touchStart = function() {
      keydown(num);
    };
    obj.touchEnd = function() {
        keyup(num);
    };
    return obj;
  };
  
  //var rightLeft = new AxisControl(39,37);


  //TODO let's show it in the mobile case only
  var opt ={ 
    left: {
      type: 'buttons',
      buttons: [false,false,false,false],
      
      //type: 'joystick', 
      //position: { left: '15%', bottom: '25%' },
      /*joystick: {
        radius: 150,
        touchEnd: function() {
          rightLeft.stop();
          
          currY = 0;
        },
        touchMove: function(details) {
          
          if(details.normalizedX > 0) {
            rightLeft.goOne();      
          } else if(details.normalizedX < 0) {
            rightLeft.goTwo();
          } else { //== 0
            rightLeft.stop();
          }
          
           if (details.normalizedY > 0) {
            upDown.goOne();
          } else if (details.normalizedY < 0) {
            upDown.goTwo();
          } else { // details.normalizedY >= gamma >= details.normalizedY
            upDown.stop();
          }
          
         
        }
      }*/
    },
    right: { 
      position: { 
          right: '17%' 
      }, 
      type: 'buttons', 
      buttons: [
        TouchHandler(16,{ 
          label: 'fire/sprint', 
          fontSize: 13
        }),
        false,
        TouchHandler(38,{ 
          label: 'jump', 
          fontSize: 13
        }),
        false
      ] 
    }
  };
  
  
  return {
    
    create: function() {
      //hack
      var ua = navigator.userAgent.toLowerCase();      
      if (ua.indexOf("mobile") > -1) {
        GameController.init(opt);
      }
       
    },
    
    destroy: function() {
      //not implemented
    }
  
  };
  
  
});