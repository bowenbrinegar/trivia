$(document).ready(function() {

var index = 0;
var correct = 0;
var wrong = 0;

var wrRecord;
var key;
var answer;

var intervalId;
var clockRunning = false;
var clockRunning2 = false;
var time = 0;
var time2 = 30;

$('#a').show();
$('#card').hide();
$('#d').hide();


var countdown = {

  reset: function() {
    time2 = 30;
    $('.time2').html(time2)
  },

  start: function() {
    if (!clockRunning2) {
        intervalId = setInterval(countdown.count, 1000);
        clockRunning2 = true;
    }
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning2 = false;
  },

  count: function() {
    time2--;
    $(".time2").html(time2);
  },
}

$('.time2').html(time2)

// ends game when clock hits zero

setInterval(function timer() {
	if (time2 === 1) {
		wrong++;
		wrRecord = 'Wrong!';
		wr();
	}
	if (time2 === 0) {
		countdown.stop();
		countdown.reset();
	}
} , 1000)


setInterval(function() {
	$('#counter').html('')
	$('#counter').append(correct+"/"+index)
}, 1)


// on.click events for all other buttons
$('#introcontainer').on('click', 'button', function() { 
	var value = $(this).val();
	switch(value) {
				case 'firstset': key = 'firstset';
					break;
				case 'secondset': key = 'secondset';
					break;
				case 'thirdset': key = 'thirdset';
					break;
				case 'forthset': key = 'forthset';
					break;
				default:
          break;
	};
	$('#a').fadeOut(2000);
	$('#card').fadeIn(2000);
	$('#b').show();
	$('#a').show();
	countdown.start();
	update();
});

$('#maincontainer').on('click', 'button', function() {
	var value = $(this).val();
	if (value === 'next') {
		if (index <= questions[key].leng - 1) {
			update();
			countdown.start();
			$('#card').toggleClass('flipped');
		}
		if (index === questions[key].leng) {
			$('#b').fadeOut(2000);
			$('#d').fadeIn(2000);
			// flipped();
		}
		$('#buttondiv').removeClass('pointer');
	}
	if (value === 'restart') {
		index = 0;
		correct = 0;
		countdown.reset();
		$('#d').fadeOut(2000);
		$('#a').fadeIn(2000);
		$('#card').toggleClass('flipped').hide();
	}
})


// on.click events for trivia answer buttons

$('#buttondiv').on('click', 'button', function() {
		var value = $(this).val();
		switch(value) {
			   case '1': answer = 0;
			   break;
			   case '2': answer = 1;
			   					 if (key === 'thirdset') {
			   					 	answer = 10;
			   					 }
			   break;
			   case '3': answer = 2;
			   break;
			   case '4': answer = 4;
			   break;
			   default:
			   break;
		}
		if (answer === 10) {
			var val = false;
			while(!val) {
				alert("Wrong Choice")
			}
		}
		if (answer === questions[key][index].right) {
				correct++;
				wrRecord = 'Correct!';
				wr();
		}
		else {
				wrong++;
				wrRecord = 'Wrong!';
				wr();
		}
		countdown.stop()
		countdown.reset();
		$('#buttondiv').addClass('pointer')
})


// updates trivia questions and choices

function update() {
		$('#question').html('')

		$('#btn1').html('')
		$('#btn2').html('')
		$('#btn3').html('')
		$('#btn4').html('')

		$('#question').append(questions[key][index].question)

		$('#btn1').append(questions[key][index].choices[0])
		$('#btn2').append(questions[key][index].choices[1])
		$('#btn3').append(questions[key][index].choices[2])
		$('#btn4').append(questions[key][index].choices[3])

		if (questions[key][index].choices.length === 4) {
				$('#button-2').show()
				$('#button-3').show()
				$('#button-4').show()
		}
		else if (questions[key][index].choices.length === 3) {
				$('#button-2').show()
				$('#button-3').show()
				$('#button-4').hide()
		}
		else if (questions[key][index].choices.length === 2) {
				$('#button-2').show()
				$('#button-3').hide()
				$('#button-4').hide()
		}
		
}

// update correct and wrong

function wr() {
		$('#card').toggleClass('flipped')
		
		$('#wrRecord').html('')	
		$('#wrRecord').append(wrRecord)

		var image = $('<img id="image" >').attr("src", questions[key][index].image)

		$('#imagebox').html('')
		$('#imagebox').append(image)

		$('#answer').html('')
		$('#answer').append('Answer: ', questions[key][index].answer)

		if (wrRecord === 'Correct!') {
			$('#c').removeClass('red')
			$('#c').addClass('green')
		}
		else if (wrRecord === 'Wrong!') {
			$('#c').removeClass('green')
			$('#c').addClass('red')
		}

		index++;
				
}


var gif = $("<img class='box3'>").attr("src", response.data[i].images.fixed_width.url)
    			var still = $("<img class='box3'>").attr("src", response.data[i].images.fixed_width_still.url)
    			var rating = $("<h1 class='rating'>").append(response.data[i].rating)
    			var div2 = $("<div class='gif box3").append(rating).append(gif)
    			var div1 = $("<div class='wrap'>").append(still).append(div2);
    			$('.column1').append(div1)


})

