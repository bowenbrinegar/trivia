let questions = {
		firstset: {
				1: {
					question: 'What is your favorite color?',
					choices: ['blue','yellow','green','purple'],
					right: 0,
				},
				2: {
					question: 'What is your favorite song?',
					choices: ['row your boat','god save the queen','purple haze','piano man'],
					right: 0,
				},
				3: {
					question: 'What is your favorite painting?',
					choices: ['scream','stary night','the monelisa'],
					right: 2,
				},
				4: {
					question: 'What is your favorite song?',
					choices: ['row your boat','god save the queen','purple haze','piano man'],
					right: 0,
				}
		}
}



var index = 1;
var correct = 0;
var wrong = 0;

var wr;

$('#restart').hide()

$('#next').hide()
$('#result').hide()

$('#question').hide()

$('#button-1').hide()
$('#button-2').hide()
$('#button-3').hide()
$('#button-4').hide()


$('#maincontainer').on('click', 'button', function() {
	var value = $(this).val();
	if (value === 'start') {
		start();
	}
	if (value === 'next') {
		update();
	}
	if (value === 'restart') {
		firstpage();
	}
})

function firstpage() {
	index = 1;
	$('#restart').hide();
	$('#start').show();
}

function endgame() {
	if (index === 5) {
		$('#next').hide()
		$('#result').hide()

		$('#question').hide()

		$('#button-1').hide()
		$('#button-2').hide()
		$('#button-3').hide()
		$('#button-4').hide()

		$('#restart').show()
	}
}

function start() {
	update();
}


$('#buttondiv').on('click', 'button', function() {
		var value = $(this).val();
		var answer;
		switch(value) {
			   case '1': answer = 0;
			   break;
			   case '2': answer = 1;
			   break;
			   case '3': answer = 2;
			   break;
			   case '4': answer = 4;
			   break;
			   default:
			   break;
		}
		if (answer === questions.firstset[index].right) {
				correct++;
				index++;
				wr = 'Correct!'
				result();
				endgame();

		}
		else {
				wrong++;
				index++;
				wr = 'Wrong!'
				result();
				endgame();
		}
})

function update() {
		$('#start').hide()

		$('#next').hide()
		$('#result').hide()

		$('#question').show()

		$('#button-1').show()
		$('#button-2').show()
		$('#button-3').show()
		$('#button-4').show()

		$('#question').html('')

		$('#btn1').html('')
		$('#btn2').html('')
		$('#btn3').html('')
		$('#btn4').html('')

		$('#question').append(questions.firstset[index].question)

		$('#btn1').append(questions.firstset[index].choices[0])
		$('#btn2').append(questions.firstset[index].choices[1])
		$('#btn3').append(questions.firstset[index].choices[2])
		$('#btn4').append(questions.firstset[index].choices[3])
}

function result() {
		$('#question').hide()

		$('#button-1').hide()
		$('#button-2').hide()
		$('#button-3').hide()
		$('#button-4').hide()

		$('#next').show()
		$('#result').show()

		$('#result').html('')	
		$('#result').append(wr)		
}




