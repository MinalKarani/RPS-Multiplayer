var name;
var win;
var loose;
var playercount=0;
var flag=false;   
var player1;
var player2;
var player1Choice;
var player2Choice;
var RPS = ['Rock','Paper','Scissors'];
var turn;
var j=0;
var k=0;

var playerOne={
name:"",
wins:0,
loss:0,
tie:0,
turn:0,
choice: "" ,
turn:0,
flag:false,
game:{}
};

var playerTwo={
name:"",
wins:0,
loss:0,
tie:0,
turn:0,
choice: "" ,
turn:0,
flag:false,
game:{}
};

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2W8UwsJNT6Z8q_XZOUpUHplupb8KlZjE",
    authDomain: "minalfirst.firebaseapp.com",
    databaseURL: "https://minalfirst.firebaseio.com",
    projectId: "minalfirst",
    storageBucket: "minalfirst.appspot.com",
    messagingSenderId: "786089528355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //connection
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");

  connectedRef.on("value", function(snap) {
    //if they are connected
    if(snap.val()){
        //add user to connections list.
        var here = connectionsRef.push(true);
        //remove user from connection list when they disconnect.
        here.onDisconnect().remove();
    };
  });
  
  connectionsRef.on("value", function(snap) {
     playersConnected = (snap.numChildren());
     console.log(playersConnected);
  });
  
    
 $("#enter").on("click", function() 
 {
   
            event.preventDefault();
            if(playercount<2)
            {
            // First, make sure that the name field is non-empty and we are still waiting for a player 
            if ($("#name").val().trim() !== "") 
            { 
              // Adding player1 
              console.log(player1);
              if (!player1)
               { 
                  console.log("Adding Player 1"); 
                  pname = $("#name").val().trim(); 
                  playerOne.name=pname;
                  playercount++;
                  //playerOne.flag=true;
                  if(!player2)
                  playerOne.turn=1;
                  else
                  playerOne.turn=2;
                  database.ref().child("/players/player1").set(playerOne);
                  $("#player1").html(pname);
                }
              
                else if((!player2))
                {
                  console.log(player2);
                  console.log("Adding Player 2"); 
                  pname = $("#name").val().trim(); 
                  playerTwo.name=pname;
                  playercount++; 
                  //playerTwo.flag=true;
                  if(!player1)
                  playerTwo.turn=1;
                  else
                  playerTwo.turn=2;
                  database.ref().child("/players/player2").set(playerTwo);
                  $("#player2").html(pname);
                }

            }
            /*if (playercount===2)
            $("#loginform").css("opacity","0");*/
          }
});

 
    
// Attach a listener to the database /players/ node to listen for any changes 
 database.ref("/players/").on("value", function(snapshot) { 
  
// Check for existence of player 1 in the database 
  if (snapshot.child("player1").exists() )
            { 
            console.log("Player 1 exists"); 

            // Record player1,player2 data 
              player1 = snapshot.val().player1; 
              player2 = snapshot.val().player2;
              
              $("#player1").html(player1.name); 

              $("#player1result").html("Win:  " + player1.wins + ", Loss:  " + player1.loss + ", Tie: " + player1.tie); 
              console.log("player1 turn: " +player1.turn);
              if((player1.flag===false)||(playercount===0))
                  {
                        if(player1.turn === 1){
                          $('#player1msg').empty();
                          $('#player1options').empty();
                          $('#player1msg').html("It's your turn!");
                        
                          for(var i = 0; i < 3; i++){
                            var options = $('<div>');
                            options.attr('data-choice', RPS[i]);
                            options.addClass("RPS1");
                            options.text(RPS[i]);
                            $('#player1options').append(options);  
                          }
                          database.ref().child("/players/player1/flag/").set(true);
                        }
                          else if(player1.turn === 2){
                          $("#player1msg").empty();
                          $('#player1msg').html('Waiting for '+ player2.name);
                        }
                        //player1.flag=true;
                  }
                  /*else
                  {
                    $("#player1msg").empty();
                    $('#player1msg').html('Waiting for '+ player2.name);
                  }*/
              } 
              else 
              { 
                        console.log("Player 1 does NOT exist");  
                      // Update player1 display 
                        $("#player1").empty();
                        $("#player1").text("Waiting for Player 1..."); 
              } 

// Check for existence of player 2 in the database 
   if (snapshot.child("player2").exists()) 
   { 
      console.log("Player 2 exists"); 
      console.log("player2:"+player2.turn);
          
      // Update player2 display 
      $("#player2").html(player2.name); 
      $("#player2result").html("Win:  " + player2.wins + ", Loss:  " + player2.loss + ", Tie: " + player2.tie); 
      console.log("Player2 turn: " +player2.turn);

      if(player2.turn === 1)
      {
                $('#player2msg').empty();
                $('#player2options').empty();
                $('#player2msg').html("It's your turn!");
                
                for(var i = 0; i < 3; i++)
                {
                  var options = $('<div>');
                  options.attr('data-choice', RPS[i]);
                  options.addClass("RPS2");
                  options.text(RPS[i]);
                  $('#player2options').append(options);  
                }
                database.ref().child("/players/player2/flag/").set(true);
      }
      else if(player2.turn === 2)
      {
                $("#player2msg").empty();
                $('#player2msg').html('Waiting for '+ player1.name);
      }
   } else
   { 
         console.log("Player 2 does NOT exist");  
         // Update player2 display 
         $("#player2").empty();
         $("#player2").text("Waiting for Player 2...");       
   } 
  
});

