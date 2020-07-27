import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public busy = false;
  //usado para dar get async
  //public products$: Observable<Product[]>; 
  public products: Product[];
  
  constructor(private service: DataService) { }

  ngOnInit() {
    this.busy = true;
   
    //this.products$ = this.data.getProducts();

    this.service.getProducts().subscribe(
      (data: any) =>{
        this.busy = false;
        this.products = data;       
      }, (err) =>{
        this.busy = false;
      }
    )    
  }

}
