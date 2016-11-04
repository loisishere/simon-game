$(document).ready(function(){
var tile_sequence =[];
  var counter = 0;
  var currently_playing = false;
  var move = 0;
  var limit = 20;
  var speed = 800;
  var clickCount= 0;
  //get game level difficulty
  $("input[name=level]").on("change",function(){

})

//start playing the game
function startGame(){
	if($("input[name=level]:checked").val() ==="easy"){
	limit = 20;
	speed = 800;
  }
  if ($("input[name=level]:checked").val() ==="hard") {
  	limit = 50;
  	speed = 200;
  }
	if(counter >=limit){
		$(".msg").removeClass("hidden");
		$(".msg > h2").text("You Win!");
	}else{
		if(!currently_playing){

			tileSequence();
			counter++;
			updateRound(counter);
			playGame(tile_sequence);
		}
	}
}
function tileSequence(){
	var rand = Math.floor(Math.random()*4)+1;
	tile_sequence.push(rand);
}

function playGame(seq){
	var num = 0;
	var time_sequence = setInterval(function(){
		lightUp(seq[num]);
		num++;
		if(num >= seq.length){
			clearInterval(time_sequence);
		}
	},speed);
	currently_playing = true;
}

function lightUp(tile){
	playTileSound(tile);
	$("#"+ tile).addClass("lite");
	window.setTimeout(function(){
		$("#"+ tile).removeClass("lite");
	},(speed/2)+50);
}
function playTileSound(clip){
  var sound = $('#clip'+ clip)[0];
  sound.currentTime = 0;
  sound.play();
}
function updateRound(count){
	$(".round").text(count);
}
 $('.corner').click(function(){
    //if the player has not repeated the full sequence
    if(clickCount < tile_sequence.length && currently_playing === true){
        move = Number($(this).attr('data-tile'));
        lightUp(move);
        if (checkSequence(move,clickCount)){
          clickCount ++;
          if (clickCount >= tile_sequence.length){
            currently_playing = false;
            clickCount = 0;
            window.setTimeout(startGame, 600);
          }
        }else{
          currently_playing = false;
          updateRound('0');
          $(".msg").removeClass("hidden");
		$(".msg > h2").text("You Lose!");
        }
      }
      
  });
function checkSequence(move, click){
  if (move === tile_sequence[click]){
    return true;
  }
  return false;
}
$('.play').on('click', function(){
  tile_sequence =[];
  counter = 0;
  currently_playing = false;
  move = 0;
  clickCount= 0;
  $(".msg").addClass("hidden");
  updateRound(counter);
  startGame();
  });
});