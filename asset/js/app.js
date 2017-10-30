// Global variable
var NOTEPITCH = [45,48,50,52,55,57,60,62,64,67,69,72,74,76,79,81,84,86,88,91,93,96,98,100,103];
var notes = [];
var interval = [];
var intervalInSecond = [];
var recording = false;

var keycode = [
	81,87,69,82,84,
	65,83,68,70,71,
	90,88,67,86,66,
	89,85,73,79,80,
	72,74,75,76,186
];
var keyboard_pressing = [
	false,false,false,false,false,
	false,false,false,false,false,
	false,false,false,false,false,
	false,false,false,false,false,
	false,false,false,false,false
];
var alphabent = [
	'q','w','e','r','t',
	'a','s','d','f','g',
	'z','x','c','v','b',
	'y','u','i','o','p',
	'h','j','k','l','semicolon'
];

var space_pressing = false;

// For Front end
$(document).ready(function(){
	$(".playbgmbutton").hover(function() {
		$( '.playbgmbutton' ).attr("src","asset/img/play-hover.PNG");
		},
		function(){
			$( '.playbgmbutton' ).attr("src","asset/img/play.PNG");
		}
	)
});

function hehe(){
	$('.bgm-window').css({
		'transform':'translate(-50%,-50%)'
	});
	$('.black-layer').css({
		'opacity' : '0.6'
	});

	$('.bgm-window > .close').on('click',function(){
		$(this).parent().css({
			'transform':'translate(-50%,-300%)'
		});
		$('.black-layer').css({
			'opacity' : '0'
		});	  	
	});
	console.log(23);
};

function playbgm(){
	$('.backgroundmusic')[0].play();
}

function stopbgm(){
	$('.backgroundmusic')[0].pause();
	$('.backgroundmusic')[0].currentTime = 0;
}

////////////////////////////////////////////////////////////////////////////
// for backeend
/////////////////////////////////////////////////////////////////////////////
function currTime(){
	var d = new Date();
	var n = d.getTime();
	return n;
}

function convertInterval(interval){
	var result = [];
	for (var i = 0; i < interval.length-1; i++) {
		result.push(interval[i+1] - interval[i]);
	}
	console.log(result);
	return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function inspiration(interval){
    var originalPhraseCount = 3;
    var phraseNoteCount = 3;
	var phraseLeft = 4;
    var up = [1,1,1,-1,-1,0,-1,1,1];
    var phraseWaitCount = 0;
    var noteNow = 10;
	let metronome = setInterval(function tick() {
        if (phraseNoteCount > 0){
                playSound(NOTEPITCH[noteNow],0);
                console.log(NOTEPITCH[noteNow]);
                noteNow = noteNow + up[(phraseNoteCount-1)];
                if ((noteNow > 24) || (noteNow < 0)){
                    noteNow = noteNow - up[(phraseNoteCount-1)];
                }
                if (Math.random() < 0.25){
                    let timerId = setTimeout(function noteBefore() {
                        if (Math.random() < 0.125){
                            playSound(NOTEPITCH[noteNow]+1,0);
                        }
                        else{
                            playSound(NOTEPITCH[noteNow]-1,0);
                        }
                    }, 181.8181);
                }
                phraseNoteCount--;
        }
        else if (phraseWaitCount > 0){
            phraseWaitCount--;
                console.log("Wait");
            noteNow = getRandomInt(7,15);
            for (i = 0; i <= 8; i++){
                up[i] = getRandomInt(-1,1);
            }
        }
        else{
            if (phraseLeft > 1){
                phraseLeft--;
                phraseNoteCount = originalPhraseCount;
                phraseWaitCount = 6 - phraseNoteCount;
            }
            else if (phraseLeft == 1){
                playSound(NOTEPITCH[15],0);
                originalPhraseCount = getRandomInt(3,6);
                phraseNoteCount = originalPhraseCount;
                phraseLeft = getRandomInt(2,4);
                for (i = 0; i <= 8; i++){
                    up[i] = getRandomInt(-1,1);
                }
                phraseWaitCount = 6 - phraseNoteCount;
                noteNow = 15;
            }
        }
	}, interval);
}

function playSound(Note,delaytime,Velocity = 127,Volume = 127){
	MIDI.loadPlugin({
		soundfontUrl: "soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			//console.log(state, progress);
		},
		onsuccess: function() {
			var delay = delaytime; // play one note every quarter second
			var note = Note; // the MIDI note
			var velocity = Velocity; // how hard the note hits
			// play the note
			MIDI.setVolume(0, Volume);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.25);
		}
	});
}

