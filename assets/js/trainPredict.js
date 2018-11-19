//I.Predict.A.Train.

$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsQJZ0f2XOtsI2m5nOGUXmvRC0ABvd6Yc",
    authDomain: "train-prediction-dde61.firebaseapp.com",
    databaseURL: "https://train-prediction-dde61.firebaseio.com",
    projectId: "train-prediction-dde61",
    storageBucket: "train-prediction-dde61.appspot.com",
    messagingSenderId: "470778593217"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // console.log(database);

  //Add Train Form Submit Click Event
  $("#add-train-button").on("click",function(event){

    event.preventDefault();

    var name = $("#name-input").val();
    var destination = $("#destination-input").val();
    var trainTime = $("#time-input").val();
    var frequency = $("#frequency-input").val();

    if (name && destination && trainTime && frequency){
      // console.log("name: " + name);
      // console.log("destination: " + destination);
      // console.log("trainTime: " + trainTime);
      // console.log("frequency: " + frequency);
  
      database.ref().push({
          name,
          destination,
          trainTime,
          frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP,
      })
  
      $('#add-train-form')[0].reset();
      $("#incorrect-text").html("")
    } else {
     
      $("#incorrect-text").html("Look...you really gotta fill out <i>all the forms</i> up there, or this doesn't really work does it?");
;
    }

  })

  //Database snapshot on child added event
  database.ref().on("child_added", function(snapshot){

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;


    var currentTime = moment();
    // var currentTime = moment("14:35", "HH:mm");
    var firstTrainTime = moment(firstTrainTime, "HH:mm");

    // console.log(currentTime.format("HH:mm"));
    // console.log(firstTrainTime.format("HH:mm"));

    

    var minutesAway = frequency - currentTime.diff(firstTrainTime, "minutes") % frequency;

    var nextArrival = currentTime.add(minutesAway, "m");
    // var nextArrival = moment(firstTrainTime, "HH:mm").add(frequency,"m");
    
    // console.log("snapshot name: " + name);
    // console.log("snapshot destination: " + destination);
    // console.log("snapshot trainTime: " + trainTime);
    // console.log("snapshot frequency: " + frequency);
    // console.log(nextArrival.format("HH:mm"))

    newRow = $("<tr>")
    newRow.append($("<td>").html(name))
          .append($("<td>").html(destination))
          .append($("<td>").html(frequency))
          .append($("<td>").html(nextArrival.format("hh:mm A")))
          .append($("<td>").html(minutesAway))

    $("#table-body").append(newRow);

  })


})
