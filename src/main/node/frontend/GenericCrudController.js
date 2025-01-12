function GenericCrudController() {

  this.genericCrudApiClient;
  this.formsMetadata;
  this.baseCrudHome;

  this.setup = (genericCrudApiClient, formsMetadata, baseCrudHome) => {
    this.genericCrudApiClient = genericCrudApiClient;
    this.formsMetadata = formsMetadata;
    this.baseCrudHome = baseCrudHome;
  }

  this.start = () => {
    document.addEventListener("menu-event", menuRouter);
  }

  menuRouter = (e) => {
    var menuName = e.detail.name;
    console.log(`menuName: ${menuName}`);

    var entityInfo = this.formsMetadata.entities.find(x => x.name === menuName);

    var html = this.baseCrudHome.rawHtml();

    var template = Handlebars.compile(html);

    var result = template(entityInfo);

    document.getElementById("mainContent").innerHTML = result;
    addListeners(entityInfo);

    $(`#table_search_result_${entityInfo.name}`).DataTable();
  }

  addListeners = (entityInfo) => {

    var searchButton = document.getElementById(`search_button_${entityInfo.name}`);
    searchButton.addEventListener("click", genericSearch);

  }

  genericSearch = async (event) => {
    console.log("search...");

    var entityName = event.target.getAttribute("entity-name");

    if(!entityName){
      console.log("Failed to get the entity name from search button");
      return;
    }
    
    var entityInfo = this.formsMetadata.entities.find(x => x.name === entityName);

    var queryFields = [];
    let filledFields = 0;
    //get fields from dom
    for (var field of entityInfo.fields) {
      if (field.type !== "string") continue;

      let expectedHtmlElementId = `search_field_${entityInfo.name}_${field.name}`;
      var htmlElement = document.getElementById(expectedHtmlElementId);
      if (htmlElement.value!="") {
        queryFields.push({ name: field.name, value: htmlElement.value });
        filledFields++;
      }
    }

    if(filledFields==0){
      $.notify("Warning: Search needs at least one field", "warn");
      return;
    }

    let table = $(`#table_search_result_${entityInfo.name}`).DataTable();
    table.clear().draw();

    var result = await this.genericCrudApiClient.simpleAndFind(entityName, queryFields);
    console.log(result);

    if(result.metadata.code !== 200000){
      console.log("Failed to perform a the search")
      console.log(result.metadata.message);
      return;
    }

    if(!result.data || !result.data.results || result.data.results.length === 0){
      console.log("Searche returned 0 rows")
      return;
    }

    for(var rowToAdd of result.data.results){
      let values = Object.values(rowToAdd);
      table.row
      .add(values)
      .draw(false);  
    }
  
  }

}