require('dotenv').config();

const TOKEN = process.env.API_KEY;

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


function tokenAuthentication(req, res) {
    return new Promise((resolve, reject) => {
        const requestData = req.headers.authorization;
        if (!requestData) {
            reject({error: "No token provided. Please, enter your token again."});
            return;
        }

        const token = requestData.split(" ")[1];
        if (token !== TOKEN) {
            reject({error: "In valid token."});
            return;
        }
        resolve();
    });   
}

function aclAuth(req, res, roles) {    
    return new Promise((resolve, reject) => {
        const requestDataStream  = [];
        getRequestData(req, requestDataStream);
        req.on("end", async () => {
            const wholeRequestData = Buffer.concat(requestDataStream).toString();
            if (!wholeRequestData) {
                reject({"error": 'No login details provided.'});
                return;
            }
            const { user:loginDetails, book } = JSON.parse(wholeRequestData);
            const users = await returnAllRecord(usersDbPath);
            const userFound = JSON.parse(users).find(user => user.username === loginDetails.username);
            if (!userFound) {
                reject({"error": "User not found. Please, sign up."});
            }
            if (userFound.password !== loginDetails.password) {
                reject({"error": "Un-recognized username or password."});
            }
            if (roles.includes(userFound.role)) {
                resolve({"success":`Welcome ${userFound.username}, You are now logged in.`});
            }
        });
    });
}


module.exports = {
    passwordAuthentication,
    tokenAuthentication,
    aclAuth,
}