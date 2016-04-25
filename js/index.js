var worktime = document.getElementById("setworktime").innerHTML;
var breaktime = document.getElementById("setbreaktime").innerHTML;
var seconds = 0;
var t = 0;

//setting worktime
function incrementWork(id, time) {
  var thisId = id;
  time < 60 ? ++time : time = 0;
  worktime = time;
  displayWork(thisId);
}

function decrementWork(id, time) {
  var thisId = id;
  time > 0 ? --time : time = 60;
  worktime = time;
  displayWork(thisId);
}

function displayWork(id) {
  if(worktime < 10) { 
    document.getElementById(id).innerHTML = "0" + worktime; 
  }
  else {
    document.getElementById(id).innerHTML = worktime;
  }
}

//setting breaktime
function incrementBreak(id, time) {
  var thisId = id;
  time < 60 ? ++time : time = 0;
  breaktime = time;
  displayBreak(thisId);
}

function decrementBreak(id, time) {
  var thisId = id;
  time > 0 ? --time : time = 60;
  breaktime = time;
  displayBreak(thisId);
}

function displayBreak(id) {
  if(breaktime < 10) { 
    document.getElementById(id).innerHTML = "0" + breaktime; 
  }
  else {
    document.getElementById(id).innerHTML = breaktime;
  }
}

//start button onclick
function startClock() {
  var elems = document.getElementsByClassName("selector");
    for(var i = 0; i < elems.length; i++) {
      elems[i].disabled = true;
    }
  document.getElementById("startbutton").disabled = true;
  
   if(seconds === 0 && worktime === 0) {
     document.getElementById("startbutton").setAttribute("onclick", "breakStart()");
     soundAlarm();
     return breakStart();
   }     
   else if(seconds === 0) {
     worktime--;
     seconds = 59;
   }
   else {      
     seconds--;
   }

   displayTime(worktime, seconds);
   t = setTimeout(startClock, 1000);
}

function breakStart() {
  var elems = document.getElementsByClassName("selector");
    for(var i = 0; i < elems.length; i++) {
      elems[i].disabled = true;
    }
  document.getElementById("startbutton").disabled = true;
  
  if(seconds === 0 && breaktime === 0) {
    return soundAlarm();
  }
  else if(seconds === 0) {
    breaktime--;
    seconds = 59;
  }
  else {
    seconds--;
  }
  
  displayTime(breaktime, seconds);
  t = setTimeout(breakStart, 1000);
}

function displayTime(min, sec) {
  var minDisp = min;
  var secDisp = sec;
  
  if(minDisp < 10) { minDisp = "0" + minDisp; }
  if(secDisp < 10) { secDisp = "0" + secDisp; }
  document.getElementById("displaymain").innerHTML = minDisp + ":" + secDisp;
}

//sound the alarm when time is up
function soundAlarm() {
  var alarm = new Audio("http://onlineclock.net/audio/options/military-trumpet.mp3");
  alarm.play();
}

//pause button onclick
function pauseClock() {
  var elems = document.getElementsByClassName("selector");
    for(var i = 0; i < elems.length; i++) {
      elems[i].disabled = false;
    }
  document.getElementById("startbutton").disabled = false;
  document.getElementById("startbutton").innerHTML = "continue";
  clearTimeout(t);
}

//reset button onclick
function resetClock() {
  var elems = document.getElementsByClassName("selector");
    for(var i = 0; i < elems.length; i++) {
      elems[i].disabled = false;
    }
  document.getElementById("startbutton").setAttribute("onclick", "startClock()");
  document.getElementById("startbutton").disabled = false;
  document.getElementById("startbutton").innerHTML = "start";
  worktime = document.getElementById("setworktime").innerHTML;
  breaktime = document.getElementById("setbreaktime").innerHTML;
  
  seconds = 0;
  clearTimeout(t);
  displayTime(0, 0);
}