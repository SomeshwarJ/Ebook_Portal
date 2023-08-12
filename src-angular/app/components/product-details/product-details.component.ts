import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  orderHistoryList: Product[] = [];
  
  constructor(private productService: ProductService,
              private orderHistoryService: OrderHistoryService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  storage: Storage = sessionStorage;

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    var temp = this.storage.getItem('userEmail');
    var theEmail;
    if(temp!=null && temp!=undefined && temp != "undefined"){
      theEmail = JSON.parse(temp);
    }else{
      theEmail = undefined;
    }
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
    if(theEmail != null && theEmail != undefined){
      this.orderHistoryService.getOrderHistory(theEmail).subscribe(
        data => {
          this.orderHistoryList = data._embedded.products;
          var id = [];
          if(this.orderHistoryList.length > 0){
            for(var i=0;i<this.orderHistoryList.length;i++){
              if(!id.includes(this.orderHistoryList[i].id)){
                id.push(this.orderHistoryList[i].id);
              }
            }
            if(id.includes(this.product.id)){
              this.product.ordered = 1;
            }else{
              this.product.ordered = 0;
            }
          }
        }
      )
    }
    
  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }

}
