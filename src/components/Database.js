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