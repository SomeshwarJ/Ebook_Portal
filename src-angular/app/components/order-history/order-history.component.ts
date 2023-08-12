import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: Product[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {

    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.products;
        var id = [];
        var products = [];
        for(var i=0;i<this.orderHistoryList.length;i++){
          if(!id.includes(this.orderHistoryList[i].id)){
            products.push(this.orderHistoryList[i]);
            id.push(this.orderHistoryList[i].id);
          }
        }
        this.orderHistoryList = products;
      }
    );
  }

}
