function NotificationController(){

  this.notifyContainer = "#notify-container" //notifyjs-corner;
  this.autoHideDelayMillis = 10000;

  this.clear = () => {
    $(".notifyjs-container").empty();    
  }

  this.showError = (message) => {
    this.clear();
    $(this.notifyContainer).notify(message, { autoHideDelay: this.autoHideDelayMillis, position:"bottom right", className: "error" });
  }

  this.showWarning = (message) => {
    this.clear();
    $(this.notifyContainer).notify(message, { autoHideDelay: this.autoHideDelayMillis, position:"bottom right", className: "warn" });
  }

  this.showSuccess = (message) => {
    this.clear();
    $(this.notifyContainer).notify(message, { autoHideDelay: this.autoHideDelayMillis, position:"bottom right", className: "success" });
  }

  this.showInfo = (message) => {
    this.clear();
    $(this.notifyContainer).notify(message, { autoHideDelay: this.autoHideDelayMillis, position:"bottom right", className: "info" });
  }  
  
};