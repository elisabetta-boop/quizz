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
// let quizz = '{"questions":[{"title": "Ma premère question","answer": ["réponse 0","Réponse 1"],"goodAnswerIndex" : 1},{ "title": "Ma deuxième question","answer": ["réponse 0", "Réponse 1"], "goodAnswerIndex" : 0}]}'

// let quizzString = '{"questions":[{"title": "Le Colosseum se trouve à : ?","answer": ["Madrid","Oslo", "Rome"],"goodAnswerIndex" : 2},{ "title": "La meilleur couleur pour se relaxer ? ","answer": ["Mauvd", "Blue", "Rouge"], "goodAnswerIndex" : 1}]}'
// let quizz =JSON.parse(quizzString);


function preload() {
    this.load.image('background', './assets/Sprites/background.png');
    this.load.image('label_1', './assets/Sprites/Label1.png')
    this.load.image('label_2', './assets/Sprites/Label2.png')
    this.load.image('labellum', './assets/Sprites/Label4.png')
    this.load.json('questions','./assets/data/question.json' )
    
}

function create() {
    quizz = this.cache.json.get('questions');
    console.log(quizz.questions[0].answers[2]);
    console.log(quizz.questions[1].title);
    backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0,0);
    backgroundImage.setScale(0.5);
    QuestionImage = this.add.image(125, 50, 'label_1');
    QuestionImage.setOrigin(0,0);
    QuestionImage.setScale(0.5);
    
    for(let i=0; i<answerNumber; i++) {
        answerImage[i] = this.add.image(300, 220 + i*110, 'label_2').setInteractive();
        answerImage[i].on('pointerdown', () => {checkAnswer(i)});
        //answerImage[i].setOrigin(0,0);
        answerImage[i].setScale(0.8);
    }
    QuestionText = this.add.text(170, 80, quizz.questions[0].title,{ fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    //QuestionText =this.add.text(220, 80, 'Question pour toi ?',{ fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    
    for(let i=0; i<answerNumber; i++) {
        answerText[i] = this.add.text(250, 210 + i*110, quizz.questions[0].answers[i], { fontFamily: 'Arial', fontSize: 20, color: '#ab1239' });
        //answerImage[i].setOrigin(0,0);
        //answerText[i].setScale(0.8);  
    }
}
    // 
    
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
    if(Answer_index==quizz.questions[0].goodAnswerIndex){
        alert('yes');
    }
    else{
        alert('no');
    }
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
    