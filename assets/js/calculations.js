// Cars Formula
/*
var min1=1; 
var max1=895149;  
var entries1=1199;
var random1;
for (i=0;i<entries1;i++) {
  random1 = parseInt(Math.random() * (+max1 - +min1) + +min1);
  if (random1 < 16231) {
    console.log(4);
  } else if (random1 < (16231 + 51107)) {
    console.log(3);
  } else if (random1 < (16231 + 51107 + 172539)) {
    console.log(0);
  } else if (random1 < (16231 + 51107 + 172539 + 290057)) {
    console.log(2);
  } else {
    console.log(1);
  } 
  console.log(",")
}
*/

// Computers Formula
/*
var min2=1; 
var max2=895149;  
var entries2=1199;
var random2;
for (i=0;i<entries2;i++) {
  random2 = parseInt(Math.random() * (+max2 - +min2) + +min2);
  if (random2 < 20582) { 
    console.log("computer_n/a");
  } else if (random2 < (20582+197062)) { 
    console.log("computer_no");
  } else {
    console.log("computer_yes");
  } 
  console.log(",")
}
*/

// Internet Formula
/*
var min3=1; 
var max3=895149;  
var entries3=1199;
var random3;
for (i=0;i<entries3;i++) {
  random3 = parseInt(Math.random() * (+max3 - +min3) + +min3);
  if (random3 < 21473) { 
    console.log("internet_n/a");
  } else if (random3 < (21473+65600)) { 
    console.log("internet_other");
  } else if (random3 < (21473+65600+200718)) { 
    console.log("internet_no");
  } else {
    console.log("internet_broadband");
  } 
  console.log(",")
}
*/


// Leave Formula
/*
var min5=1; 
var max5=722553;  
var entries5=1199;
var random5;
for (i=0;i<entries5;i++) {
  random5 = parseInt(Math.random() * (+max5 - +min5) + +min5);
  if (random5 < 27307) { 
    console.log("leave_0630");
  } else if (random5 < (27307+28055)) { 
    console.log("leave_n/a");
  } else if (random5 < (27307+28055+39425)) { 
    console.log("leave_0700");
  } else if (random5 < (27307+28055+39425+54994)) { 
    console.log("leave_after_0930");
  } else if (random5 < (27307+28055+39425+54994+58789)) { 
    console.log("leave_0730");
  } else if (random5 < (27307+28055+39425+54994+58789+68470)) { 
    console.log("leave_0930");
  } else if (random5 < (27307+28055+39425+54994+58789+58952+103966)) { 
    console.log("leave_0800");
  } else if (random5 < (27307+28055+39425+54994+58789+58952+101527+152392)) { 
    console.log("leave_0830");
  } else {
    console.log("leave_0900");
  } 
  console.log(",")
}
*/

// Travel Formula
///*
var min4=1; 
var max4=328669;  
var entries4=259;
var random4;
var travelString = "";
var timeString = "";

var motorcycleValue = 507;
var trainValue = 1079;
var bicycleValue = 4726;
var vanValue = 18440;
var busValue = 30183;
var otherValue = 27412;
var footValue = 36870;
var passengerValue = 67626;

for (var i=0;i<entries4;i++) {
  random4 = parseInt(Math.random() * (+max4 - +min4) + +min4);
  if (random4 < motorcycleValue) { 
    travelString = travelString + "travel_motorcycle";
    timeString = timeString + createTimeValue("travel_motorcycle");
  } else if (random4 < (motorcycleValue+trainValue)) { 
    travelString = travelString + "travel_train";
    timeString = timeString + createTimeValue("travel_train");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue)) { 
    travelString = travelString + "travel_bicycle";
    timeString = timeString + createTimeValue("travel_bicycle");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue+vanValue)) { 
    travelString = travelString + "travel_van";
    timeString = timeString + createTimeValue("travel_van");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue+vanValue+busValue)) { 
    travelString = travelString + "travel_bus";
    timeString = timeString + createTimeValue("travel_bus");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue+vanValue+busValue+otherValue)) { 
    travelString = travelString + "travel_other";
    timeString = timeString + createTimeValue("travel_other");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue+vanValue+busValue+otherValue+footValue)) { 
    travelString = travelString + "travel_foot";
    timeString = timeString + createTimeValue("travel_foot");
  } else if (random4 < (motorcycleValue+trainValue+bicycleValue+vanValue+busValue+otherValue+footValue+passengerValue)) { 
    travelString = travelString + "travel_car_passenger";
    timeString = timeString + createTimeValue("travel_car_passenger");
  } else {
    travelString = travelString + "travel_car";
    timeString = timeString + createTimeValue("travel_car");
  } 
  if (i == 600) {
    travelString = travelString + "\n\n";
    timeString = timeString + "\n\n";
  } else if (i+1 < entries4) {
    travelString = travelString + ",";
    timeString = timeString + ",";
  }
  
}

function createTimeValue(travelValue) {
  var min6=1; 
  var max6;  
  var entries6=259;
  var timeValue;
  var random6;
  
  var nintyPlusValue = 5399;
  var nintyValue = 12240;
  var sixtyValue = 14086;
  var naValue = 20740;
  var fortyfiveValue = 48129;
  var thirtyValue = 92542;
  var fifteenValue = 122640;
  
  if (travelValue == "travel_foot" || travelValue == "travel_bicycle") {
    max6=naValue+thirtyValue+fifteenValue;
    random6 = parseInt(Math.random() * (+max6 - +min6) + +min6);
    if (random6 < (naValue)) { 
      timeValue = "time_n/a";
    } else if (random6 < (naValue+thirtyValue)) { 
      timeValue = "time_30";
    } else {
      timeValue = "time_15";
    }
  } else {
    max6=315776;
    random6 = parseInt(Math.random() * (+max6 - +min6) + +min6);
    if (random6 < nintyPlusValue) { 
      timeValue = "time_90+";
    } else if (random6 < (nintyPlusValue+nintyValue)) { 
      timeValue = "time_90";
    } else if (random6 < (nintyPlusValue+nintyValue+sixtyValue)) { 
      timeValue = "time_60";
    } else if (random6 < (nintyPlusValue+nintyValue+sixtyValue+naValue)) { 
      timeValue = "time_n/a";
    } else if (random6 < (nintyPlusValue+nintyValue+sixtyValue+naValue+fortyfiveValue)) { 
      timeValue = "time_45";
    } else if (random6 < (nintyPlusValue+nintyValue+sixtyValue+naValue+fortyfiveValue+thirtyValue)) { 
      timeValue = "time_30";
    } else {
      timeValue = "time_15";
    }
  }
  
  return timeValue;
}

console.log(travelString);
console.log(timeString);

//*/