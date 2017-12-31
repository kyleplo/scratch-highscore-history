function trimProjectUrl(url){if(isNaN(url.charAt(url.lastIndexOf("/") - 1))){return url.slice(33)}else{return url.slice(33,url.lastIndexOf("/"))}}
function load(id){
  document.getElementById("loading").removeAttribute("hidden");
  document.getElementById("loading").innerHTML = "Loading...";
fetch("https://cors-everywhere.herokuapp.com/clouddata.scratch.mit.edu/logs?projectid=" + id + "&limit=1000&offset=0").then(function (r){if(r.ok){return r.json()}else{document.getElementById("loading").innerHTML = "Error: Reload and try again"}}).then(function (j){
console.log("Fetched: " + j);
var scores = [];
var lastUser = "";
// scores.push({user: "kyleplo",score: 1000, date: new Date(timestamp)});
for(var i = 0;i < j.length;i++){
if(j[i].verb === "set_var" && j[i].user !== lastUser){scores.push({user: j[i].user, score: j[i].value, date: new Date(j[i].timestamp)})};lastUser = j[i].user;
};
var scoreHtml = "";
for(var i = 0;i < scores.length;i++){
scoreHtml += "<li><a href='https://scratch.mit.edu/users/" + scores[i].user + "'>@" + scores[i].user + "</a>: " + scores[i].score + " <span>" + timeago().format(scores[i].date) + "</span></li>";
}
document.getElementById("scores").innerHTML = scoreHtml;document.getElementById("loading").setAttribute("hidden","hidden");
}).catch(function (r){document.getElementById("loading").innerHTML = "Error: " + r.message + "<br>Reload and try again";});
}
window.addEventListener("load",function (){new Clipboard('#copy');
if(location.hash.length > 1){load(location.hash.slice(1))}else{document.getElementById("learn").setAttribute("hidden","hidden");document.getElementById("about").removeAttribute("hidden")}
})
window.addEventListener("hashchange",function (){if(location.hash.length > 1){load(location.hash.slice(1))}});
