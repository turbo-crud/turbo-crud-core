function GenericCrudApiClient(){

    this.simpleQueryEndpoint = "/api/:entity/query";

    this.simpleAndFind = async (entity, queryFieldValues) => {

        const rawResponse = await fetch(this.simpleQueryEndpoint.replace(":entity", entity), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryFieldValues)
        });
        const content = await rawResponse.json();
        return content;
    }
}