import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IProductModel } from 'src/app/interfaces/mybank/product-model.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {

  constructor(private readonly _http: HttpClient) { }

  getProducts(): Observable<IProductModel[]> {
    return this._http.get<IProductModel[]>('/api/showcase/products').pipe(
      switchMap((products) => of(products)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getProductInfo(productId: number): Observable<IProductModel> {
    return this._http.get<IProductModel>(`/api/showcase/product/${productId}`).pipe(
      switchMap((product) => of(product)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
