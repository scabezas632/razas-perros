import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDropFilesDirective } from './ng-drop-files.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgDropFilesDirective
  ],
  declarations: [
    NgDropFilesDirective
  ]
})
export class DirectivesModule { }
