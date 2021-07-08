let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    autoCenter: true
};

let game = new Phaser.Game(config);
let backgroundImage;
let answerImage =[];
let QuestionImage;
let QuestionText = [];
let answerNumber = 3;
let answerText =[];
let quizz;
let quizzString;
let playButton;
//let answerOk = false;
let currentQuestionIndex=0;
let starImage =[];
let resultOK =0;
let resultNO =0;
let goodAnswerSound; 
let wrongAnswerSound; 
let welcomeImage;
let menuImage;
let welcomeText;
let quizzText;
let restartImage;

// let quizz = '{"questions":[{"title": "Ma premère question","answer": ["réponse 0","Réponse 1"],"goodAnswerIndex" : 1},{ "title": "Ma deuxième question","answer": ["réponse 0", "Réponse 1"], "goodAnswerIndex" : 0}]}'

// let quizzString = '{"questions":[{"title": "Le Colosseum se trouve à : ?","answer": ["Madrid","Oslo", "Rome"],"goodAnswerIndex" : 2},{ "title": "La meilleur couleur pour se relaxer ? ","answer": ["Mauvd", "Blue", "Rouge"], "goodAnswerIndex" : 1}]}'
// let quizz =JSON.parse(quizzString);


function preload() {
    this.load.image('background', './assets/Sprites/background.png');
    this.load.image('label_1', './assets/Sprites/Label1.png')
    this.load.image('label_2', './assets/Sprites/Label2.png')
    this.load.image('labellum', './assets/Sprites/Label4.png')
    this.load.json('questions','./assets/data/Questions.json' )
    this.load.image('play', './assets/Sprites/Play.png')
    this.load.image('star', './assets/Sprites/Star.png')
    this.load.audio('goodSound', './assets/Sound/good.wav')
    this.load.audio('badSound', './assets/Sound/wrong.wav')
    this.load.image('welcome', './assets/Sprites/Windows3.png')
    this.load.image('menu', './assets/Sprites/Menu.png')
    this.load.image('restart', './assets/Sprites/Restart.png')
    loadFont("carterone", "./assets/Fonts/CarterOne.ttf");
    loadFont("skranji", "./assets/Fonts/Skranji-Bold.ttf");
}

