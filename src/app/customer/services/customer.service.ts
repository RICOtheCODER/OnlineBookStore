import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Observable } from 'rxjs';
import { B } from '@angular/cdk/keycodes';

const BASIC_URL = 'http://localhost:8300/';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/books', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllBooksByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(bookId: any): Observable<any> {
    const cartDto = {
      bookId: bookId,
      userId: UserStorageService.getUserId()
    };
    console.log('hellodto');
    
    return this.http.post(BASIC_URL + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getCartbyUserId(): Observable<any> {
    const userId=UserStorageService.getUserId();
    console.log('helloUserCart');
    
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code:any): Observable<any> {
    const userId=UserStorageService.getUserId();
    console.log('helloUserCart');
    
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseBookQuantity(bookId:any):Observable<any>{
    const cartDto={
      bookId:bookId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL+`api/customer/addition`,cartDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  decreaseBookQuantity(bookId:any):Observable<any>{
    const cartDto={
      bookId:bookId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL+`api/customer/deduction`,cartDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  placeOrder(orderDto:any): Observable<any> {
    console.log(orderDto);
    
    orderDto.userId =UserStorageService.getUserId();
    console.log("placedOrder"+orderDto.userId);
    
    return this.http.post(BASIC_URL + `api/customer/placeOrder`,orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    const userId =UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/myOrders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getOrderedBooks(orderId:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  private createAuthorizationHeader(): HttpHeaders {
    console.log('Usertoken' + UserStorageService.getToken());

    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
interface CartItemResponse {
  bookId: number;
  userId: number;
}