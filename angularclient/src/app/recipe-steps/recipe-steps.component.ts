import { Component, OnInit } from '@angular/core';
import { Steps } from '../model/steps';
import { RecipeService } from '../service/recipe-service.service';
//import { ConfirmDialogService } from '../service/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
//import {  ConfirmDialog} from '../confirm-dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StepsService } from '../service/steps-service.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.css']
})
export class RecipeStepsComponent implements OnInit {

  step: Steps;
  steps: Steps[];
  delete: Number;
  id: string;
  stepsNumber: number;
  private routeSub: Subscription;
  private headers = new Headers({'Content-Type': 'application/json'});



  constructor(public stepsService: StepsService,
    // private confirmDialogService: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    let counter = 0;
    this.steps.forEach( (element, index) => {
      console.log(element, " with index in steps: ", index);
      this.step = element;
      this.stepsService.reOrder(this.step['id'], index.toString()).subscribe(result => {
          counter++;
          if(counter == this.productForm.value.stepsArray.length){
            //this.reload();
          }
      });
    });
  }


  productForm: FormGroup;

  ngOnInit() {
    
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.stepsService.findAll(this.id).subscribe(data => {
      console.log(data);
      this.steps = data.sort((a,b) => a.step_order.toString().localeCompare(b.step_order.toString()));;
      this.stepsNumber = this.steps.length > 0 ? parseInt(this.steps[this.steps.length - 1]['step_order']) : 0;
      console.log("Number of steps: " + this.stepsNumber);
    });

    /* Initiate the form structure */
    this.productForm = this.fb.group({
      
      stepsArray: this.fb.array([this.fb.group({description:'', image:'', recipeid:this.id, step_order:''})])
    })
  }

  ///////// This is new ////////
  get stepsArray() {
    return this.productForm.get('stepsArray') as FormArray;
  }

  addSellingPoint(event) {
    event.preventDefault();
    this.stepsArray.push(this.fb.group({description:'', image:'', recipeid:this.id, step_order:''}));
  }

  deleteSellingPoint(index) {
    this.stepsArray.removeAt(index);
  }

  onSubmit() {
    let counter = 0;
    this.productForm.value.stepsArray.forEach( (element) => {
      element['step_order'] = this.stepsNumber + 1;
      console.log(element);
      this.step = element;
      if(!this.step.image){
        this.step.image = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6";
      }
      this.stepsService.save(this.step).subscribe(result => {
          counter++;
          if(counter == this.productForm.value.stepsArray.length){
            this.reload();
          }
      });
      this.stepsNumber++;
    });
  }

  deleteStep(stepId: number): void {
    //sconst id = +this.route.snapshot.paramMap.get('id');
    if(confirm("Are you sure to delete ")) {
          this.stepsService.deleteById(stepId)
          .subscribe(() => this.reload());
  }
}

  reload(){
    window.location.reload();
  }

  goToStepsList() {
    this.router.navigate(['/recipesteps/' + this.id]);
  }
}
