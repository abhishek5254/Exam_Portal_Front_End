import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
    qid:12,
    title:"Java",
    description:"Java programming",
    maxMarks:"200",
    numberOfQuestions:20,
    active:'',
    category:{
      title: "Programming",
    },
  },
  {
    qid:12,
    title:"Java",
    description:"Java programming",
    maxMarks:"200",
    numberOfQuestions:20,
    active:'',
    category:{
      title: "Programming",
    },
  }
]


  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

this._quiz.quizzes().subscribe(
  (data:any)=>
  {
    this.quizzes=data;
    console.log(this.quizzes);
  },
  (error)=>
  {
    console.log(error);
    Swal.fire("Error !!","Data loading error..","error");
  }

)

  }

  // to delete quiz
  deleteQuiz(qid)
  {

    Swal.fire(
      {
        icon:'info',
        title:'Do you want to delete the quiz',
        confirmButtonText:'Delete',
        showCancelButton:true,

      }
    ).then((result)=>{
      if(result.isConfirmed)
      {
        this._quiz.deleteQuiz(qid).subscribe(
          (data)=>
          {
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
            Swal.fire("Success",'Quiz deleted',"success");
          },
          (error)=>
          {
            Swal.fire("Error in deleting quiz",'Error',"error");
          }
          );
      }
    })

    // this._quiz.deleteQuiz(qid).subscribe(
    // (data)=>
    // {
    //   this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
    //   Swal.fire("Success",'Quiz deleted',"success");
    // },
    // (error)=>
    // {
    //   Swal.fire("Error in deleting quiz",'Error',"error");
    // }
    // );
    
  }

}
