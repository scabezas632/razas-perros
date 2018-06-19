import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], args: string) {
    if (!items) {
      return null;
    }
    if (!args) {
      return items;
    }

    args = args.toLowerCase();

    return items.filter( it => {
      return it.nombre.toLowerCase().includes( args ) ||
      it.pais.toLowerCase().includes( args ) ||
      it.tamanio.toLowerCase().includes( args );
    });

  }

}
