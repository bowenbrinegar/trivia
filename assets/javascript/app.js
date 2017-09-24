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

var wrRecord;

var intervalId;
var clockRunning = false;
var time = 10;


var stopwatch = {

  reset: function() {
    time = 600;
    $("#display").html("10:00");
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
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};

setInterval(function timer() {
	if (time === 0) {
	stopwatch.stop();
	$('#card').fadeOut(2000);
	$('#d').fadeIn(2000)
}} ,500)

$('#card').hide();
$('#d').hide();

$('#maincontainer').on('click', 'button', function() {
	var value = $(this).val();
	if (value === 'start') {
		$('#a').fadeOut(2000)
		$('#card').fadeIn(2000)
		stopwatch.start();
		update();
	}
	if (value === 'next') {
		if (index <= 4) {
			update();
			stopwatch.start();
			$('#card').toggleClass('flipped');
		}
		if (index === 5) {
			$('#card').toggleClass('flipped').fadeOut(2000)
			$('#d').fadeIn(2000)
		}
	}
	if (value === 'restart') {
		index = 1;
		stopwatch.reset();
		$('#d').fadeOut(2000);
		$('#a').fadeIn(2000);
		$('#card').toggleClass('flipped');
	}
})

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
}

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






