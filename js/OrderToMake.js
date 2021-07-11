function getDownloaD (){
        const node = [];        
        firebase.database().ref('address').once('value', function(AllRecords) {
			AllRecords.forEach(function(CurrenRecord) {
				var isdispatched = CurrenRecord.val().isdispatched;
				node.push(isdispatched);
			});	
            localStorage.clear();
            localStorage.setItem("node",node.length);
         });  
         var ref = firebase.database().ref("address");
         ref.once("value").then(function(snapshot)
          {
             let length=localStorage.getItem("node");
             //////console.log(length);
              for(var i = 1; i <= length; i++)
               {
              var addressTag ="address"+i.toString();
              //////console.log(addressTag);
              var address = snapshot.child(addressTag + "/address").val(); 
              var isflag = snapshot.child(addressTag + "/isdispatched").val(); 
              var photopath = snapshot.child(addressTag + "/photopath").val(); 
              localStorage.setItem("address"+i.toString(),address);
              localStorage.setItem("Dispatch"+i.toString(),isflag);
              localStorage.setItem("photopath"+i.toString(),photopath);
              }
            });          
}





function watermark(){
	$('body').find('img[src$="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').parent().closest('a').closest('div').remove();
}
function Getconifg()
	{
		return  {
			apiKey: "AIzaSyC5slKVKE4z13mKZQynHi8hwBlhK8xy1SU",
			authDomain: "sound-dahlia-290617.firebaseapp.com",
			databaseURL: "https://sound-dahlia-290617-default-rtdb.firebaseio.com",
			projectId: "sound-dahlia-290617",
			storageBucket: "sound-dahlia-290617.appspot.com",
			messagingSenderId: "333674478909",
			appId: "1:333674478909:web:a22289e066221ef1935954"
		};
	}

function databinding() 
    {
		var totalcount = localStorage.getItem("TodayCount");
		var compCounts = localStorage.getItem("Comptcount");
		var yettoCounts = localStorage.getItem("yettocount");
		var Count = localStorage.getItem("happycount");
		$("#Today").text(totalcount);
		$("#Completed").text(compCounts);
		$("#YetTo").text(yettoCounts);
		$("#date").text(Count);
	}


	function databindingdispatch() {
		var totalcount = localStorage.getItem("TodayCount");
		var compCounts = localStorage.getItem("Comptcount");
		var yettoCounts = localStorage.getItem("yettocount");
		$("#Today").text(totalcount);
		$("#Completed").text(compCounts);
		$("#YetTo").text(yettoCounts);
	}