$("#player1options").on("click",function()
{
  
    $('#player2msg').html("It's your turn!");
    
      for(var i = 0; i < 3; i++)
      {
            var options = $('<div>');
            options.attr('data-choice', RPS[i]);
            options.addClass("RPS2");
            options.text(RPS[i]);
            $('#player2options').append(options);  
      }
      $('#player1msg').empty();
      $('#player1options').empty();
      $('#player1msg').html('Waiting for '+ player2.name);

})

$(document).on("click",".RPS1",function()
{
      $('#player1msg').empty();
      $('#player1options').empty();
      $('#player2msg').html("It's your turn!");
      player1Choice=$(this).data('choice');
      database.ref().child("/players/player1/game/"+j).set(player1Choice);
      console.log(playerOne);
      //winner();
      j++;
});

$(document).on("click",".RPS2",function()
{
      $('#player2msg').empty();
      $('#player2options').empty();
      player2Choice=$(this).data('choice');
      database.ref().child("/players/player2/game/"+k).set(player2Choice);
      console.log(playerTwo);
      winner();
      k++;
      database.ref().child("/players/player1/flag/").set(false);
});


function winner()
{
  
              database.ref("/players/player1/game/"+k).on("value", function(snapshot) {
              player1Choice=snapshot.val();
              console.log("Player1: " + player1Choice +"in game"+k);});

              database.ref("/players/player2/game/"+k).on("value", function(snapshot) {
              player2Choice=snapshot.val();
              console.log("Player2: " + player2Choice+"in game"+k);});
              
              if (player1Choice == player2Choice)
              {
                $('#winner').html("It's a tie!");
                player1.tie++;
                player2.tie++;
              }
              else if ((player1Choice == 'Rock') && (player2Choice == 'Paper'))
              {
                $('#winner').html(player2.name + ' wins!');
                player1.loss++;
                player2.wins++;
              }
              else if ((player1Choice == 'Rock') && (player2Choice == 'Scissors'))
              {
                $('#winner').html(player1.name + ' wins!');
                player1.wins++;
                player2.loss++;
              }
              else if ((player1Choice == 'Scissors') && (player2Choice == 'Paper'))
              {
                $('#winner').html(player1.name + ' wins!');
                player1.wins++;
                player2.loss++;
              }
              else if ((player1Choice == 'Scissors') && (player2Choice == 'Rock'))
              {
                $('#winner').html(player2.name + ' wins!');
                player1.loss++;
                player2.wins++;
              }
              else if ((player1Choice == 'Paper') && (player2Choice == 'Scissors'))
              {
                $('#winner').html(player2.name + ' wins!');
                player1.loss++;
                player2.wins++;
              }
              else if ((player1Choice == 'Paper') && (player2Choice == 'Rock'))
              {
                $('#winner').html(player1.name + ' wins!');
                player1.wins++;
                player2.loss++;
              }
            console.log("player2Score:"+player2.wins);
            database.ref().child("/players/player1/wins/").set(player1.wins);
            database.ref().child("/players/player1/loss/").set(player1.loss);
            database.ref().child("/players/player1/tie/").set(player1.tie);
            database.ref().child("/players/player2/wins/").set(player2.wins);
            database.ref().child("/players/player2/loss/").set(player2.loss);
            database.ref().child("/players/player2/tie/").set(player2.tie);
}