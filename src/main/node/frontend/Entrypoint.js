const SidebarMenuController = require("./SidebarMenuController.js");
const SystemApiClient = require("./SystemApiClient.js");
const GenericCrudApiClient = require("./GenericCrudApiClient.js");
const DashboardController = require("./DashboardController.js");
const BaseCrudHome = require("./templates/BaseCrudHome.html");

var formsMetadata = {
  "entities": [
    {
      "name": "Patient",
      "icon": "bx-user",
      "label": "Paciente",
      "fields": [
        {
          "name": "firstName",
          "type": "string",
          "unique": true,
          "required": true
        },
        {
          "name": "email",
          "type": "string",
          "unique": true,
          "required": true
        },
        {
          "name": "address",
          "type": "string",
          "unique": true,
          "required": true
        }
      ]
    }
  ]
};

document.addEventListener("DOMContentLoaded", async function (event) {
    console.log("Frontend starting...");

    handlebarsSetup();

    var _CONTEXT = {};



    var sidebarMenuController = new SidebarMenuController();
    var dashboardController = new DashboardController();
    var systemApiClient = new SystemApiClient();

    document.addEventListener("menu-event", menuRouter);

    dashboardController.start(systemApiClient);

    await sidebarMenuController.start(systemApiClient);

});

function menuRouter(e) {
    var menuName = e.detail.name;
    console.log(`menuName: ${menuName}`);

    var entityInfo = formsMetadata.entities.find(x => x.name === menuName);
    console.log(JSON.stringify(entityInfo))

    var html = new BaseCrudHome().rawHtml();

    var template = Handlebars.compile(html);

    var result = template(entityInfo);

    document.getElementById("mainContent").innerHTML = result;
    addListeners(entityInfo);

    $(`#table_search_result_${entityInfo.name}`).DataTable();
}

function addListeners(entityInfo){
  var genericCrudApiClient = new GenericCrudApiClient();
  var searchButton = document.getElementById(`search_button_${entityInfo.name}`);
  searchButton.addEventListener("click", genericSearch); 
}

function genericSearch(){
  console.log("search...")
}

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