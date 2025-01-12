const SidebarMenuController = require("./SidebarMenuController.js");
const SystemApiClient = require("./SystemApiClient.js");
const GenericCrudApiClient = require("./GenericCrudApiClient.js");
const DashboardController = require("./DashboardController.js");
const GenericCrudController = require("./GenericCrudController.js");
const NotificationController = require("./NotificationController.js");
const UiContext = require("./UiContext.js");
const BaseCrudHome = require("./templates/BaseCrudHome.html");
const CreateForm = require("./templates/CreateForm.html");

document.addEventListener("DOMContentLoaded", async function (event) {
    console.log("Frontend engine: start");

    handlebarsSetup();



    //instantiation
    var sidebarMenuController = new SidebarMenuController();
    var dashboardController = new DashboardController();
    var systemApiClient = new SystemApiClient();
    var genericCrudApiClient = new GenericCrudApiClient();
    var genericCrudController = new GenericCrudController();
    var baseCrudHome = new BaseCrudHome();
    var createForm = new CreateForm();
    var uiContext = new UiContext();
    var notificationController = new NotificationController();

    //setup
    genericCrudController.setup(genericCrudApiClient, uiContext, baseCrudHome, createForm,
      notificationController
    );
    dashboardController.setup(systemApiClient);
    sidebarMenuController.setup(systemApiClient, uiContext);

    //start
    genericCrudController.start();
    dashboardController.start();
    await sidebarMenuController.start();

});



function handlebarsSetup(){
  Handlebars.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
  });
  
  Handlebars.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  });

  /*{{#compare var1 '==' var2}}
      
    {{/compare}}
  */
  Handlebars.registerHelper('compare', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});  
  
}