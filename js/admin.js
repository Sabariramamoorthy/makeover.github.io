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
		//console.log("bonding"+Count);
		$("#Today").text(totalcount);
		$("#Completed").text(compCounts);
		$("#YetTo").text(yettoCounts);
		$("#date").text(Count);
	}


function OrderDataCount() 
    {
		//console.log("OrderDataCount-7")
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
			localStorage.setItem("TodayCount", node.length);
			localStorage.setItem("Comptcount", compCounts);
			localStorage.setItem("yettocount", yettoCounts);
			databinding();
		});
	}

	function DownloadOrderCount() {
        
		var ref = firebase.database().ref("Count");
		ref.once("value").then(function(snapshot) {	
			var a = snapshot.exists(); // true
			let Count = snapshot.child("/TotalCount/" + "/OrderCount").val(); // true
			//console.log("in",Count);
			if(typeof(Storage) !== "undefined") {
				localStorage.setItem("Count",Count);
				localStorage.setItem("happycount", Count);
			}
			OrderDataCount();				
		});
		
	}



	