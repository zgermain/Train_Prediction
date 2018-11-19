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

  console.log(database);


  //Add Train Form Submit Click Event
  $("#add-train-button").on("click",function(event){

    event.preventDefault();

    var name = $("#name-input").val();
    var destination = $("#destination-input").val();
    var trainTime = $("#time-input").val();
    var frequency = $("#frequency-input").val();

    console.log("name: " + name);
    console.log("destination: " + destination);
    console.log("trainTime: " + trainTime);
    console.log("frequency: " + frequency);

    database.ref().push({
        name,
        destination,
        trainTime,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    })

    $('#add-train-form')[0].reset();

  })

  //Database snapshot on child added event
  database.ref().on("child_added", function(snapshot){

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var trainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;

    console.log("snapshot name: " + name);
    console.log("snapshot destination: " + destination);
    console.log("snapshot trainTime: " + trainTime);
    console.log("snapshot frequency: " + frequency);
  })


})
