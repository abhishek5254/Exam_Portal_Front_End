import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid;
  questions;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {

    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
      
        console.log(this.questions);
        this.startTimer();

      },
      (error) => {
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit Quiz',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
       this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {

      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }

    }, 1000)
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} minutes : ${ss} seconds`;
  }

  evalQuiz()
  {

    // calling server to evaluate questions and answers 

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
       // console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
        
      }
    );
    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // //console.log("Correct Answers " + this.correctAnswers);
  }

  printPage()
  {
    window.print();
  }

}
