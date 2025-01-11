function DashboardController(){
    
    this.start = async (systemApiClient) => {
        var stats = await systemApiClient.getSimpleStats();    
    }

}