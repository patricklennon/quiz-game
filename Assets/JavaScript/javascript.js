//function that hides the start button and show questions
$(document).ready(function(){
	
	
	var panel = $("#questions-container");
	var countStartNumber = 30;
	
	
	
	//questions and answers
	
	var questions = [{
		question: "Which of these movies was not directed by Alfred Hitchcock?",
		choices: ["North By Northwest", "The Shining","Psycho", "The Birds"],
		correctAnswer: "The Shining",
		image: "assets/images/the-shinning.gif"
	},{
		question: "Who directed the infamous film, Pan's Labyrinth?",
		choices: ["Guillermo Del Toro", "Wes Craven", "Dario Argento", "John Carpenter"],
		correctAnswer: "Guillermo Del Toro",
		image: "assets/images/pans-labyrinth.gif"
	},{
		question: "What year did the exorcist come out?",
		choices: ["1976", "1973", "1974", "1975"],
		correctAnswer: "1973",
		image: "assets/images/the-exorcist.gif"
	},{
		question: "Which horror movie featured a satanic cult trying to give birth to the anti-christ?",
		choices: ["The Hills Have Eyes", "The Texas Chainsaw Massacre", "The Last House On The Left", "Rosemary's Baby"],
		correctAnswer: "Rosemary's Baby",
		image: "assets/images/rosemarys-baby.gif"
	},{
		question: "Which of these killers appeared in the movie Psycho?",
		choices: ["The Zodiac Killer", "Ghostface", "Norman Bates", "Candyman"],
		correctAnswer: "Norman Bates",
		image: "assets/images/norman-bates.gif"
	},{
		question: "What was Freddy Krueger convicted of before he was murdered?",
		choices: ["Grand Theft Auto","Child Homicide", "Burglary", "Attempted Homicide"],
		correctAnswer: "Child Homicide",
		image: "assets/images/freddy-krueger.gif"
	}];
	
	
	// Variable to hold our setInterval
	var timer;
	
	var game = {
		questions: questions,
		counter: countStartNumber,
		currentQuestion: 0,
		correct: 0,
		incorrect: 0,
		
		countdown: function(){
			
			game.counter--;
			$("counter-number").text(game.counter);
			if (game.counter === 0){
				$("#questions-container").html("<h3>Time Up</h3>");
				game.timeUp();
			}
		},
		
		loadQuestion: function(){
			timer = setInterval(game.countdown, 3000);
			
			$("#questions-container").html("<h2>" + questions[this.currentQuestion].question + "</h2>");
			for ( var i = 0; i < questions[this.currentQuestion].choices.length; i++){
				$("#questions-container").append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].choices[i] + "'>" + questions[this.currentQuestion].choices[i] + "</button>");
			}
			
			
			
		},
		
		nextQuestion: function(){
			game.counter = countStartNumber;
			$("#counter-number").text(game.counter);
			game.currentQuestion++;
			game.loadQuestion();
		},
		
		timeUp: function(){
			
			clearInterval(timer);
			
			$("#counter-number").html(game.counter);
			panel.html("<h2>Out of Time!</h2>");
			panel.append("<h3> The corret answer was: " + questions[this.currentQuestion].correctAnswer);
			panel.append("<img src='" + questions[this.currentQuestion].image + "'/>");
			game.results();
		},
		
		results: function(){
			
			clearInterval(timer);
			
			panel.html("<h2>Let's check your results</h2>");
			
			$("#counter-number").text(game.counter);
			
			panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
			panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3");
			panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
			panel.append("<button id='start-over-button'> Start Over</button>");
		},
		
		clicked: function(event){
			
			clearInterval(timer);
			if($(event.target).attr('data-name') === questions[this.currentQuestion].correctAnswer){
				this.answeredCorrectly();
			} else {
				this.answeredIncorrectly();
			}
			
		},
		
		answeredIncorrectly: function(){
			game.incorrect++;
			clearInterval(timer);
			
			panel.html("<h2>Nope!</h2>");
			panel.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
			panel.append("<img src='" + questions[this.currentQuestion].image + "'/>");
			
			if(game.currentQuestion === questions.length - 1){
				setTimeout(game.results, 3000);
			} else {
				setTimeout(game.nextQuestion, 3000);
			}
		},
		
		answeredCorrectly: function(){
			game.correct++;
			clearInterval(timer);
			
			panel.html("<h2>Correct!</h2>");
    		panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    		if (game.currentQuestion === questions.length - 1) {
			  setTimeout(game.results, 3000);
			}
			else {
			  setTimeout(game.nextQuestion, 3000);
			}
			
		},
		
		reset: function(){
			this.currentQuestion = 0;
			this.counter = countStartNumber;
			this.correct = 0;
			this.incorrect = 0;
			this.loadQuestion();
			
		}
		
		
	};
	
	$("#next-question").on("click", function(){
		game.nextQuestion();
		console.log(game.nextQuestion());
		
	});
	
	$(document).on("click", "#start-button", function(){
		$("#counter-number").append(countStartNumber);
		$("#header").hide();
		$("#questions-container").css("display", "block");
		game.loadQuestion();
	});
	
	$(document).on("click", "#start-over-button", function(){
		game.reset();
	});
	
	$(document).on("click", ".answer-button", function(e) {
  		game.clicked(e);
	});	
	
	$(document).on("click", "#start", function() {
  $("#counter").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
});