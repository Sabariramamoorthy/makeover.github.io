function pagination(page){
    // console.log(page);
    var currentpage="page"+page.toString();
    // console.log(currentpage);

    if (page="2"){
        console.log("page2-entered");
        document.getElementById(currentpage).style.visibility="visible";
        document.getElementById(currentpage).style.display="block";
        }
   

}