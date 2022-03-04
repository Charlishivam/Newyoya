import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class MasterService {

  Url: string = 'http://ec2-35-154-229-37.ap-south-1.compute.amazonaws.com:8080/';
  ServerUrl: string = 'http://ec2-35-154-229-37.ap-south-1.compute.amazonaws.com:8080/api/v1/';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  getAuth(postData): Observable<any> {
    return this.http.post(`${this.Url}authenticate`, postData);
  }

  getAllCurrency(): Observable<any> {
    return this.http.get(this.ServerUrl + 'currency/list')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createCurrency(data) {
    return this.http.post(`${this.ServerUrl}currency/create`, data).toPromise();
  }

  findCurrency(id: number) {
    return this.http.get(this.ServerUrl + 'currency/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteCurrencyById(id: number) {
    return this.http.delete(this.ServerUrl + 'currency/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  currencyUpdate(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'currency/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCountry() {
    return this.http.get(`${this.ServerUrl}country/list`);
  }

  deleteCountryById(id: number) {
    return this.http.delete(this.ServerUrl + 'country/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  createCountry(data) {
    return this.http.post(`${this.ServerUrl}country/create`, data).toPromise();
  }

  upateCountry(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'country/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findCountry(id: number) {
    return this.http.get(this.ServerUrl + 'country/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getLanguage() {
    return this.http.get(`${this.ServerUrl}language/list`);
  }


  deleteLanguageById(id: number) {
    return this.http.delete(this.ServerUrl + 'language/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  createLanguage(data) {
    return this.http.post(`${this.ServerUrl}language/create`, data).toPromise();
  }

  upateLanguage(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'language/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getLanguageById(id: number) {
    return this.http.get(this.ServerUrl + 'language/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getLanguagetranslation() {
    return this.http.get(`${this.ServerUrl}languagetranslation`);
  }

  deleteLanguagetranslationById(data) {
    return this.http.post(`${this.ServerUrl}languagetranslation/languagetranslation_remove`, JSON.stringify(data)).toPromise();
  }

  createLanguagetranslation(data) {
    return this.http.post(`${this.ServerUrl}languagetranslation/language_translation_create`, data).toPromise();
  }

  upateLanguagetranslation(data) {
    return this.http.post(`${this.ServerUrl}languagetranslation/language_translation_update`, data).toPromise();
  }

  getLanguagetranslationById(data) {
    return this.http.post(`${this.ServerUrl}languagetranslation/get_single_record`, JSON.stringify(data)).toPromise();
  }

  getState() {
    return this.http.get(`${this.ServerUrl}state/list`);
  }

  deleteStateById(id) {
    return this.http.delete(this.ServerUrl + 'state/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  createState(data) {
    return this.http.post(`${this.ServerUrl}state/create`, data).toPromise();
  }


  upateState(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'state/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getStateById(id: number) {
    return this.http.get(this.ServerUrl + 'state/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getStateByCountryId(data) {
    return this.http.post(`${this.ServerUrl}state/get_state_record_by_country_id`, JSON.stringify(data)).toPromise();
  }

  getCity() {
    return this.http.get(`${this.ServerUrl}city/list`);
  }

  deleteCityById(id) {
    return this.http.delete(this.ServerUrl + 'city/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  createCity(data) {
    return this.http.post(`${this.ServerUrl}city/create`, data).toPromise();
  }

  updateCity(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'city/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCityById(id: number) {
    return this.http.get(this.ServerUrl + 'city/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getProcess() {
    return this.http.get(`${this.ServerUrl}process/list`);
  }

  deleteProcessById(id) {
    return this.http.delete(this.ServerUrl + 'process/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createProcess(data) {
    return this.http.post(`${this.ServerUrl}process/create`, data).toPromise();
  }


  updateProcess(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'process/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getProcessById(id: number) {
    return this.http.get(this.ServerUrl + 'process/' + id)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getVehicle() {
    return this.http.get(`${this.ServerUrl}vehicle/list`);
  }

  deleteVehicleById(id) {
    return this.http.delete(this.ServerUrl + 'vehicle/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createVehicle(data) {
    return this.http.post(`${this.ServerUrl}vehicle/create`, data).toPromise();
  }


  updateVehicle(id: number, data): Observable<any> {

    return this.http.put(this.ServerUrl + 'vehicle/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getVehicleById(id: number) {
    return this.http.get(this.ServerUrl + 'vehicle/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getNormalprice() {
    return this.http.get(`${this.ServerUrl}vehicleNormalPrice/list`);
  }

  deleteNormalpriceById(id:number) {
    return this.http.delete(this.ServerUrl + 'vehicleNormalPrice/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    
  }

  createNormalprice(data) {
    return this.http.post(`${this.ServerUrl}vehicleNormalPrice/create`, data).toPromise();
  }

  updateNormalprice(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'vehicleNormalPrice/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getNormalpriceById(id:number) {
    return this.http.get(this.ServerUrl + 'vehicleNormalPrice/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getOutstationprice() {
    return this.http.get(`${this.ServerUrl}vehicleOutstationPrice/list`);
  }

  deleteOutstationpriceById(id:number) {
    return this.http.delete(this.ServerUrl + 'vehicleOutstationPrice/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createOutstatioprice(data) {
    return this.http.post(`${this.ServerUrl}vehicleOutstationPrice/create`, data).toPromise();
  }

  updateOutstatioprice(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'vehicleOutstationPrice/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getOutstatiopriceById(id:number) {
    return this.http.get(this.ServerUrl + 'vehicleOutstationPrice/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getRentalprice() {
    return this.http.get(`${this.ServerUrl}rentalPackagePrice/list`);
  }

  deleteRentalpriceById(id:number) {
    return this.http.delete(this.ServerUrl + 'rentalPackagePrice/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createRentalprice(data) {
    return this.http.post(`${this.ServerUrl}rentalPackagePrice/create`, data).toPromise();
  }

  updateRentalprice(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'rentalPackagePrice/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getRentalpriceById(id:number) {
    return this.http.get(this.ServerUrl + 'rentalPackagePrice/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getRentalpackage() {
    return this.http.get(`${this.ServerUrl}rentalPackage/list`);
  }

  deleteRentalpackageById(id:number) {
    return this.http.delete(this.ServerUrl + 'rentalPackage/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createRentalpackage(data) {
    return this.http.post(`${this.ServerUrl}rentalPackage/create`, data).toPromise();
  }

  updateRentalpackage(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'rentalPackage/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRentalpackageById(id:number) {
    return this.http.get(this.ServerUrl + 'rentalPackage/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getTax() {
    return this.http.get(`${this.ServerUrl}tax/list`);
  }

  deleteTaxById(id) {
    return this.http.delete(this.ServerUrl + 'tax/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  createTax(data): Observable<any> {
    return this.http.post(this.ServerUrl + 'tax/create', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  updateTax(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'tax/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getTaxById(id) {
    return this.http.get(this.ServerUrl + 'tax/' + id)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getCoupon() {
    return this.http.get(`${this.ServerUrl}coupon/list`);
  }

  deleteCouponById(id) {
    return this.http.delete(this.ServerUrl + 'coupon/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  createCoupon(data) {
    return this.http.post(`${this.ServerUrl}coupon/create`, data).toPromise();
  }

  updateCoupon(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'coupon/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getCouponById(id: number) {
    return this.http.get(this.ServerUrl + 'coupon/' + id)
      .pipe(
        catchError(this.errorHandler)
      )

  }


  getCustomer() {
    return this.http.get(`${this.ServerUrl}customer`);
  }

  deleteCustomerById(data) {
    return this.http.post(`${this.ServerUrl}customer/customer_remove`, JSON.stringify(data)).toPromise();
  }

  createCustomer(data) {
    return this.http.post(`${this.ServerUrl}customer/customer_create`, data).toPromise();
  }

  updateCustomer(data) {
    return this.http.post(`${this.ServerUrl}customer/customer_update`, data).toPromise();
  }

  getCustomerById(data) {
    return this.http.post(`${this.ServerUrl}customer/get_single_record`, JSON.stringify(data)).toPromise();
  }

  getDriver() {
    return this.http.get(`${this.ServerUrl}driver`);
  }

  deleteDriverById(data) {
    return this.http.post(`${this.ServerUrl}driver/driver_remove`, JSON.stringify(data)).toPromise();
  }

  createDriver(data) {
    return this.http.post(`${this.ServerUrl}driver/driver_create`, data).toPromise();
  }

  updateDriver(data) {
    return this.http.post(`${this.ServerUrl}driver/driver_update`, data).toPromise();
  }

  getDriverById(data) {
    return this.http.post(`${this.ServerUrl}driver/get_single_record`, JSON.stringify(data)).toPromise();
  }

 

  getFaq() {
    return this.http.get(`${this.ServerUrl}faq/list`);
  }

  deleteFaqById(id) {
    return this.http.delete(this.ServerUrl + 'faq/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  createFaq(data) {
    return this.http.post(`${this.ServerUrl}faq/create`, data).toPromise();
  }

  updateFaq(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'faq/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getFaqById(id: number) {
    return this.http.get(this.ServerUrl + 'faq/' + id)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getFaqcategory() {
    return this.http.get(`${this.ServerUrl}faqCategory/list`);
  }

  deleteFaqcategoryById(id: number) {
    return this.http.delete(this.ServerUrl + 'faqCategory/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  createFaqcategory(data) {
    return this.http.post(`${this.ServerUrl}faqCategory/create`, data).toPromise();
  }

  updateFaqcategory(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'faqCategory/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getFaqcategoryById(id: number) {
    return this.http.get(this.ServerUrl + 'faqCategory/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getpushNotification() {
    return this.http.get(`${this.ServerUrl}pushNotification/list`);
  }

  deletepushNotificationById(id: number) {
    return this.http.delete(this.ServerUrl + 'pushNotification/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  createpushNotification(data) {
    return this.http.post(`${this.ServerUrl}pushNotification/create`, data).toPromise();
  }

  updatepushNotification(id: number, data): Observable<any> {
    return this.http.put(this.ServerUrl + 'pushNotification/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getpushNotificationById(id: number) {
    return this.http.get(this.ServerUrl + 'pushNotification/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }




}
