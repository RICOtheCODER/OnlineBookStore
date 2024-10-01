import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { B } from '@angular/cdk/keycodes';

const BASIC_URL = 'http://localhost:8300/';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL+'api/admin/category',categoryDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL+'api/admin/categories',{
      headers:this.createAuthorizationHeader(),
    })
  }
  addBooks(booksDto: any): Observable<any> {
    return this.http.post(BASIC_URL+'api/admin/book',booksDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getAllBooks(): Observable<any> {
    return this.http.get(BASIC_URL+'api/admin/books',{
      headers:this.createAuthorizationHeader(),
    })
  }

  getAllBooksByName(name:any): Observable<any> {
    return this.http.get(BASIC_URL+`api/admin/search/${name}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getNameFromId(id:number) : Observable<any>{
     return this.http.get(BASIC_URL+'api/admin/categoryName',{
      headers:this.createAuthorizationHeader(),
     })
  }
  deleteBooks(bookId: any): Observable<any> {
    return this.http.delete(BASIC_URL+`api/admin/book/${bookId}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL+'api/admin/coupons',couponDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getCoupons(): Observable<any> {
    return this.http.get(BASIC_URL+'api/admin/coupons',{
      headers:this.createAuthorizationHeader(),
    })
  }
  getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL+'api/admin/placedOrders',{
      headers:this.createAuthorizationHeader(),
    })
  }

  changeOrderStatus(orderId:number,status :string):Observable<any>{
    return this.http.get(BASIC_URL+`api/admin/order/${orderId}/${status}`,{
      headers:this.createAuthorizationHeader(),
    })
  }
  postFaq(bookId:number,faqDto:any):Observable<any>{
    return this.http.post(BASIC_URL+`api/admin/faq/${bookId}`,faqDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getBookById(bookId): Observable<any> {
    return this.http.get(BASIC_URL+`api/admin/book/${bookId}`,{
      headers:this.createAuthorizationHeader(),
    })
  }
  updateBooks(bookId:any,booksDto: any): Observable<any> {
    return this.http.put(BASIC_URL+`api/admin/book/${bookId}`,booksDto,{
      headers:this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer '+UserStorageService.getToken()
    )
  }
}
