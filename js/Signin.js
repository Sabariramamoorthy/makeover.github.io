var validation;
function watermark(){
	$('body').find('img[src$="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').parent().closest('a').closest('div').remove();
}

function signup(){
    document.getElementById("signup").style.visibility="visible";
    document.getElementById("signup").style.display="block";
    document.getElementById("hsignup").style.visibility="visible";
    document.getElementById("hsignup").style.display="block";
    document.getElementById("signin").style.visibility="hidden";
    document.getElementById("signin").style.display="none";
    document.getElementById("hsignin").style.visibility="hidden";
    document.getElementById("hsignin").style.display="none";

    }

    function Forgotpassword(){
    document.getElementById("Forgot").style.visibility="visible";
    document.getElementById("Forgot").style.display="block";
    document.getElementById("hForgot").style.visibility="visible";
    document.getElementById("hForgot").style.display="block";
    document.getElementById("signin").style.visibility="hidden";
    document.getElementById("signin").style.display="none";
    document.getElementById("hsignin").style.visibility="hidden";
    document.getElementById("hsignin").style.display="none";
    }


function Getconifg()
	{
		return  {
            apiKey: "AIzaSyAJBdhYlg5xFu1MQOzPQjaiWyheBOHMAN0",
            authDomain: "srgifts-4cccb.firebaseapp.com",
            databaseURL: "https://srgifts-4cccb-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "srgifts-4cccb",
            storageBucket: "srgifts-4cccb.appspot.com",
            messagingSenderId: "662372730784",
            appId: "1:662372730784:web:f9c8ffc3a7e48f7ea0c6c5",
            measurementId: "G-JLV996E31W"
		};
	}



document.getElementById("ConformPassword").onchange = function() {ConformPassword()};
function ConformPassword()
{
    var password=document.getElementById("password").value;
    var conformPassword=document.getElementById("ConformPassword").value;
    if (password != conformPassword)
    {
      document.getElementById("errorsignup").innerText="*Password Not Matched";
      document.getElementById("password").value="";
      document.getElementById("ConformPassword").value="";
      validation="Y";
    }
    else{
        document.getElementById("errorsignup").innerText=""
        validation="N";
    }
}


function signupSubmit(){
    var userName=document.getElementById("Username").value;
       if (validation == "N"){ 
        firebase.database().ref('ResellerData/'+userName).set({
            Username:document.getElementById("Username").value ,
			email: document.getElementById("email").value,
			Instapage: document.getElementById("Instapage").value,
            Whatsapp: document.getElementById("Whatsapp").value,
			Password: document.getElementById("password").value,
            terms:document.getElementById("terms").value
        }, (error) => {
          if (error) {
            document.getElementById("errorsubmit").innerText="Signup Failed,Plese DM us in Instagram"
          } else {
            window.location.href = "signin.html";
          }
        });
       }
}


function UserNameCheck (element) { 
    var letters = /^[0-9a-zA-Z]+$/;
if(element.match(letters))
{
    var ref = firebase.database().ref("ResellerData");
    ref.once("value").then(function(snapshot) {	
        if (snapshot.child("/"+element+"/").exists()) 
        {
            document.getElementById("error").innerText="";
            document.getElementById("errorsignup").innerText="*This Username is already exists ";
        }
        else{
            document.getElementById("errorsignup").innerText="";
            document.getElementById("error").innerText="*Username not exists,Please Check";
        }				
    });

return true;
}
else
{
document.getElementById("error").innerText="*Username must contains only AlphaNumeric";
document.getElementById("errorsignup").innerText="*Username must contains only AlphaNumeric";
return false;
}
}


function Signin(){
    console.log("Signin");
    var userName=document.getElementById("signinusername").value;
    var password=document.getElementById("signinpassword").value;

    var ref = firebase.database().ref("ResellerData");
    ref.once("value").then(function(snapshot) {	
        var Pass=snapshot.child("/"+userName+"/Password").val();
        console.log(Pass);
        if (password == Pass) 
        {
            document.getElementById("error").innerText="";
            window.location.href = "content.html";
        }
        else{
            document.getElementById("error").innerText="*Password Incorrect";        
        }				
    });

}

function updatepassword(){  
    var userName=document.getElementById("user").value;
    var password=document.getElementById("pass").value;
    var valid;
    if(valid ="N"){
        firebase.database().ref('ResellerData/'+userName+"/Password").set(password, (error) => {
            if (error) {
              document.getElementById("errorsubmit").innerText="Password Change Failed,Plese DM us in Instagram"
            } else {
              document.getElementById("errorforgot").innerText="Password Updated Sucessfully";
              window.location.href = "signin.html";
            }
          });

    }

}


function usercheck(){
    var ref = firebase.database().ref("ResellerData");
    var letters = /^[0-9a-zA-Z]+$/;
    var userName=document.getElementById("user").value;
    if (userName.match(letters)){
        ref.once("value").then(function(snapshot) {	
            if (!snapshot.child("/"+userName+"/").exists()) 
            {
                document.getElementById("errorforgot").innerText="*Username not exists,Please Check";
                valid="Y";
                return false;
            }	
            else{
                document.getElementById("errorforgot").innerText="";
            }			
        });
    }
    else{
        valid="Y";
        document.getElementById("errorforgot").innerText="*Username must contains only AlphaNumeric";
    }

}


function passwordCheck(){
    var password=document.getElementById("pass").value;
    var Conformpassword=document.getElementById("confpass").value;  
     console.log(password,Conformpassword);
    if(password!=Conformpassword)
    {
        console.log("condition",password,Conformpassword);
      document.getElementById("errorforgot").innerText="*Password Not Matched";
      document.getElementById("pass").value="";
      document.getElementById("confpass").value="";
      return false;
    }
    else{
        document.getElementById("errorforgot").innerText="";
    }
}