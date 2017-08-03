var gUserLoginData = {};
var gUserIsLogged = false;

export function setUserData(userLoginData){


    gUserLoginData = userLoginData;
    gUserIsLogged = userLoginData == null ? false : true;

    console.log("gUserLoginData dataUser file:" + gUserLoginData);
    console.log("gUserIsLogged:" + gUserIsLogged);
}

export function isUserLogged()
{
    console.log("gUserIsLogged en isUserLogged:" + gUserIsLogged);
    return gUserIsLogged;
}

export function getUserLoginData()
{
    return gUserLoginData;
}