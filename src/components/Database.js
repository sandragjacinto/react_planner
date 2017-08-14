import base from '../base';
import {getUserLoginData} from './DataUser';

export function getFromDatabase(dbPath, onResponse)
{
    const onError = function(dbPath){console.error(`Error in database response for ${dbPath}`)};
    const storeRef = base.database().ref(getUserLoginData().uid);

    if(dbPath.length == 1)
    {
        storeRef.child(dbPath[0]).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data != undefined) {
            onResponse(data);
        }
        else
        {
            onError(dbPath);
        }
        });
    }
    else if(dbPath.length == 2)
    {
        storeRef.child(dbPath[0]).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data[dbPath[1]]) {
            onResponse(data[dbPath[1]]);
        }
        else
        {
            onError(dbPath);
        }
        });
    }

}