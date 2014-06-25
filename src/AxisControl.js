define(function() {
  
  var AxisControl = function(key1,key2) {
    this.key1 = key1;
    this.key2 = key2;
    
    this.going1 = false;
    this.going2 = false;
    
    
  }
  
  AxisControl.prototype = {
      
      goOne: function() {
        if (this.going2) {
          this.going2 = false;
          keyup(this.key2);
        }
        if (!this.going1) {
          this.going1 = true;
          keydown(this.key1);
        } 
      },
      
      stopOne:function() {
        if (this.going1) {
          this.going1 = false;
          keyup(this.key1);
        } 
      },
      
      goTwo: function() {
        if (this.going1) {
          this.going1 = false;
          keyup(this.key1);
        }
        if (!this.going2) {
          this.going2 = true;
          keydown(this.key2);
        } 
      },
      
      stopTwo:function() {
        if (this.going2) {
          this.going2 = false;
          keyup(this.key2);
        } 
      },
      
      stop: function() {
        if (this.going1) {
          this.going1 = false;
          keyup(this.key1);
        } else if (this.going2) {
          this.going2 = false;
          keyup(this.key2);
        }
        
      }
      
  };
  
  return AxisControl;
  
  
  
});