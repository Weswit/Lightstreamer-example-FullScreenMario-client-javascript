define(["AxisControl"], function(AxisControl) {
  
  var rightLeft = new AxisControl(39,37);
  //var upDown = new AxisControl(38,40);
  //var startUpGamma = 0;
  
  var idle = true;

  return {
    startListening: function() {
      idle = false;
      if (window.DeviceOrientationEvent) {
        
        window.addEventListener('deviceorientation', function(eventData) {
          if (idle) {
            return;
          }
          /*if (!startUpGamma) {
            startUpGamma = eventData.gamma;
          }*/
          
          if(eventData.beta > 0) {
            rightLeft.goOne();      
          } else if(eventData.beta < 0) {
            rightLeft.goTwo();
          } else { //== 0
            rightLeft.stop();
          }
          
          /*if (eventData.gamma > startUpGamma+10) {
            upDown.goOne();
          } else if (eventData.gamma < startUpGamma-30) {
            upDown.goTwo();
          } else { // startUpGamma >= gamma >= startUpGamma
            upDown.stop();
          }*/
          
        }, false);
      } 
    },
    stopListening: function() {
      //upDown.stop();
      rightLeft.stop();
      idle = true;
    }
  };
  
  
  
});