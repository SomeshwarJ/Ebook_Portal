import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        var data = data;
        var sem = [];
        var sub = [];
        var dep = [];
        for(var i=0;i<data.length;i++){
          data[i].size = 0;
          if(data[i].type == "SUB"){
            sub.push(data[i]);
          }else if(data[i].type == "SEM"){
            sem.push(data[i]);
          }else if(data[i].type == "DEP"){
            dep.push(data[i]);
          }
        }
        sub[0].size =sub.length;
        sem[0].size =sem.length;
        dep[0].size =dep.length; 
        this.productCategories = [...sub, ...sem, ...dep];
      }
    );
  }

}
