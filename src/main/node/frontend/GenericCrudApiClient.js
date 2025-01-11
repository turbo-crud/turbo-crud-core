function GenericCrudApiClient(){

    this.simpleQueryEndpoint = "/api/:entity/query";

    this.getMenuSimpleList = async (entity, query) => {
        const rawResponse = await fetch(this.simpleQueryEndpoint.replace(":entity", entity), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });
        const content = await rawResponse.json();
        console.log(content);
    }
}