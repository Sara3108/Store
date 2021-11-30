import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/apiServices/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  subscription: Subscription[] = [];
  success: boolean;
  error: boolean;
  isLoading: boolean;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.createForm();
  }

  /** create add product form */
  createForm(): void {
    this.productForm = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
    });
  }

  /** return controle value
   * @param controlName the name of control to return its value
   */
  returnControl(controlName: string): string {
    return this.productForm.get(controlName).value;
  }

  /** submit form by calling add product api */
  submitForm(): void {
    this.isLoading = true;
    this.subscription.push(
      this.productsService.addProduct(this.productForm.value).subscribe(res => {
        this.isLoading = false;
        if (res) {
          this.success = true;
        } else {
          this.error = true;
        }
        setTimeout(() => {
          this.success = false;
          this.error = false;
        }, 5000);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
