function GenericCrudController() {

  this.genericCrudApiClient;
  this.uiContext;
  this.baseCrudHome;
  this.createForm;
  this.notificationController;

  this.setup = (genericCrudApiClient, uiContext, baseCrudHome, createForm, 
    notificationController
  ) => {
    this.genericCrudApiClient = genericCrudApiClient;
    this.uiContext = uiContext;
    this.baseCrudHome = baseCrudHome;
    this.createForm = createForm;
    this.notificationController = notificationController;
  }

  this.start = () => {
    document.addEventListener("menu-event", menuRouter);
  }

  menuRouter = (e) => {
    var menuName = e.detail.name;
    console.log(`menuName: ${menuName}`);

    var entityInfo = this.uiContext.getUiSettings().entities.find(x => x.name === menuName);

    var html = this.baseCrudHome.rawHtml();

    var template = Handlebars.compile(html);

    var result = template(entityInfo);

    document.getElementById("mainContent").innerHTML = result;
    addHomeListeners(entityInfo);

    var datatableColumnsConfig = [];

    for (var field of entityInfo.fields) {
      let config = {};
      config["data"] = field.name;

      if(field.viewer && field.viewer === "pdf"){
        config["render"] = renderPdf;
      }

      datatableColumnsConfig.push(config);
    }

    $(`#table_search_result_${entityInfo.name}`).DataTable({columns: datatableColumnsConfig});
  }

  function renderPdf(data, type, full, meta) {
    return `<a href="${data}" target=_blank > <img src="assets/static/images/pdf_icon.png" width="25"></a>`;
  }

  addHomeListeners = (entityInfo) => {

    var searchButton = document.getElementById(`search_button_${entityInfo.name}`);
    searchButton.addEventListener("click", genericSearch);

    var showCreateFormButton = document.getElementById(`show_create_form_button_${entityInfo.name}`);
    showCreateFormButton.addEventListener("click", showCreateForm);
  }

  genericSearch = async (event) => {
    console.log("search...");

    this.notificationController.clear(); 
    
    var entityName = event.target.getAttribute("entity-name");

    let table = $(`#table_search_result_${entityName}`).DataTable();
    table.clear().draw();

    if (!entityName) {
      console.log("Failed to get the entity name from search button");
      return;
    }

    var entityInfo = this.uiContext.getUiSettings().entities.find(x => x.name === entityName);

    var queryFields = [];
    let filledFields = 0;
    //get fields from dom
    for (var field of entityInfo.fields) {
      if (field.type !== "string") continue;

      let expectedHtmlElementId = `search_field_${entityInfo.name}_${field.name}`;
      var htmlElement = document.getElementById(expectedHtmlElementId);
      if (htmlElement.value != "" && htmlElement.value.length>=3) {
        queryFields.push({ name: field.name, value: htmlElement.value });
        filledFields++;
      }
    }

    if (filledFields == 0) {
      this.notificationController.showWarning("Search needs at least one field with 3 characters");   
      return;  
    }

    var result = await this.genericCrudApiClient.simpleAndFind(entityName, queryFields);
    
    if (result.metadata.code !== 200000) {
      console.log("Failed to perform a the search")
      console.log(JSON.stringify(result));
      return;
    }

    if (!result.data || !result.data.results || result.data.results.length === 0) {
      console.log("Searche returned 0 rows")
      return;
    }

    console.log(JSON.stringify(result.data.results, null, 4))

    for (var rowFound of result.data.results) {
      table.row
        .add(rowFound)
        .draw(false);
    }

  }

  showCreateForm = async (event) => {
    console.log("Show create form")
    var entityName = event.target.getAttribute("entity-name");

    if (!entityName) {
      console.log("Failed to get the entity name from show create form button");
      return;
    }

    var entityInfo = this.uiContext.getUiSettings().entities.find(x => x.name === entityName);

    var html = this.createForm.rawHtml();
    var template = Handlebars.compile(html);

    var result = template(entityInfo);

    document.getElementById("mainContent").innerHTML = result;
    addCreateFormListeners(entityInfo);
  }

  addCreateFormListeners = (entityInfo) => {
    var backButton = document.getElementById(`back_create_button_${entityInfo.name}`);
    backButton.addEventListener("click", genericBack);

    var createButton = document.getElementById(`create_button_${entityInfo.name}`);
    createButton.addEventListener("click", genericCreate);
  }

  genericBack = async (event) => {
    var entityName = event.target.getAttribute("entity-name");
    //we emit the same event of menu to force a clean home render
    document.dispatchEvent(new CustomEvent("menu-event", {
      'detail': {
        name: entityName
      }
    }));
  }

  genericCreate = async (event) => {
    this.notificationController.clear();

    var entityName = event.target.getAttribute("entity-name");

    var form = $(`#create_form_${entityName}`)[0];
    if (!form.checkValidity()){
      this.notificationController.showError("Please fill the required fields and try again");
      form.classList.add('was-validated');
      return;
    }

    //required files exist

    //validate required fields
    var entityInfo = this.uiContext.getUiSettings().entities.find(x => x.name === entityName);
    
    var requiredhatAreMissingCount = 0;
    var fieldsToCreate = {};
    for(var field of entityInfo.fields){
      let expectedHtmlElementId = `create_form_field_${entityInfo.name}_${field.name}`;
      var htmlElement = document.getElementById(expectedHtmlElementId);
      if (htmlElement.value != "") {
        fieldsToCreate[field.name] = htmlElement.value;
      }else{
        if(field.required ===true){
          requiredhatAreMissingCount++;
        }
      }
    }
    
    if(requiredhatAreMissingCount>0){
      this.notificationController.showError("Please fill the required fields and try again");
      return;
    }

    var response = await this.genericCrudApiClient.simpleCreate(entityName, fieldsToCreate);
    
    if (response.metadata.code !== 200000) {
      console.log(JSON.stringify(response));
      this.notificationController.showError(response.metadata.message);
      return;
    }

    this.notificationController.showSuccess(`${entityName} created`);
    form.reset();
  }
}