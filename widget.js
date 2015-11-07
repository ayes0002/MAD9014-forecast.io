//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function () {
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "styles.css");
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);

 
});

function buildWidget(cls) {
  //now do the ajax call then build your page
    $.ajax({
            url: 'https://api.forecast.io/forecast/bae5e2071ac1d2cd24be300869ba9332/45.348391,-75.757045?units=ca',
            method: 'GET',
            dataType: 'jsonp'
    }).done(function (obj) {
            console.log(obj);
            var d = new Date();
            var myWidget = $(".mywidget");
            var hoursl = 24 - d.getHours();
            var i = 0;
            $("<p>").addClass("Todays temp").text("Current Conditions for today, " + d.getDate() + "/" + parseInt(d.getMonth() + 1)).appendTo(myWidget);
            $("<p>").addClass("rn" + obj.currently.icon).appendTo(myWidget);
            $("<p>").addClass("Todays temp").text("Temperature " + obj.currently.temperature + " C").appendTo(myWidget);
            $("<p>").addClass("Todays temp").text(obj.currently.summary).appendTo(myWidget);
            $("<table>").appendTo(myWidget);
            $(obj.hourly.data).each(function () {
                if (i < hoursl) {
                    $("table").append("<tr>");
                    $("tr:last").append(row(obj, d, i));
                    i++;
                }
            });
    }).fail(function(){
            $("<img>").text();
            console.log("Error! Page didn't load");
    })
}

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".mywidget");
      console.log("both scripts loaded");
    }
}

function row (obj, d, i){
    $("<td>").text(parseInt(d.getHours()+i) + ":00").appendTo("tr:last");
    $("<td>").text(parseInt(obj.hourly.data[i].humidity*100) + "%").appendTo("tr:last"); // Using parseInt is better for %, in demo 50% will be shown as 5% eventhough is 50
    $("<td>").text(parseInt(obj.hourly.data[i].cloudCover*100) + "%").appendTo("tr:last"); // also in demo 0 is shown as undefined but with parseInt it will append the actual 0
    $("<td>").text(parseFloat(obj.hourly.data[i].temperature) + " C").appendTo("tr:last");
    $("<td>").text(parseFloat(obj.hourly.data[i].windSpeed) + " km/h").appendTo("tr:last");
    $("<td>").addClass(obj.hourly.data[i].icon).appendTo("tr:last");
    $("<td>").text(obj.hourly.data[i].summary).appendTo("tr:last");
}