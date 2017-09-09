import base from '../base';
import {getUserLoginData} from './DataUser';

export function writeDB(dbPath, value)
{    
    const storeRef = base.database().ref(getUserLoginData().uid);

    if(dbPath.length == 1)
    {
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            storeRef.update({
                [dbPath[0]] : value,
                })
        });
    }
    else if(dbPath.length == 2)
    {
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            storeRef.child(dbPath[0]).update({
                [dbPath[1]] : value,
                })
        });
    }
        
}

export function getFromDatabase(dbPath, onResponse)
{
    const onError = function(dbPath){console.error(`Error in database response, or data doesn't exist, for key ${dbPath}`)};
    // var storeRef = {};
    // try
    // {
    //     storeRef = base.database().ref(getUserLoginData().uid);
    // }
    // catch(e)
    // {
    //     console.error("Login error", e);
    // }
    
    const storeRef = base.database().ref(getUserLoginData().uid);
    console.log("Database login:", getUserLoginData().uid);

    if(dbPath.length == 1)
    {
        storeRef.child(dbPath[0]).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data != undefined) {
            onResponse(data);
        }
        else
        {
            onResponse(undefined);
            onError(dbPath);
        }
        });
    }
    else if(dbPath.length == 2)
    {
        //console.log("dbPath[0]:" + dbPath[0] + " dbPath[1]:" + dbPath[1]);
        storeRef.child(dbPath[0]).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data && dbPath[1] in data) {
            onResponse(data[dbPath[1]]);
        }
        else
        {
            onResponse(undefined);
            onError(dbPath);
        }
        });
    }

}