import { Component, OnInit } from '@angular/core';

import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { Purchase } from 'src/app/common/purchase';
@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  MembersPageComponent : FormGroup;
  subjects: ProductCategory[];
  semesters: ProductCategory[];
  departments: ProductCategory[];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, 
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        var data = data;
        var sem = [];
        var sub = [];
        var dep = [];
        for(var i=0;i<data.length;i++){
          if(data[i].type == "SUB"){
            sub.push(data[i]);
          }else if(data[i].type == "SEM"){
            sem.push(data[i]);
          }else if(data[i].type == "DEP"){
            dep.push(data[i]);
          }
        }
        this.subjects = sub;
        this.semesters = sem;
        this.departments = dep;
      }
    );
    this.MembersPageComponent = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(10), 
                               Luv2ShopValidators.notOnlyWhitespace]),

        lastName:  new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(20), 
                               Luv2ShopValidators.notOnlyWhitespace]),
                               
        subject: new FormControl('', [Validators.required]),
                               
        semester: new FormControl('', [Validators.required]),
                               
        department: new FormControl('', [Validators.required]),
        
        price: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}')]),

        imageurl: new FormControl('', 
                              [Validators.required, 
                               Luv2ShopValidators.notOnlyWhitespace]),
                                                    
        })
    });
  }
  get firstName() { return this.MembersPageComponent.get('customer.firstName'); }
  get lastName() { return this.MembersPageComponent.get('customer.lastName'); }
  get subject() { return this.MembersPageComponent.get('customer.subject'); }
  get semester() { return this.MembersPageComponent.get('customer.semester'); }
  get department() { return this.MembersPageComponent.get('customer.department'); }
  get price() { return this.MembersPageComponent.get('customer.price'); }
  get imageurl() { return this.MembersPageComponent.get('customer.imageurl'); }
  
  
  onSubmit() {
    if (this.MembersPageComponent.invalid) {
      this.MembersPageComponent.markAllAsTouched();
      return;
    }
    let purchase = new Purchase();
    let  product = new Product();
    var temp  = this.MembersPageComponent.controls['customer'].value;
    product.name = JSON.parse(JSON.stringify(temp.firstName));
    product.description = JSON.parse(JSON.stringify(temp.lastName));
    product.subject = JSON.parse(JSON.stringify(temp.subject));
    product.semester = JSON.parse(JSON.stringify(temp.semester));
    product.department = JSON.parse(JSON.stringify(temp.department));
    product.unitPrice = parseFloat(temp.price);
    product.imageUrl = JSON.parse(JSON.stringify(temp.imageurl));
    purchase.product = product;

    this.checkoutService.addBook(purchase).subscribe({
      next: response => {
        alert(`uploaded successfully`);
        this.MembersPageComponent.reset();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );
  }
}
