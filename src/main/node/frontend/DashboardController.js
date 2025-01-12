function DashboardController(){
    
    this.systemApiClient;

    this.setup = async (systemApiClient) => {
        this.systemApiClient = systemApiClient;
    }

    this.start = async () => {
        var stats = await this.systemApiClient.getSimpleStats();    
    }

}