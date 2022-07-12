import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId;
  qTitle;
  question = {
    quiz: {

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qId; 

  }

  formSubmit() {
    //alert('testing');
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open('Content required!!', '', {
        duration: 3000,
      });
      return;
    }

    else if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open('At least two options required!!', '', {
        duration: 3000,
      });
      return;
    }

    else if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this._snack.open('At least two options required!!', '', {
        duration: 3000,
      });
      return;
    }

    else if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snack.open('Answer is required!!', '', {
        duration: 3000,
      });
      return;
    }


    // form submit
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        // Swal.fire('Question Added', 'Successfully', 'success');
        Swal.fire({
          title: 'Question Added Successfully',
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
        
        this.question.content = '',
          this.question.option1 = '',
          this.question.option2 = '',
          this.question.option3 = '',
          this.question.option4 = '',
          this.question.answer = ''
      },
      (error) => {
        Swal.fire('Error while adding', 'Adding error', 'error');
      }
    );
  }

}
