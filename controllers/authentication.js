// const fs = require('fs');
// const path = require('path');
const { getRequestData, returnAllRecord, getDbPath } = require('../utilities');

const usersDbPath = getDbPath('users.json');


function passwordAuthentication(req, res) {
    return new Promise((resolve, reject) => {
        //Get login details from the request data
        const requestDataStream = [];
        getRequestData(req, requestDataStream);

        //Search through saved users record to find a match
        req.on("end", async () => {
            const wholeRequestData = Buffer.concat(requestDataStream).toString();
             
            const users = await returnAllRecord(usersDbPath);
            const usersArray = JSON.parse(users);
            if (!wholeRequestData) {
                reject({error: 'Username or password not provided.'});
                return;
            }
            const userFound = usersArray.find(user => user.username === JSON.parse(wholeRequestData).username);
            if (!userFound) {
                reject({error: 'User not found. Please sign up.'});
                return
            }
            if (userFound.password !== JSON.parse(wholeRequestData).password) {
                reject({error: 'Incorrect username or password.'});
                return
            }
            resolve();
        });
    }); 

}



module.exports = {
passwordAuthentication,
}