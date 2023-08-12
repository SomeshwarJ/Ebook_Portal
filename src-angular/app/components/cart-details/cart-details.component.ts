import { Component, OnInit } from '@angular/core';
import { iif } from 'rxjs';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  storage: Storage = sessionStorage;
  theEmail: String; 
  
  constructor(private cartService: CartService, private orderHistoryService: OrderHistoryService,) { }

  orderHistoryList: Product[] = [];
  ngOnInit(): void {
    
    this.listCartDetails();
  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    var temp = this.storage.getItem('userEmail');
    var theEmail;
    if(temp!=null && temp!=undefined && temp != "undefined"){
      theEmail = JSON.parse(temp);
      this.theEmail = theEmail;
    }else{
      theEmail = undefined;
      this.theEmail = theEmail;
    }
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
          }
          if(this.cartItems.length > 0){
            for(var i=0;i<this.cartItems.length;i++){
              if(id.includes(this.cartItems[i].id)){
                this.cartService.remove(this.cartItems[i]);
              }
            }
          }
        }
      )
    }
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
