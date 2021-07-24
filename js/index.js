function page(id){
   let total=4;
   for(let i=1;i<=total;i++){
    if(id==i){
        window.location.href="#page"+i.toString();
        document.getElementById("page"+i.toString()).style.visibility="visible";
        document.getElementById("page"+i.toString()).style.display="block";

    }
    else{
        document.getElementById("page"+i.toString()).style.visibility="hidden";
        document.getElementById("page"+i.toString()).style.display="none";
    }
}

}
