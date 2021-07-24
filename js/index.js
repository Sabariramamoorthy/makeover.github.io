function page(id){

    if (id==1){
        window.location.href="#page1"
        document.getElementById("page1").style.visibility="visible";
        document.getElementById("page1").style.display="block";
        document.getElementById("page2").style.visibility="hidden";
        document.getElementById("page2").style.display="none";
    }

    if (id==2){
        console.log(id);
        window.location.href="#page2"
        document.getElementById("page2").style.visibility="visible";
        document.getElementById("page2").style.display="block";
        document.getElementById("page1").style.visibility="hidden";
        document.getElementById("page1").style.display="none";
    }
}