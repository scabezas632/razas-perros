import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { FilterPipe } from './filter.pipe';
import { ImagenPipe } from './imagen.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    FilterPipe,
    ImagenPipe
  ],
  declarations: [
    KeysPipe,
    FilterPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
