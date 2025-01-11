function HttpHelper(){}

HttpHelper.ok = function (result, pagination) {
    return {
        "metadata": {
            "code": 200000,
            "message": "success"
        },
        "data": {
            "result" : Array.isArray(result) ? undefined: result,
            "results" : Array.isArray(result) ? result: undefined
        },
        "pagination": pagination    
    }
}



module.exports = HttpHelper;