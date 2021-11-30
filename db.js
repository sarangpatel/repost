const db = require('./dbConnection.js');

//fieldname = [a,b], values = [1,2]
var isRecordExist = async (tabel, fieldname, values) => {
    console.log("Inside isRecordExist :: table: " + tabel + "fielname: "  + fieldname.join(',') +  " values: " + values.join(','));
    var fieldNameStr = '';
    fieldname.forEach(function(field){
        fieldNameStr += field + " = ? AND ";
    });
    fieldNameStr = fieldNameStr.substr(0, fieldNameStr.length - 4);
    var query = "SELECT count(1) count FROM " + tabel + " WHERE  " +  fieldNameStr;
    var param = values;
    var result = await db.connection.query(query, param);
    await db.connection.end();
    console.log("isRecordExist completed");
    return (result.length == 0) ? false : result[0].count > 0 ? true : false;
};


//table = tablename, fields = [a,b],value[a,b], whereStr = ' id = 4 '
var updateRecord = async (table, fields, values, whereStr) => {
    try{
        console.log("Inside updateRecord :: tabel: " + table + "fielname: "  + fields.join(',') +  " values: " + values.join(',')  +  " whereStr: " + whereStr);
        var fieldNameStr = '';
        fields.forEach(function(field){
            fieldNameStr += field + " = ?,";
        });
        fieldNameStr = fieldNameStr.substr(0, fieldNameStr.length - 1);
        var query = "UPDATE " + table + " SET  " +  fieldNameStr + " WHERE "  +  whereStr;
        console.log('query:', query);
        var param = values;
        await db.connection.query(query, param);
        await db.connection.end();
        console.log("updateRecord completed");
        return 1;
    }catch(e){
        console.log("Error in updateRecord method", e.message);
        return 0;
    }
};


//query = "select * from table where id  = 1 " ;"
var getRecord = async (query) => {
    console.log("Inside getRecord :: query: " + query);
    var result = await db.connection.query(query);
    await db.connection.end();
    console.log("getRecord completed");
    return (result.length == 0) ? [] : result;
};

//fielstr = ' * ',  fieldname = [a,b], values = [1,2]
var getData = async (table, fieldstr, fieldname, values, orderby='') => {
    console.log("Inside getData :: query: ", table, fieldname, values);
    var fieldNameStr = '';
    fieldname.forEach(function(field){
        fieldNameStr += field + " = ? AND ";
    });
    fieldNameStr = fieldNameStr.substr(0, fieldNameStr.length - 4);
    var query = "SELECT " + fieldstr +  " FROM " + table + " WHERE  " +  fieldNameStr;
    if(orderby != '')query = query +  orderby;
    var param = values; 
    var result = await db.connection.query(query,param);
    await db.connection.end();
    console.log("getData completed");
    return (result.length == 0) ? [] : result;
};


//fieldStr  = "name,age"
//values  = "[a,b]"
var addRecord = async (table,fieldStr,values) => {
    console.log("Inside addRecord :: table: " + table + ", fieldStr: "  + fieldStr +  ", values: " + values.join(','));
    var len = values.length;
    var i = 1;
    var paramStr = '';
    while(i <= len){
        paramStr += '?,';
        i++;
    }
    paramStr = paramStr.substr(0, paramStr.length - 1);

    var query = "INSERT INTO " + table +  " ( " + fieldStr + ") VALUES (" + paramStr + ")";
    console.log('query:', query);
    var param = values;
    var result = await db.connection.query(query,param);
    var insertedId = result.insertId;
    await db.connection.end();
    if (insertedId !== 0) {
        console.log("addRecord completed");
        return insertedId;
    }else{
        console.log("addRecord completed");
        return 0;
    }
};

var addBatchRecord = async (table,fieldStr,values) => {
    try{
        console.log("Inside addBatchRecord :: table: " + table + ", fieldStr: "  + fieldStr );
        var query = "INSERT IGNORE INTO " + table +  " ( " + fieldStr + ") VALUES  ?";
        //console.log('query:', query);
        var param = values;
        var result = await db.connection.query(query,[param]);
        await db.connection.end();
        console.log("addBatchRecord completed");
        return result.affectedRows;
    }catch(e){
        console.log("Error: addBatchRecord completed", e.message);
        return 0;
    }
};


var addMultipleRecord = async (table,fieldStr,values) => {
    console.log("Inside addMultipleRecord :: table: " + table + ", fieldStr: "  + fieldStr );
    var i = 1;
    var paramLen = fieldStr.split(',').length;
    var paramStr;
    var query;
    var param;
    var result;
    values.forEach(async function(value){
        paramStr = '';
        i = 1;
        while(i <= paramLen){
            paramStr += '?,';
            i++;
        }
        paramStr = paramStr.substr(0, paramStr.length - 1);
        query = "INSERT INTO " + table +  " ( " + fieldStr + ") VALUES (" + paramStr + ")";
        console.log('query:', query);
        param = [value.id,value.type,value.url];
        result = await db.connection.query(query,param);
    });
    await db.connection.end();
    console.log("addMultipleRecord completed");
    return 1;
};

var executeQuery = async (query,values) => {
    console.log("Inside executeQuery:: query: "  + query);
    var result;
    if(values.length === 0){
        console.log("Inside executeQuery:: value: empty");
        result = await db.connection.query(query);
    }else{
        console.log("Inside executeQuery:: values:" + values.join(','));
        result = await db.connection.query(query,values);
    }
    await db.connection.end();
    console.log("executeQuery completed.");
    return (result.length == 0) ? [] : result;
};



module.exports = {
    addRecord,
    updateRecord,
    getRecord,
    getData,
    isRecordExist,
    addMultipleRecord,
    executeQuery,
    addBatchRecord
}