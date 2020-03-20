/*
 * Joo Janta 200 CoronaVirus Filter - Content Script
 *
 * This is the primary JS file that manages the detection and filtration of CoronaVirus from the web page.
 */

// Variables
var regex = /coronavirus|corona|covid|cov-19|cov19|pandemic|quarantine/i;
var search = regex.exec(document.body.innerText);

var selector = ":contains('coronavirus'),:contains('CORONAVIRUS'),:contains('Coronavirus'),:contains('corona'),:contains('CORONA'),:contains('Corona'),:contains('covid'),:contains('COVID'),:contains('Covid'),:contains('cov-19'),:contains('COV-19'),:contains('Cov-19'),:contains('cov19'),:contains('COV19'),:contains('Cov19'),:contains('pandemic'),:contains('PANDEMIC'),:contains('Pandemic'),:contains('quarantine'),:contains('QUARANTINE'),:contains('Quarantine')";

// Functions
function filterMild() {
	console.log("Filtering CoronaVirus with Mild filter...");
	return $(selector).filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering CoronaVirus with Default filter...");
	return $(selector).filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering CoronaVirus with Vindictive filter...");
	return $(selector).filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else if (filter == "aggro") {
	   return filterDefault();
   } else {
     return filterMild();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("CoronaVirus found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", coronacounts: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " CoronaVirus mentions.");
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
