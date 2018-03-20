import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-upload-route',
  templateUrl: './upload-route.component.html',
  styleUrls: ['./upload-route.component.css']
})
export class UploadRouteComponent implements OnInit {
  @ViewChild("routeFileSelection") routeFileSelection: ElementRef;
  @ViewChild("traceFileSelection") traceFileSelection: ElementRef;

  newRouteFormGroup: FormGroup;

  routeName: FormControl;
  routeDate: FormControl;  
  traceDate: FormControl;

  routeFile: File;
  traceFile: File;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) { 
    this.routeName = fb.control('', Validators.required);
    this.routeDate = fb.control(new Date());  
    this.traceDate = fb.control(new Date());    
    this.newRouteFormGroup = fb.group({
      routeName: this.routeName,
      routeDate: this.routeDate,
      traceDate: this.traceDate
    })
  }
  
  ngOnInit() {
  }

  openTraceFileSelection(){    
    this.traceFileSelection.nativeElement.click();
  }

  openRouteFileSelection(){    
    this.routeFileSelection.nativeElement.click();
  }

  apply() {        
    if(this.newRouteFormGroup.valid){   
      this.backend.addRoute(this.routeName.value, this.routeDate.value, this.routeFile, this.traceDate.value, this.traceFile);
      this.routeFileSelection.nativeElement.value = "";
      this.traceFileSelection.nativeElement.value = "";
      this.routeFile = undefined;
      this.traceFile = undefined;
      this.routeName.reset();
    }
  }

  onTraceFileSelection(files: FileList){
    this.traceFile = files[0];
  }

  onRouteFileSelection(files: FileList){
    this.routeFile = files[0];
  }
}
