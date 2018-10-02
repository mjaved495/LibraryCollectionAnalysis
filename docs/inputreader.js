var key;
var journals;
var selectedJournal;


var loadFile = function(fileName){
  if(!fileName.endsWith(".json")) return;

  d3.json(fileName, function(error, data) {
   journals = data;
   var options = Object.keys(data);
   
   removeOptions(document.getElementById("selector"));
   var select = document.getElementById("selector");
   for(var i = 0; i < options.length; i++) {
       var opt = options[i];
       var el = document.createElement("option");
       el.textContent = opt;
       el.value = opt;
       select.appendChild(el);
      }
      
      key = Object.keys(data)[0];
   populateData(data[key]);
  });
}

function removeOptions(selectbox) {
  var i;
  for(i = selectbox.options.length - 1 ; i >= 0 ; i--) {
    selectbox.remove(i);
  }
}
// d3.json("TF-SK-Output.json", function(error, data) {
// 	journals = data;
// 	var options = Object.keys(data);
// 	var select = document.getElementById("selector");
// 	for(var i = 0; i < options.length; i++) {
//     	var opt = options[i];
//     	var el = document.createElement("option");
//     	el.textContent = opt;
//     	el.value = opt;
//     	select.appendChild(el);
//     }
    
//     key = Object.keys(data)[0];
// 	populateData(data[key]);
// });


var populateData = function(journal){
	console.log(journal);
	selectedJournal = journal;
	document.getElementById("heading").innerHTML = "<a href='https://newcatalog.library.cornell.edu/catalog/"+journal.bibId+"' target='_blank'>"+journal.title +"</a> -"+journal.type;
	document.getElementById("titleId").innerHTML = journal.titleId;
	document.getElementById("ssid").innerHTML = journal.ssid;
	document.getElementById("provider").innerHTML = journal.provider.name+" ("+journal.provider.code+")";
	document.getElementById("issn").innerHTML = journal.issns[0].value;
	document.getElementById("eissn").innerHTML = journal.eissns[0].value;
	document.getElementById("doi").innerHTML = journal.doi;
	document.getElementById("dbpckg").innerHTML = journal.database_package.name+" ("+journal.database_package.code+")";
	document.getElementById("cornellCount").innerHTML = journal.cornellPubCounter.count;
  document.getElementById("overallusage").innerHTML = journal.overallUses;
  document.getElementById("publisher").innerHTML = journal.publisher;
  document.getElementById("status").innerHTML = journal.status;
  document.getElementById("subjects").innerHTML = journal.subjects;
  document.getElementById("bibId").innerHTML = journal.bibId;
  
  if(journal.citeScoreTracker === null){
		journal.citeScoreTracker = {year: 2018, citescoreTracker: 'Not Known'};
	}
	document.getElementById("citescoretracker").innerHTML = journal.citeScoreTracker.citescoreTracker +" ("+journal.citeScoreTracker.year+")";

	populateJournalMetrics();
	populateCornellPublicationCountChart();
	populateUsageDataChart();
}


function onChangeSelectInputFile(){
  var inputFile = document.getElementById("fileSelector").value;
  selectedFile = inputFile;
  console.log(inputFile);
  loadFile(selectedFile);
}


function onChangePopulateJournalData() {
	//console.log("populate");
    var journal = document.getElementById("selector").value;
    selectedJournal = journals[journal];
    populateData(selectedJournal);
    //console.log(selectedJournal);
}

function populateJournalMetrics(){
	if(selectedJournal.snip){
		sjrchart.load({
  		columns: [
    		['SJR', selectedJournal.sjr.sjr]
    	]
    }); 
	} else {
		sjrchart.load({
  		columns: [
    		['SJR', 0]
    	]
    }); 
	}

	if(selectedJournal.snip){
		snipchart.load({
  		columns: [
    		['SNIP', selectedJournal.snip.snip]
    	]
    	}); 
	}else{
		snipchart.load({
  		columns: [
    		['SNIP', 0]
    	]
    	}); 
	}

    if(selectedJournal.citeScore){
    	citescorechart.load({
  		columns: [
    		['CiteScore', selectedJournal.citeScore.citescore]
    	]
    	}); 
    }else{
		citescorechart.load({
  		columns: [
    		['CiteScore', 0]
    	]
    	}); 
    }
}

function populateCornellPublicationCountChart(){
	//count: 3
	//map: {2013: 1, 2014: 1, 2016: 1}
	//console.log(selectedJournal.cornellPubCounter.count);
	var map = selectedJournal.cornellPubCounter.map;
	var values = [];
	var keys = [2010,2011,2012,2013,2014,2015,2016,2017,2018];
	//console.log(keys);
	var i;
	for(i=0; i<keys.length;i++){
		//console.log(keys[i]);
		if(map[keys[i]] != null){
			values.push(map[keys[i]]);
		}else {
			values.push(0);
		}
	}
	keys.unshift('x');
	//console.log(keys);
	values.unshift('PublicationCount');
	//console.log(values);

	if(selectedJournal.cornellPubCounter.count > 0){
    	cornell.load({
  		columns: [
  			keys, values
    	]
    	}); 
    }else{
		cornell.load({
  		columns: [
  			['x', 'Y-2011', 'Y-2012', 'Y-2013', 'Y-2014', 'Y-2015', 'Y-2016' ,'Y-2017', 'Y-2018'],
  			['PublicationCount',0,0,0,0,0,0,0,0]
    	]
    	}); 
    }
}

function populateUsageDataChart(){
	var xaxis =      	['x', 2015, 2016, 2017, 2018, 2019];
  	var costdata =   	['CostData', 0,0,0,0,0];
  	var usagedata =  	['UsageData', 0,0,0,0,0];
  	var turnawaydata = 	['TurnawayData', 0,0,0,0,0];
  	var clickdata = 	['ClickData', 0,0,0,0,0];
  	//console.log(selectedJournal.costUsageData);
  	
	var i;
  	for(i=0; i<selectedJournal.costUsageData.length;i++){
  		var yearData = selectedJournal.costUsageData[i];
  		var index = xaxis.indexOf(yearData.year);
  		//console.log(yearData.year+"-"+index);
  		if(yearData.cost) { costdata[index] = yearData.cost; }
  		if(yearData.use) { usagedata[index] = yearData.use; }
  		if(yearData.turnaway) { turnawaydata[index] = yearData.turnaway; }
  	}
  	var j;
  	for(i=0; i<selectedJournal.clickData.clickCount.length;i++){
  		var yearData = selectedJournal.clickData.clickCount[i];
  		var index = xaxis.indexOf(yearData.year);
  		if(yearData.count) { clickdata[index] = yearData.count; }
  	}
// console.log(costdata);
// console.log(usagedata);
// console.log(turnawaydata);
// console.log(clickdata);

	linechart.load({
  		columns: [
  			xaxis, costdata, usagedata, turnawaydata, clickdata
    	]
    	}); 
}

