function SystemApiClient(){

    this.getUiSettingsEndpoint = "/system/ui-settings";
    this.getSimpleStatsEndpoint = "/system/stats";

    this.getUiSettings = async () => {
        var resHttp = await fetch(this.getUiSettingsEndpoint);
        var json = await resHttp.json();
        return json.data.result;
    }

    this.getSimpleStats = async () => {
        var resHttp = await fetch(this.getSimpleStatsEndpoint);
        var json = await resHttp.json();
        return json.data.results;
    }
}