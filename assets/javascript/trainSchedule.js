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

    displayTrains();

    // Function to retreive real time train schedule from Firebase Application Database
    // Display train schedule in HTML
    function displayTrains() {

        $("#train-schedule").empty();

        console.log(database);

        // for loop running through database
        // pass database object to addTrainHTML


    };

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

        // Check that on click event listener retreiving information
        console.log( myTrain );

        addTrainHTML( myTrain );
        
        database.ref().push( myTrain );

    });

    // Function for adding new trains
    function addTrain( getTrain ) {

        var newTrain = $("<tr>");
        var trainName = $("<td>");
        var trainDestination = $("<td>");
        var trainFrequency = $("<td>");
        var trainArrival = $("<td>");
        var trainMinAway = $("<td>");

        trainName.text(getTrain.name);
        trainDestination.text(getTrain.destination);
        trainFrequency.text(getTrain.trainInterval);
        
        // Use moment.js for trainArrival

        // Use moment.js for trainMinAway

        newTrain.append(trainName);
        newTrain.append(trainDestination);
        newTrain.append(trainFrequency);
        newTrain.append(trainArrival);
        newTrain.append(trainMinAway);

        $(".train-schedules").append(newTrain);

    };

    // Function for adding new train to Firebase Application Database


});
