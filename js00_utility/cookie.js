var CookieName="myName"
var CookieEmail="myEmail"


//---name & email---
function setCookie(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + ";expires="+expire.toGMTString();
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function deleteCookie(name) { setCookie(name, '', -1); }

function setCookieValues(myName,myEmail)
{
    /*
     myName=myName.replace(/%20/g," ")
     myEmail=myEmail.replace(/%20/g," ")
    myNameValue.value=myName
    myEmailValue.value=myEmail
    schematicListEmail.value=myEmail
    retrieveEmailValue.value=myEmail
    myEmailUpdateValue.value=myEmail
    myNameUpdateValue.value=myName
    componentListEmail.value=myEmail
   retrieveComponentEmailValue.value=myEmail
   myComponentEmailUpdateValue.value=myEmail
   */

}