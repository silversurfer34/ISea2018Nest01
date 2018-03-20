import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from '../backend/backend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    if(this.isFormValid()){   
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

  close(): void {
    this.dialogRef.close();
  }

  isFormValid(){
    return !this.routeName.valid;
  }
}
