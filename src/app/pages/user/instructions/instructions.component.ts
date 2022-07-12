import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid;
  quiz;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar,private _router:Router) { }

  ngOnInit(): void {

    this.qid=this._route.snapshot.params['qid'];
    //console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>
      {

        this.quiz=data;
        // this._snack.open('Start attempting by clicking on Start quiz','',{
        //   duration:3000,
        // });
      },
      (error)=>{
        this._snack.open('Error in loading instructions','',{
          duration:3000,
        });
      }
    );
    
  }

  startQuiz()
  {
    Swal.fire({
      title: 'Do you want to Start quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._router.navigate(['/start-quiz/'+this.qid]);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
