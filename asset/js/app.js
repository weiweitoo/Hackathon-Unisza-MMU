var game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function playSound(Note,delaytime,Velocity = 127,Volume = 127){
	MIDI.loadPlugin({
		soundfontUrl: "soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
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


function preload(){
	console.log("preload");

	game.load.audio('slowblue', ['asset/audio/slowmusic.mp3']);
}

function create(){
	console.log('create');

	music = game.add.audio('slowblue');
    music.play();

	Qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	Qkey.onDown.add(QKeyEvent, this);
	
	Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	Wkey.onDown.add(WKeyEvent, this);
	
	Ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);
	Ekey.onDown.add(EKeyEvent, this);

	Rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	Rkey.onDown.add(RKeyEvent, this);

	Tkey = game.input.keyboard.addKey(Phaser.Keyboard.T);
	Tkey.onDown.add(TKeyEvent, this);

	Ykey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
	Ykey.onDown.add(YKeyEvent, this);

	Ukey = game.input.keyboard.addKey(Phaser.Keyboard.U);
	Ukey.onDown.add(UKeyEvent, this);

	Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	Ikey.onDown.add(IKeyEvent, this);

	Okey = game.input.keyboard.addKey(Phaser.Keyboard.O);
	Okey.onDown.add(OKeyEvent, this);

	Pkey = game.input.keyboard.addKey(Phaser.Keyboard.P);
	Pkey.onDown.add(PKeyEvent, this);

	OpenBracketkey = game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET);
	OpenBracketkey.onDown.add(OpenBracketKeyEvent, this);
}

function update(){
	window.onbeforeunload = function(e) {
		alert(42);
	};
}

function QKeyEvent(){
	console.log("Q");
	playSound(57,0);
}

function WKeyEvent(){
	console.log("W");
	playSound(60,0);
}

function EKeyEvent(){
	console.log("E");
	playSound(62,0);
}

function RKeyEvent(){
	console.log("R");
	playSound(64,0);
}

function TKeyEvent(){
	console.log("T");
	playSound(67,0);
}

function YKeyEvent(){
	console.log("Y");
	playSound(69,0);
}

function UKeyEvent(){
	console.log("U");
	playSound(72,0);
}

function IKeyEvent(){
	console.log("I");
	playSound(74,0);
}

function OKeyEvent(){
	console.log("O");
	playSound(76,0);
}

function PKeyEvent(){
	console.log("P");
	playSound(79,0);
}

function OpenBracketKeyEvent(){
	console.log("[");
	playSound(81,0);
}