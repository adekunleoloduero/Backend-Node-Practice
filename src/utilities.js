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
        if(err) {
            console.log(err);
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
// function getDbPath(base) {
//     const thisDirectory = path.dirname(__filename);
//     const dbPath = path.join(thisDirectory, 'models', base);
//     return dbPath;
// }

function getDbPath(toReplace, ...pathValues) {
    let pathAfterRoot = '';
    const thisDirectory = path.dirname(__filename);
    const rootDirectory = thisDirectory.split(`${path.sep}${toReplace}`)[0];
    for (val of pathValues) {
        pathAfterRoot += `${path.sep}${val}`;
    }
    const dbPath = path.join(rootDirectory, pathAfterRoot);
    return dbPath;
}

const toReplace = `${path.sep}test${path.sep}integration`;
let dbPath 
console.log(dbPath);

module.exports = {
    getRequestData,
    returnAllRecord,
    writeUpdatedRecord,
    getDbPath,
}