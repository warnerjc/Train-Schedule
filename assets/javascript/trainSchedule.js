$(document).ready( function() {

    // Initialize Firebase
    // Changed database to public read & write
    // Be sure to change back if adding user authentication
    var config = {
        apiKey: "AIzaSyDrhiwO9CJDmcS1RQISnS9MZJrL6iX0Ur0",
        authDomain: "train-schedules-6ee19.firebaseapp.com",
        databaseURL: "https://train-schedules-6ee19.firebaseio.com",
        projectId: "train-schedules-6ee19",
        storageBucket: "",
        messagingSenderId: "257502018784"
    };
    firebase.initializeApp(config);

    // Get reference to Firebase Application Database
    var database = firebase.database();

    // Function to retreive real time train schedule from Firebase Application Database
    // Display train schedule in HTML
    database.ref("/trains").on("child_added", function(snapshot) {

        // Then we console.log the value of snapshot
        console.log(snapshot.val());

        var newTrain = $("<tr>");
        var trainName = $("<td>");
        var trainDestination = $("<td>");
        var trainFrequency = $("<td>");
        var trainArrival = $("<td>");
        var trainMinAway = $("<td>");

        trainName.text(snapshot.val().name);
        trainDestination.text(snapshot.val().destination);
        trainFrequency.text(snapshot.val().trainInterval);
        
        // Use moment.js for trainArrival   
        // Use moment.js for trainMinAway

        newTrain.append(trainName);
        newTrain.append(trainDestination);
        newTrain.append(trainFrequency);
        newTrain.append(trainArrival);
        newTrain.append(trainMinAway);

        $(".train-schedules").append(newTrain);

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });

    // On click event listener for adding train to schedule
    // "#save-train" from modal
    $("#save-train").on("click", function() {

        // make local copy of my train
        var myTrain = {
            name: $("#train-name").val().trim(),
            destination: $("#destination-name").val().trim(),
            startTime: $("#first-train").val().trim(),
            trainInterval: $("#frequency-time").val().trim()
        }

        $("#train-name").val("");
        $("#destination-name").val("");
        $("#first-train").val("");
        $("#frequency-time").val("");

        // New Train prior to sending to Firebase Application Database
        console.log( myTrain );
        
        database.ref("/trains").push( myTrain );

    });

});
