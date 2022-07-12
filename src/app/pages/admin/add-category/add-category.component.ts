import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:'',
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open("Title Required !!","",{
        duration:3000,
      });
      return;
    }

    // all ok
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title=''
        this.category.description=''
        // Swal.fire("Success","Category added","success");
        Swal.fire({
          title: 'Category Added Successfully',
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
      },
      (error)=>
      {
        console.log(error);
        Swal.fire("error","Server error","error");
      }
    )
  }

}
