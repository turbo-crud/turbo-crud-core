function AutoRouterRegister() {

  this.start = (entities, models, expressInstance) => {
    for (var entity of entities) {
      expressInstance.get(`/api/${entity.name}`, async function (req, res) {
        console.log("req:", req.originalUrl);
        var data = await models[entity.name].find();
        res.send(data);
      });

      expressInstance.post(`/api/${entity.name}`, async function (req, res) {
        console.log("req:", req.originalUrl);
        const item = new models[entity.name]();

        var fieldNames = Object.keys(req.body);
        for (var fieldName of fieldNames) {
          item[fieldName] = req.body[fieldName];
        }

        await item.save();
        res.json(ok());
      });

      expressInstance.post(`/api/${entity.name}/query`, async function (req, res) {
        console.log("req:", req.originalUrl);
        
        if(!req.body || Object.keys(req.body).length === 0){
          return res.json(badRequest("Search needs at least one parameter"));
        }

        var clausule = [];
        for(var queryRawField of req.body){
            let regex = new RegExp(queryRawField.value,'i');
            let fieldName = queryRawField.name;
            let tmp = {};
            tmp[fieldName] = regex;
            clausule.push(tmp);
        }

        var query = { $and: clausule};
        console.log("query", query);

        var queryStatement = models[entity.name].find(query, {_id:0, __v:0});
        var result = await queryStatement.exec();
        res.json(okSeveral(result));
      });      
    }

  }

  function badRequest(message){
    return {
      "metadata": {
          "code": 400100,
          "message": message || "The request could not be understood by the server due to malformed syntax"
      } 
    }
  }

  function ok(){
    return {
      "metadata": {
          "code": 200000,
          "message": "success"
      }  
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