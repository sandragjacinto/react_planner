var gUserLoginData = {};
var gUserIsLogged = false;

export function setUserData(userLoginData){


    gUserLoginData = userLoginData;
    gUserIsLogged = userLoginData == null ? false : true;

 
}

export function isUserLogged()
{
    return gUserIsLogged;
}

export function getUserLoginData()
{
    return gUserLoginData;
}