function OrderDataCount() 
    {
		firebase.database().ref('address').once('value', function(AllRecords) {
			const node = [];
			AllRecords.forEach(function(CurrenRecord) {
				var isdispatched = CurrenRecord.val().isdispatched;
				node.push(isdispatched);
			});
			
			let compCounts = null;
			let yettoCounts = null;
			for(var i = 0; i < node.length; i++) {
				var obj = node[i];
				if(obj == "Y") {
					compCounts = compCounts + 1;
				}
				if(obj == "N") {
					yettoCounts = yettoCounts + 1;
				}
			}
			if(compCounts == null) {
				compCounts = 0;
			}
			if(yettoCounts == null) {
				yettoCounts = 0;
			}
			if(node.length == null) {
				node.length = 0;
			}
			localStorage.clear("TodayCount");
			localStorage.clear("Comptcount");
			localStorage.clear("yettocount");

			localStorage.setItem("TodayCount", node.length);
			localStorage.setItem("Comptcount", compCounts);
			localStorage.setItem("yettocount", yettoCounts);
			databinding();
			databindingdispatch();
		});
		
	}

	function bodyOnLoad() {
		let length=localStorage.getItem("node");
             //////console.log(length);
              for(var i = 1; i <= length; i++){
				DataBind("#Address"+i.toString(), "Tab"+i.toString(), "Photo"+i.toString(), "address"+i.toString(), "photopath"+i.toString());
			  }	
	}

	function elementcreation(){
		let length=localStorage.getItem("node");
             
              for(var i = 1; i <= length; i++){
				DivTagCreation("Tab"+i.toString(),"btn"+i.toString(),"OrderDispached('address"+i.toString()+"','Dispatch"+i.toString()+"')","Photo"+i.toString(),"Address"+i.toString())
                //console.log("elementcreation",i);
            }


	}
	function DataBind(addressTag, tabTag, photoTag, addressLocal, photoLocal) {
	
		if(localStorage.getItem(addressLocal) != null) {
			var innerText = localStorage.getItem(addressLocal);
			document.getElementById(tabTag).style.visibility = "visible";

			var photoPath = document.getElementById(photoTag);
			photoPathValue = localStorage.getItem(photoLocal);
			photoPath.src = photoPathValue;

			$(addressTag).text(innerText);
		}
		else
		{
			localStorage.removeItem(addressLocal)
			localStorage.removeItem(photoLocal)

		}
	}

	function Isdispatched() {
        ////console.log("Isdispatched -2");
		let length=localStorage.getItem("node");
             //////console.log(length);
              for(var i = 1; i <= length; i++){
				CheckDispatch("Dispatch"+i.toString(), "btn"+i.toString());
			  }
	}

	function CheckDispatch(dispatchLocal, btnTag) {
        ////console.log("Isdispatched -2.1");
	
		if(localStorage.getItem(dispatchLocal) == "Y") {

			document.getElementById(btnTag).disabled = true;
			document.getElementById(btnTag).style.backgroundImage = " linear-gradient(rgb(16, 253, 28),rgb(0, 36, 112))";
		}
	}

	function OrderDispached(addressTag, number) {
		if(window.confirm('The Parcel is dispatched?')) {
            ////console.log("OrderDispached -1");
			var newPostKey = firebase.database().ref('Collected Data').child('address').push().key;
			var updates = {};
			updates['/address/' + addressTag + '/isdispatched'] = 'Y';
			firebase.database().ref().update(updates);	
            Isdispatched();		
			if(typeof(Storage) !== "undefined") {
				localStorage.clear(number);
				localStorage.setItem(number, "Y");
                DownloadOrderCount();	
			}		
		}
       
	}

	function DownloadOrderCount() {
        ////console.log("DownloadOrderCount -3");
		var ref = firebase.database().ref("Count");
		ref.once("value").then(function(snapshot) {	
			var a = snapshot.exists(); 
			let Count = snapshot.child("/TotalCount/" + "/OrderCount").val(); 
			////console.log("out",Count);
		
				localStorage.clear("Count");
				localStorage.clear("happycount");
				localStorage.setItem("Count",Count);
				localStorage.setItem("happycount", Count);
                UpdateOrderCount();					
		});
     
		OrderDataCount();
		
	}

	function UpdateOrderCount(){
        //////console.log("UpdateOrderCount -4");
		let Count=localStorage.getItem("Count");
		var a = parseInt(Count);
        firebase.database().ref('/Count/TotalCount/').set({
            OrderCount: a+1    
        }, 
        (error) => {
          if (error) {
           
          } else {
            location.reload();	
          }
        });
	}

	function DivTagCreation(tabId,btnId,dispatchonlclick,photoId,addressId){
		var iDiv = document.createElement('div');
		iDiv.id = tabId;
		iDiv.className = 'box';
		document.getElementsByTagName('body')[0].appendChild(iDiv);
		
		var innerP1 = document.createElement('p');
		innerP1.className = 'center';
		var variable = "" + 
		"	<button id=\""+btnId+"\" class=\"button\" onclick=\""+dispatchonlclick+"\">OrderDispached</button><br/>" + 
		"";
		innerP1.innerHTML=variable;
		var innerP2 = document.createElement('p');
		innerP2.style = 'font-size:small;';				
		var variable1 = "" + 
		"<img id=\""+photoId+"\" src=\"\" alt=\"Mosaic\" width=\"150\" height=\"250\" class=\"img1\">" + 
		"					<div class=\"textdiv\"> <span id=\""+addressId+"\" class=\"text\">" + 
		"					</span> </div>" + 
		"";			

		var Break = document.createElement('div');
		Break.style=' background-color: rgb(17, 0, 48);'
		var br=document.createElement('br');

		Break.appendChild(br);
		Break.appendChild(br);
		iDiv.appendChild(Break);
		innerP2.innerHTML=variable1;
		iDiv.appendChild(innerP1);
		iDiv.appendChild(innerP2);

	

		
		}

	// function clearlocal(){
	// 	localStorage.removeItem('#Address1');
	// 	localStorage.removeItem('#Address2');
	// 	localStorage.removeItem('#Address3');
	// 	localStorage.removeItem('#Address4');
	// 	localStorage.removeItem('#Address5');
	// 	localStorage.removeItem('#Address6');
	// 	localStorage.removeItem('#Address7');
	// 	localStorage.removeItem('#Address8');
	// 	localStorage.removeItem('#Address9');
	// 	localStorage.removeItem('#Address10');
	// 	window.location.reload();
	// }





