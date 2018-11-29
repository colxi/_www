player ={
	spritesheet		: null,
	right			: true,
	currentAction	: null,
	x_position		: 100,
	y_position		: 280,
	actions: {
		standing: {
			name		: "standing",
			mustEnd		: false,
			actualFrame	: 0,
			sprites		: [
				{xpos:5   , ypos:8   , width: 67  , height: 120 , move: [0,0]},
				{xpos:72  , ypos:8   , width: 67  , height: 120 , move: [0,0]},
				{xpos:139 , ypos:8   , width: 67  , height: 120 , move: [0,0]}, 
				{xpos:206 , ypos:8   , width: 67  , height: 120 , move: [0,0]},
				{xpos:273 , ypos:8   , width: 67  , height: 120 , move: [0,0]},
				{xpos:340 , ypos:8   , width: 67  , height: 120 , move: [0,0]},
				{xpos:407 , ypos:8   , width: 67  , height: 120 , move: [0,0]}				
			]
		},
		crouch: {
			name		: "crouch",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:5   , ypos:144 , width: 66  , height: 105 , move: [0,0]},
				{xpos:71  , ypos:163 , width: 66  , height: 86  , move: [0,0]},
				{xpos:137 , ypos:165 , width: 66  , height: 83  , move: [0,0]}
			]
		},
		standup: {
			name		: "standup",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:71  , ypos:163 , width: 66  , height: 86  , move: [0,0]},
				{xpos:5   , ypos:144 , width: 66  , height: 105 , move: [0,0]}
			]
		},
		back: {
			name		: "back",
			mustEnd		: false,
			actualFrame	: 0,
			sprites		: [
				{xpos:13  , ypos:410 , width: 64  , height: 120 , move: [-2,0]},
				{xpos:77  , ypos:410 , width: 64  , height: 120 , move: [-2,0]},
				{xpos:141 , ypos:410 , width: 64  , height: 120 , move: [-5,0]},
				{xpos:205 , ypos:410 , width: 64  , height: 120 , move: [-6,0]},
				{xpos:269 , ypos:410 , width: 64  , height: 120 , move: [-6,0]},
				{xpos:333 , ypos:410 , width: 64  , height: 120 , move: [-5,0]},
				{xpos:397 , ypos:410 , width: 64  , height: 120 , move: [-2,0]},
				{xpos:461 , ypos:410 , width: 64  , height: 120 , move: [-2,0]}
			]
		},
		front: {
			name		: "front",
			mustEnd		: false,
			actualFrame	: 0,
			sprites		: [
				{xpos:13  , ypos:273 , width: 66  , height: 120 , move: [5,0]},
				{xpos:78  , ypos:273 , width: 66  , height: 120 , move: [5,0]},
				{xpos:145 , ypos:273 , width: 66  , height: 120 , move: [5,0]},
				{xpos:211 , ypos:273 , width: 66  , height: 120 , move: [6,0]},
				{xpos:277 , ypos:273 , width: 66  , height: 120 , move: [6,0]},
				{xpos:343 , ypos:273 , width: 66  , height: 120 , move: [5,0]},
				{xpos:409 , ypos:273 , width: 66  , height: 120 , move: [2,0]},
				{xpos:475 , ypos:273 , width: 66  , height: 120 , move: [2,0]}
			]
		},	
		jump: {
			name		: "jump",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:12  , ypos:547 , width: 56  , height: 128 , move: [0,-30]},
				{xpos:78  , ypos:560 , width: 56  , height: 115 , move: [0,-25]},
				{xpos:142 , ypos:585 , width: 59  , height: 90  , move: [0,-35]},
				{xpos:208 , ypos:593 , width: 59  , height: 80  , move: [0,-25]},
				{xpos:275 , ypos:599 , width: 55  , height: 80  , move: [0,-10]},
				{xpos:275 , ypos:599 , width: 55  , height: 80  , move: [0,10]},
				{xpos:338 , ypos:595 , width: 56  , height: 80  , move: [0,25]},
				{xpos:399 , ypos:582 , width: 61  , height: 93  , move: [0,35]},
				{xpos:463 , ypos:562 , width: 55  , height: 110 , move: [0,25]},
				{xpos:525 , ypos:555 , width: 55  , height: 115 , move: [0,30]}
			]
		},
		jumpfront: {
			name		: "jumpfront",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:12  , ypos:693 , width: 59  , height: 128 , move: [20,-30]},
				{xpos:80  , ypos:712 , width: 56  , height: 105 , move: [15,-25]},
				{xpos:148 , ypos:756 , width: 70  , height: 65  , move: [15,-25]},
				{xpos:148 , ypos:756 , width: 70  , height: 65  , move: [15,-25]},
				{xpos:223 , ypos:750 , width: 70  , height: 67  , move: [15,-15]},
				{xpos:223 , ypos:750 , width: 70  , height: 67  , move: [15,-15]},
				{xpos:300 , ypos:750 , width: 67  , height: 70  , move: [15,15]},
				{xpos:300 , ypos:750 , width: 67  , height: 70  , move: [15,15]},
				{xpos:370 , ypos:760 , width: 75  , height: 80  , move: [15,25]},
				{xpos:370 , ypos:760 , width: 75  , height: 80  , move: [15,25]},
				{xpos:450 , ypos:705 , width: 56  , height: 115 , move: [15,25]},
				{xpos:512 , ypos:690 , width: 61  , height: 130 , move: [15,30]}
			]
		},
		jumpback: {
			name		: "jumpback",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:512 , ypos:690 , width: 61  , height: 130 , move: [-15,-30]},
				{xpos:450 , ypos:705 , width: 56  , height: 115 , move: [-15,-25]},
				{xpos:370 , ypos:760 , width: 75  , height: 80  , move: [-15,-25]},
				{xpos:370 , ypos:760 , width: 75  , height: 80  , move: [-15,-25]},
				{xpos:300 , ypos:750 , width: 67  , height: 70  , move: [-15,-15]},
				{xpos:300 , ypos:750 , width: 67  , height: 70  , move: [-15,-15]},
				{xpos:223 , ypos:750 , width: 70  , height: 67  , move: [-15,15]},
				{xpos:223 , ypos:750 , width: 70  , height: 67  , move: [-15,15]},
				{xpos:148 , ypos:756 , width: 70  , height: 65  , move: [-15,25]},
				{xpos:148 , ypos:756 , width: 70  , height: 65  , move: [-15,25]},
				{xpos:80  , ypos:712 , width: 56  , height: 105 , move: [-15,25]},
				{xpos:12  , ypos:693 , width: 59  , height: 128 , move: [-20,30]}
			]
		},			
		punch: {
			name		: "punch",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:12  , ypos:3570 , width: 67  , height: 110 , move: [0,0]},
				{xpos:92  , ypos:3570 , width: 92  , height: 110 , move: [0,0]},
				{xpos:198 , ypos:3570 , width: 88  , height: 110 , move: [0,0]},
				{xpos:296 , ypos:3570 , width: 67  , height: 110 , move: [0,0]},
				{xpos:376 , ypos:3570 , width: 57  , height: 110 , move: [0,0]}
			]
		},
		punchstrong: {
			name		: "punchstrong",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:12  , ypos:4128 , width: 74  , height: 114 , move: [0,0]},
				{xpos:97  , ypos:4138 , width: 82  , height: 104 , move: [0,0]},
				{xpos:185 , ypos:4140 , width: 88  , height: 102 , move: [0,0]},
				{xpos:282 , ypos:4145 , width: 115 , height: 98  , move: [0,0]},
				{xpos:405 , ypos:4140 , width: 114 , height: 104 , move: [0,0]},
				{xpos:525 , ypos:4144 , width: 114 , height: 100 , move: [0,0]},
				{xpos:645 , ypos:4144 , width: 114 , height: 100 , move: [0,0]},
				{xpos:765 , ypos:4142 , width: 100 , height: 100 , move: [0,0]},
				{xpos:868 , ypos:4138 , width: 85  , height: 104 , move: [0,0]},
				{xpos:958 , ypos:4131 , width: 63  , height: 112 , move: [0,0]},
				{xpos:1028, ypos:4129 , width: 60  , height: 114 , move: [0,0]}
			]
		},	
		kick: {
			name		: "kick",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:12  , ypos:4432 , width: 80  , height: 114 , move: [0,0]},
				{xpos:100 , ypos:4432 , width: 62  , height: 114 , move: [0,0]},
				{xpos:166 , ypos:4432 , width: 91  , height: 114 , move: [0,0]},
				{xpos:260 , ypos:4432 , width: 88  , height: 114 , move: [0,0]},
				{xpos:353 , ypos:4432 , width: 79  , height: 114 , move: [0,0]},
				{xpos:440 , ypos:4432 , width: 58  , height: 114 , move: [0,0]},
				{xpos:507 , ypos:4432 , width: 58  , height: 114 , move: [0,0]}
			]
		},			
		kickstrong: {
			name		: "kickstrong",
			mustEnd		: true,
			actualFrame	: 0,
			sprites		: [
				{xpos:615  , ypos:4432 , width: 53  , height: 114 , move: [0,0]},
				{xpos:675  , ypos:4432 , width: 68  , height: 114 , move: [0,0]},
				{xpos:752  , ypos:4432 , width: 100 , height: 114 , move: [0,0]},
				{xpos:859  , ypos:4432 , width: 100 , height: 114 , move: [0,0]},
				{xpos:968  , ypos:4432 , width: 67  , height: 114 , move: [0,0]},
				{xpos:1043 , ypos:4432 , width: 55  , height: 114 , move: [0,0]},
				{xpos:1105 , ypos:4432 , width: 58  , height: 114 , move: [0,0]}
			]
		},					
	}
}