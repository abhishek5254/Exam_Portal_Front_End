import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

categories=[];


quizData={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid:'',
  },
};

  constructor(private _cat:CategoryService, private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
       // console.log(this.categories);
      },
      (error)=>
      {
        console.log(error);
        Swal.fire('error!!','Error in loading data','error');
      }
    )
  }

  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      this._snack.open("title Required !!",'',{
        duration:3000,
      });
      return;
    }

    // validation
    // calling server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>
      {
        Swal.fire({
          title: 'Quiz Added Successfully',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
          cid:'',
        },
      };
    },
      (error)=>
      {
        Swal.fire('error!!','Error in adding quiz','error');
      });
  }

}
