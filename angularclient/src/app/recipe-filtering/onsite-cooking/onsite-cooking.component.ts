import { Component, OnInit } from '@angular/core';
import { Steps } from '../model/steps';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StepsService } from '../service/steps-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-onsite-cooking',
  templateUrl: './onsite-cooking.component.html',
  styleUrls: ['./onsite-cooking.component.css']
})
export class OnsiteCookingComponent implements OnInit {

  currentIndex: number;
  currentStep: Steps;
  steps: Steps[];
  id: String;
  isDisabled: Boolean;
  private routeSub: Subscription;
  private headers = new Headers({'Content-Type': 'application/json'});



  constructor(public stepsService: StepsService,
    // private confirmDialogService: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.isDisabled = false;
    this.currentIndex = 0;

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.stepsService.findAll(this.id).subscribe(data => {
      console.log(data);
      this.steps = data.sort((a,b) => a.step_order.toString().localeCompare(b.step_order.toString()));
      if(this.steps.length > 0){
        this.currentStep = this.steps[0];
      }
    });
  }

  next(){
    
    this.currentStep = this.steps[++this.currentIndex % this.steps.length];
    if(this.currentIndex == this.steps.length - 1){
      this.isDisabled = true;
    }
  }

}
