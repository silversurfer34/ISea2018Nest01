import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from '../backend/backend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload-route',
  templateUrl: './upload-route.component.html',
  styleUrls: ['./upload-route.component.css']
})
export class UploadRouteComponent implements OnInit {
  @ViewChild("routeFileSelection") routeFileSelection: ElementRef;
  @ViewChild("traceFileSelection") traceFileSelection: ElementRef;

  routeName: FormControl;
  routeDate: FormControl;  
  traceDate: FormControl;

  routeFile: File;
  traceFile: File;

  constructor(
    private backend: BackendService,
    public dialogRef: MatDialogRef<UploadRouteComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.routeName = new FormControl('', Validators.required);
    this.routeDate = new FormControl(new Date());  
    this.traceDate = new FormControl(new Date());
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
    if(!this.isFormInvalid()){  
      this.store.dispatch({
        type: 'NEW_ROUTE_INCOMING'
      }) 
      this.backend.addRoute(this.routeName.value, this.routeDate.value, this.routeFile, this.traceDate.value, this.traceFile);      
      this.close();
    }
  }

  onTraceFileSelection(files: FileList){
    this.traceFile = files[0];
  }

  onRouteFileSelection(files: FileList){
    this.routeFile = files[0];
  }

  close(): void {
    this.dialogRef.close();
  }

  isFormInvalid(){
    return !this.routeName.valid;
  }
}
