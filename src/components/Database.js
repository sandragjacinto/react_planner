import base from '../base';
import {getUserLoginData} from './DataUser';

export function getFromDatabase(childName, keyName, onResponse)
{
    const storeRef = base.database().ref(getUserLoginData().uid);
    storeRef.child(childName).once('value', (snapshot) => {
        const data = snapshot.val() || {};
        if (data[keyName]) {
            onResponse(data[keyName]);
        }
        else
        {
            console.error(`Error in database response for ${childName}, ${keyName}`);
        }
    });
}

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').
// then(function(snapshot) {
//   var username = snapshot.val().username;
//   // ...
// });

// export function getFromDatabaseNew(dbPath, onResponse)
// {
//     const storeRef = base.database().ref(getUserLoginData().uid);
//     storeRef.once('value', (snapshot) => {
//         const data = snapshot.val() || {};
//         if (data[dbPath]) {
//             onResponse(data[dbPath]);
//         }
//         else
//         {
//             console.error(`Error in database response for ${dbPath}`);
//         }
//     });
// }

export function getFromDatabaseNew(dbPath, onResponse)
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