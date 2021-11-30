import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/core/models/Product.model';
import { ProductsService } from '../../../../core/apiServices/products.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  Products: ProductModel[];
  isLoading: boolean;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  /** get all products to display them */
  getProducts(): void{
    this.isLoading = true;
    this.subscription.push(
      this.productsService.getProducts().subscribe(res => {
        this.isLoading = false;
        if(res){
          this.Products = res;
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
