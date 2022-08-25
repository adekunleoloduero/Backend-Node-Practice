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
        await returnAllRecord(usersDbPath).
        then(users => {
            const usersArray = JSON.parse(users);
            const message = {msg:null}
            const userFound = usersArray.find(user => user.username === JSON.parse(wholeRequestData).username);
            message.msg = `Welcome ${userFound.username}, You are now logged in.`;
            if (!wholeRequestData) {
                message.msg = 'Username or password not provided.';
                reject(message);
            }
            if (!userFound) {
                message.msg = 'User not found. Please sign up.';
                reject(message);
            }
        
            if (userFound.password !== JSON.parse(wholeRequestData).password) {
                message.msg = 'Incorrect username or password.';
                reject(message);
            }
            resolve(message);
        }).
        catch(error => {
            console.log(error.msg);
        });
    });
}); 

}



module.exports = {
passwordAuthentication,
}