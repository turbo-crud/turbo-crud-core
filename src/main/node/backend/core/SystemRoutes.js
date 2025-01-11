const HttpHelper = require("../http/HttpHelper.js");

function SystemRoutes(){

    this.simpleMenu = [];

    this.start = (entities, expressInstance) => {
        this.simpleMenu = entities.map(function(el) {
            return {name: el.name, icon: el.icon, label: el.label};
        });

        expressInstance.get("/system/menu", this.menu);
        expressInstance.get("/system/stats", this.stats);
    }

    this.menu = (req, res)  => {
        return res.json(HttpHelper.ok(this.simpleMenu));
    }

    this.stats = (req, res)  => {
        return res.json(HttpHelper.ok([{label: "Paciente", value: 51}, 
        {label: "Examenes", value: 124}]));
    }    

}

module.exports = SystemRoutes;