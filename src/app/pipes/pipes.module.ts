import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    SearchPipe
  ],
  declarations: [
    KeysPipe,
    SearchPipe
  ]
})
export class PipesModule { }