function create() {
    

    quizz = this.cache.json.get('questions');
    console.log(quizz.questions[0].answers[2]);
    console.log(quizz.questions[1].title);
    backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0,0);
    backgroundImage.setScale(0.5);

    //welcome screen
    welcomeImage = this.add.image(300,300, 'welcome');
    welcomeImage.setScale(0.8)
    quizzText = this.add.text(275,135, "Quizz",{ fontFamily: 'carterone', fontSize: 20, color: '#000000' });
    welcomeText = this.add.text(190,230, "Play Start to play the game!!",{ fontFamily: 'skranji', fontSize: 18, color: '#000000' });
    menuImage = this.add.image(300,330, 'menu').setInteractive();
    menuImage.setScale(0.5);
    menuImage.on('pointerdown', displayGameScreen);

    restartImage = this.add.image(300,330, 'restart').setInteractive();
    restartImage.setScale(0.5);
    restartImage.on('pointerdown', restartGame);
    restartImage.setVisible(false);

    QuestionImage = this.add.image(125, 50, 'label_1');
    QuestionImage.setOrigin(0,0);
    QuestionImage.setScale(0.5);
    QuestionImage.setVisible(false);
    
    for(let i=0; i<answerNumber; i++) {
        answerImage[i] = this.add.image(300, 220 + i*110, 'label_2').setInteractive();
        answerImage[i].on('pointerdown', () => {checkAnswer(i)});
        //answerImage[i].setOrigin(0,0);
        answerImage[i].setScale(1.2);
        answerImage[i].setVisible(false)
    }
    QuestionText = this.add.text(145, 70, quizz.questions[0].title,{ fontFamily: 'carterone', fontSize: 18, color: '#00ff00' });
    //QuestionText =this.add.text(220, 80, 'Question pour toi ?',{ fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    QuestionText.setVisible(false);

    for(let i=0; i<quizz.questions[0].answers.length; i++) {
        answerText[i] = this.add.text(180, 210 + i*110, quizz.questions[0].answers[i], { fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        //answerImage[i].setOrigin(0,0);
        //answerText[i].setScale(0.8); 
        answerText[i].setVisible(false);
    }
    playButton = this.add.image(300,550,'play').setInteractive();
    playButton.setScale(0.3);
    playButton.setVisible(false);
    playButton.on('pointerdown', displayNextQuestion); 
    
    for (let i=0; i< quizz.questions.length; i++) {
        starImage[i] = this.add.image(50+i*55,600,'star');
        starImage[i].setScale(0.3);
        starImage[i].alpha= 0.0;
    }

    goodAnswerSound = this.sound.add('goodSound');
    wrongAnswerSound = this.sound.add('badSound');

     

}
    
    // answerImage[1]= this.add.image(200, 280, 'label_2');
    // answerImage[1].setOrigin(0,0);
    // labelBrownLight2.setScale(0.8);
    // let labelBrownLight3 = this.add.image(200, 380, 'label_2');
    // labelBrownLight3.setOrigin(0,0);
    // labelBrownLight3.setScale(0.8);
    
    // tweenBlinkChoice = this.tweens.add({
    //     targets: label4,
    //     alpha: 0,
    //     duration: 1000,
    //     ease: 'easeInCirc',
    //     yoyo: true,
    //     loop: -1
    //     });  

function update() {
      
}

function checkAnswer(Answer_index){
    if(Answer_index==quizz.questions[currentQuestionIndex].goodAnswerIndex){
        
        // answerOk = true;
        playButton.setVisible(true);
        goodAnswerSound.play();
        for (let i=0; i< 10; i++)
        {
            starImage[currentQuestionIndex].alpha = 1.0;
            starImage[currentQuestionIndex].setTint(0x00ff00);
        }
        
        resultOK++;    
    }
    else{
        
        // answerOk = true;
        playButton.setVisible(true);
        wrongAnswerSound.play();
        for (let i=0; i< 10; i++){
            starImage[currentQuestionIndex].alpha = 1.0;
            starImage[currentQuestionIndex].setTint(0xff0000);
        } 
        resultNO++;
    }
    for(let i=0; i<answerNumber; i++) {
        answerImage[i].disableInteractive();
        if (i== quizz.questions[currentQuestionIndex].goodAnswerIndex) answerText[i].setColor('#ff0000');
        else answerText[i].setColor('#00ff00');
    }    
    
}

function displayNextQuestion(){
    currentQuestionIndex++;
    if (currentQuestionIndex>9) {
        alert("result ok: " + resultOK + "result no: "+ resultNO )
        displayGameOver()
    }
    else {
        QuestionText.text = quizz.questions[currentQuestionIndex].title;
        for (let i=0; i<answerNumber; i++) {
            answerText[i].text = quizz.questions[currentQuestionIndex].answers[i];
        }
        playButton.setVisible(false);
    }
    for (let i =0; i<answerNumber; i++){
        answerImage[i].setInteractive();
        answerText[i].setColor("#000000");
    }
}
function displayGameScreen() {
    welcomeImage.setVisible(false);
    menuImage.setVisible(false);
    welcomeText.setVisible(false);
    quizzText.setVisible(false);
    QuestionText.setVisible(true);
    QuestionImage.setVisible(true);
    for(let i=0; i<answerNumber; i++) {
        answerImage[i].setVisible(true);
         
        answerText[i].setVisible(true);
    }
    for (let i=0; i< 10; i++) {
        starImage[i].alpha= 0.4;
        starImage[i].tint = "0xffffff";
    }
}

function restartGame() {
    alert('ciao');
    currentQuestionIndex = -1;
    displayNextQuestion();
    restartImage.setVisible(false);
    displayGameScreen();
    resultOK =0;
    resultNO =0;
}

function displayGameOver() {
    welcomeImage.setVisible(true);
    quizzText.setVisible(true);
    welcomeText.setVisible(true);
    welcomeText.text = "Vous avez un score de " + resultOK + "/10\n Presser le bouton pour recommencer";    
    restartImage.setVisible(true);

    playButton.setVisible(false);
    QuestionText.setVisible(false);
    QuestionImage.setVisible(false);

    for(let i=0; i<answerNumber; i++) {
        answerImage[i].setVisible(false);
        answerText[i].setVisible(false);
    }
    
}

function loadFont(name, url) { 
    var newFont = new FontFace(name, `url(${url})`); 
    newFont.load().then(function (loaded) { 
    document.fonts.add(loaded); 
    }).catch(function (error) { 
    return error; 
    }); 
   } 
   


// const myQuestions = [ {
//     question : "who?", 
//     answer: {
//         a: "a",
//         b: 'b',
//         c: "c"
//     },
//     correctAnswer: "c"
// }];

// {
//     "questions"=[
//     {
//     "title": "Ma premère question",
//     "answer": ["réponse 0", "Réponse 1"],
//     "goodAnswerIndex" : 1
//     },
//     {
//     "title": "Ma deuxième question",
//     "answer": ["réponse 0", "Réponse 1"],
//     "goodAnswerIndex" : 0
//     }
//     ]
//     }
    