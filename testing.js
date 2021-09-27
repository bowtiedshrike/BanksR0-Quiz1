

function start(jQuery) {
	
var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
var quizlength = 4;

var quizlist =[
	{
	"name":"Goldman Sachs",
	"question":"Which bank helped launder money for corrupt ruler Najib Razak in Malaysia?",
	"hmask":"Goldman.png",
	},
	{
	"name":"HSBC",
	"question":"Which bank profited from a Ponzi scheme in Hong Kong while on probation for money laundering?",
	"hmask":"hsbc.png",
	},
	{
	"name":"Wells Fargo",
	"question":"Which bank had a $3 billion fake account scandal?",
	"hmask":"wellsfargo.png",
	},
	{
	"name":"Barclay's",
	"question":"Which bank froze and confiscated a customer's disability award?",
	"hmask":"barclays.png",
	},
	{
	"name":"Bank of America",
	"question":"Which bank was fined $727 million for illegal credit card practices?",
	"hmask":"BoA.png",
	},
	{
	"name":"Saloman Brothers",
	"question":"Which bank cheated on Treasury sales?",
	"hmask":"sbros.png",
	},
		{
	"name":"Deutsche Bank",
	"question":"Which bank kept Jeffrey Epstein as a client and violated the US-Iran embargo?",
	"hmask":"deutschebank.png",
	},
	{
	"name":"JP Morgan",
	"question":"Which bank was fined $461 million for enabling Madoff's ponzi scheme?",
	"hmask":"jpmorgan.png",
	},
	{
	"name":"Morgan Stanley",
	"question":"Which bank was fined $10 million for failing to comply with the Bank Secrecy Act?",
	"hmask":"morganstanley.png",
	},
	{
	"name":"Citigroup",
	"question":"Which bank was fined $70 million for ignoring OCC orders to fix their anti-money laundering system?",
	"hmask":"citi.png",
	}
]

function prepQuestionBank() {
	for(i=0; i < quizlength; i++){
		var qrnd1 = Math.random()*quizlist.length;
		qrnd1 = Math.ceil(qrnd1);
		while (qrnd1 == i || qrnd1 >= quizlist.length) {
			if(qrnd1 == i){qrnd1++};
			if(qrnd1 >= quizlist.length){qrnd1=0};
		}
		var qrnd2 = Math.random()*quizlist.length;
		qrnd2 = Math.ceil(qrnd2);
		while (qrnd2 == i || qrnd2 == qrnd1 || qrnd2 >= quizlist.length) {
			if(qrnd2 == i || qrnd2 == qrnd1){qrnd2++};
			if(qrnd2 >= quizlist.length){qrnd2=0};
		}
		var qrnd3 = Math.random()*quizlist.length;
		qrnd3 = Math.ceil(qrnd3);
		while (qrnd3 == i || qrnd3 == qrnd1 || qrnd3 == qrnd2 || qrnd3 >= quizlist.length) {
			if(qrnd3 == i || qrnd3 == qrnd1 || qrnd3 == qrnd2){qrnd3++};
			if(qrnd3 >= quizlist.length){qrnd3=0};
		}
		questionBank[i]=new Array;
		questionBank[i][0]=quizlist[i].question;
		questionBank[i][1]=quizlist[i].name;
		questionBank[i][2]=quizlist[i].hmask;
		questionBank[i][3]=quizlist[qrnd1].hmask;
		questionBank[i][4]=quizlist[qrnd2].hmask;
		questionBank[i][5]=quizlist[qrnd3].hmask;

	}
	shuffleArray(questionBank);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQuestion(){
	var rnd=Math.random()*4;
	rnd=Math.ceil(rnd);
	var q1;
	var q2;
	var q3;
	var q4;

	if(rnd==1){q1=questionBank[questionNumber][2]; q2=questionBank[questionNumber][3]; q3=questionBank[questionNumber][4];q4=questionBank[questionNumber][5];}
	if(rnd==2){q2=questionBank[questionNumber][2]; q3=questionBank[questionNumber][3]; q4=questionBank[questionNumber][4];q1=questionBank[questionNumber][5];}
	if(rnd==3){q3=questionBank[questionNumber][2]; q4=questionBank[questionNumber][3]; q1=questionBank[questionNumber][4];q2=questionBank[questionNumber][5];}
	if(rnd==4){q4=questionBank[questionNumber][2]; q1=questionBank[questionNumber][3]; q2=questionBank[questionNumber][4];q3=questionBank[questionNumber][5];}

	$(stage).append('<div class = "questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="pix"><img src="img/'+q1+'"></div><div id="2" class="pix"><img src="img/'+q2+'"></div><div id="3" class="pix"><img src="img/'+q3+'"></div><div id="4" class="pix"><img src="img/'+q4+'"></div>');

	$('.pix').click(function(){
	if(questionLock==false){questionLock=true;
	//correct answer
	if(this.id==rnd){
	$(stage).append('<div class="feedback1">CORRECT! ' + questionBank[questionNumber][1] + '</div>');
	score++;
	}
	//wrong answer
	if(this.id!=rnd){
	$(stage).append('<div class="feedback2">WRONG! It was ' + questionBank[questionNumber][1] + '</div>');
	}
	setTimeout(function(){changeQuestion()},1000);
	}})
}//display question

function changeQuestion(){

	questionNumber++;

	if(stage=="#game1"){stage2="#game1";stage="#game2";}
	else{stage2="#game2";stage="#game1";}

	if(questionNumber < numberOfQuestions){displayQuestion();}
	else{displayFinalSlide();}

	$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	$(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question

function displayFinalSlide(){
	
	$(stage).append('<div class="questionText">You have finished the quiz! Reload to play again.<br><br>Correct answers: '
		+score+'<br>Total questions: '+numberOfQuestions+'<br></div>');
	}//display final slide	
	
prepQuestionBank();
numberOfQuestions = questionBank.length;
displayQuestion();

};

$(document).ready(start);