let questions = {
		firstset: {
				0: {
					question: 'What is your favorite color?',
					choices: ['blue','yellow','green','purple'],
					right: 0,
				},
				1: {
					question: 'What is your favorite song?',
					choices: ['row your boat','god save the queen','purple haze','piano man'],
					right: 0,
				},
				2: {
					question: 'What is your favorite painting?',
					choices: ['scream','stary night','the monelisa'],
					right: 2,
				},
				3: {
					question: 'What is your favorite song?',
					choices: ['row your boat','god save the queen','purple haze','piano man'],
					right: 0,
				}
		}
}



var index = 0;
var correct = 0;
var wrong = 0;

var wrRecord;

var intervalId;
var clockRunning = false;
var time = 300;

$('#a').show();
$('#card').hide();
$('#d').hide();



//stopwatch from in-class excersize

var stopwatch = {

  reset: function() {
    time = 300;
    $("#display").html("5:00");
  },

  start: function() {
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {
    time--;
    var converted = stopwatch.timeConverter(time);
    $("#display").html(converted);
  },

  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "0";
    }
    else if (minutes < 10) {
      minutes =  minutes;
    }
    return minutes + ":" + seconds;
  }
};


// ends game when clock hits zero

setInterval(function timer() {
	if (time === 0) {
	stopwatch.stop();
	$('#card').fadeOut(2000);
	$('#d').fadeIn(2000)
}} ,500)

setInterval(function() {
	$('#counter').html('')
	$('#counter').append(correct+"/"+index)
}, 1)

// on.click events for all other buttons

$('#maincontainer').on('click', 'button', function() {
	var value = $(this).val();
	if (value === 'start') {
		$('#a').fadeOut(2000)
		$('#card').fadeIn(2000)
		stopwatch.start();
		update();
	}
	if (value === 'next') {
		if (index <= 3) {
			update();
			stopwatch.start();
			$('#card').toggleClass('flipped');
		}
		if (index === 4) {
			$('#card').toggleClass('flipped').fadeOut(2000)
			$('#d').fadeIn(2000)
		}
	}
	if (value === 'restart') {
		index = 0;
		correct = 0;
		stopwatch.reset();
		$('#d').fadeOut(2000);
		$('#a').fadeIn(2000);
	}
})

// on.click events for trivia answer buttons

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
				stopwatch.stop();
				correct++;
				wrRecord = 'Correct!';
				index++;
				wr();
		}
		else {
				stopwatch.stop();
				wrong++;
				wrRecord = 'Wrong!';
				index++;
				wr();
		}
})


// updates trivia questions and choices

function update() {

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

		if (questions.firstset[index].choices.length === 4) {
				$('#button-1').show()
				$('#button-2').show()
				$('#button-3').show()
				$('#button-4').show()
		}
		else if (questions.firstset[index].choices.length === 3) {
				$('#button-1').show()
				$('#button-2').show()
				$('#button-3').show()
				$('#button-4').hide()
		}
		else if (questions.firstset[index].choices.length === 2) {
				$('#button-1').show()
				$('#button-2').show()
				$('#button-3')
				$('#button-4').hide()
		}
		
}

// update correct and wrong

function wr() {
		$('#card').toggleClass('flipped')
		
		$('#wrRecord').html('')	
		$('#wrRecord').append(wrRecord)

		if (wrRecord === 'Correct!') {
			$('#c').removeClass('red')
			$('#c').addClass('green')
		}
		else if (wrRecord === 'Wrong!') {
			$('#c').removeClass('green')
			$('#c').addClass('red')
		}

				
}






