function UiContext(){

  this.uiSettings;

  this.setUiSettings = (data) => {
    this.uiSettings = data;
  }
  this.getUiSettings = () => {
    return this.uiSettings;
  }
  
};