function record(){
	if(recording === false){ 
		interval =[];
		notes = [];
		intervalInSecond = [];

		recording = true;
		console.log(currTime());
		console.log("start recording");	
		interval.push(currTime());
	}
	else if (recording === true){
		recording = false;
		intervalInSecond = convertInterval(interval);
		console.log("end recording");
	}
}

function playSoundWithIntervalToo(){
	var index = 0;
	let timerId = setTimeout(function tick() {
		playSound(NOTEPITCH[notes[index]],0);
		// console.log(intervalInSecond[index]);
		// console.log(NOTEPITCH[notes[index]]);
		index++;

		if(typeof intervalInSecond[index] != 'undefined')
		{
			timerId = setTimeout(tick, intervalInSecond[index]);
		}
	}, 0);
}

function playSoundWithIntervalJohn(){
	var index = 0;
	var rand = Math.random();
	let timerId = setTimeout(function tick() {
		// console.log(intervalInSecond[index]);
		// console.log(NOTEPITCH[notes[index]]);
		if (rand < 0.33){
            playSound(NOTEPITCH[(notes[index]+1)],0);
            if (notes[index] == 24){
                playSound(105,0);
            }
		}
		else if (rand < 0.66){
            playSound(NOTEPITCH[(notes[index]-1)],0);
            if (notes[index] == 0){
                playSound(43,0);
            }
		}
		else{
            playSound(((NOTEPITCH[(notes[index])])+12),0);
		}

		index++;

		if(typeof intervalInSecond[index] != 'undefined')
		{
			timerId = setTimeout(tick, intervalInSecond[index]);
		}
	}, 0);
}

function playSoundWithIntervalToo(){
	var index = 0;
	let timerId = setTimeout(function tick() {
		playSound(NOTEPITCH[notes[index]],0);
		console.log(intervalInSecond[index]);
		console.log(NOTEPITCH[notes[index]]);
		index++;

		if(typeof intervalInSecond[index] != 'undefined')
		{
			timerId = setTimeout(tick, intervalInSecond[index]);
		}
	}, 0);
}


// Event listener
$(document).ready(function(){
	document.addEventListener('keydown', function(event) {
		// for keybord event
		for (var i = 0; i < alphabent.length; i++) {
			console.log(event.keyCode);
			if(event.keyCode == keycode[i] && keyboard_pressing[i] == false) {
				playSound(NOTEPITCH[i],0);
				keyboard_pressing[i] = true;
				// lol, worry no enough time to code,better use fastest way
				var effect = "";
				var temp = i % 5;
				if(temp == 0){
					effect = '0px 0px 15px 6px ' + 'blue';
				}
				else if (temp == 1){
					effect = '0px 0px 15px 6px ' + 'teal';	
				}
				else if (temp == 2){
					effect = '0px 0px 15px 6px ' + 'red';	
				}
				else if (temp == 3){
					effect = '0px 0px 15px 6px ' + 'green';	
				}
				else if (temp == 4){
					effect = '0px 0px 15px 6px ' + 'purple';	
				}

				$('#' + alphabent[i] + 'key').css('box-shadow',effect);
				if(recording){ 
					console.log(currTime());	
					interval.push(currTime());
					notes.push(i);
				}
			}
		}

		//For space key event
		if(event.keyCode == 32 && space_pressing == false) {
			space_pressing = true;
			record();
			// end recording
			if(recording == false){
				playSoundWithIntervalJohn();
			}
		}
	});

	document.addEventListener('keyup',function(event){
		for (var i = 0; i < alphabent.length; i++) {
			if(event.keyCode == keycode[i] && keyboard_pressing[i] === true) {
				keyboard_pressing[i] = false;
				$('#' + alphabent[i] + 'key').css('box-shadow','none');
			}
		}

		// for space key event
		if(event.keyCode == 32 && space_pressing == true) {
			space_pressing = false;
		}
	});
});




