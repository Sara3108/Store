import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/apiServices/products.service';
import { ProductsModule } from '../../products.module';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productId: number;
  subscription: Subscription[] = [];
  isLoading: boolean;
  product: ProductsModule;

  constructor(private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) {
    route.params.subscribe((params) => {
      if (params['id']) {
        this.productId = params['id'];
      } else {
        router.navigate(['/products/list']);
      }
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  /** get product details by id */
  getProductDetails(): void {
    this.isLoading = true;
    this.subscription.push(
      this.productsService.getProductDetails(this.productId).subscribe(res => {
        this.isLoading = false;
        if (res) {
          this.product = res;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
