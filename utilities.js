const fs = require('fs');
const path = require('path');



//Request data
function getRequestData(req, requestDataStream) {
    req.on("data", (chunk) => {
        requestDataStream.push(chunk);
    });
}


function returnAllRecord(dbPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            const error = {msg:null};
           if(err) {
               error.msg = "Oops, something went wrong.";
               reject(error);
           }
           if (!data) {
                error.msg = "Record is empty.";
               reject(error);
           }
            resolve(data);
        }); 
    });   
}


//Write updated record into books database
function writeUpdatedRecord(dbPath, updatedBooksRecord) {
    updatedBooksRecord = JSON.stringify(updatedBooksRecord);
    fs.writeFile(dbPath, updatedBooksRecord, (err) => {
        if (err) console.log(err);
    });
}


//Books data base path
function getDbPath(base) {
    const thisDirectory = path.dirname(__filename);
    const dbPath = path.join(thisDirectory, 'models', base);
    return dbPath;
}




module.exports = {
    getRequestData,
    returnAllRecord,
    writeUpdatedRecord,
    getDbPath,
}