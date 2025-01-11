function SystemApiClient(){

    this.getMenuSimpleEndpoint = "/system/menu";
    this.getSimpleStatsEndpoint = "/system/stats";

    this.getMenuSimpleList = async () => {
        var resHttp = await fetch(this.getMenuSimpleEndpoint);
        var json = await resHttp.json();

        return json.data.results
    }

    this.getSimpleStats = async () => {
        var resHttp = await fetch(this.getSimpleStatsEndpoint);
        var json = await resHttp.json();

        return json.data.results
    }
}