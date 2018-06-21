import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { SearchPipe } from './search.pipe';
import { ImagenPipe } from './imagen.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    SearchPipe,
    ImagenPipe
  ],
  declarations: [
    KeysPipe,
    SearchPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
