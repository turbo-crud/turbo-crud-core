function AutoRouterRegister() {

  this.start = (entities, models, expressInstance) => {
    for (var entity of entities) {
      expressInstance.get(`/api/${entity.name}`, async function (req, res) {
        var data = await models[entity.name].find();
        res.send(data);
      });

      expressInstance.post(`/api/${entity.name}`, async function (req, res) {
        const item = new models[entity.name]();

        var fieldNames = Object.keys(req.body);
        for (var fieldName of fieldNames) {
          item[fieldName] = req.body[fieldName];
        }

        await item.save();
        res.send("Data inserted");
      });

      expressInstance.post(`/api/${entity.name}/query`, async function (req, res) {
        var query = models[entity.name].find({}, {_id:0, __v:0});
        var result = await query.exec();
        res.json(okSeveral(result));
      });      
    }

  }

  function okSingle(singleResult){
    return {
      "metadata": {
          "code": 200000,
          "message": "success"
      },
      "data": {
          "result" : singleResult
      }   
    }
  }

  function okSeveral(multipleResults){
    return {
      "metadata": {
          "code": 200000,
          "message": "success"
      },
      "data": {
          "results" : multipleResults
      },
      "pagination": {
          "totalItems": 1,
          "totalPages": 1,
          "page": 0,
          "size": 20
      }    
    }
  }  

}

module.exports = AutoRouterRegister;