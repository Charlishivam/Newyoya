import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from './master.service';

import { MasterRoutingModule } from './master-routing.module';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { CountryComponent } from './country/country.component';
import { CurrencylistComponent } from './currencylist/currencylist.component';
import { CurrencyComponent } from './currency/currency.component';
import { LanguagelistComponent } from './languagelist/languagelist.component';
import { LanguageComponent } from './language/language.component';
import { LanguagetranslationlistComponent } from './languagetranslationlist/languagetranslationlist.component';
import { LanguagetranslationComponent } from './languagetranslation/languagetranslation.component';
import { StatelistComponent } from './statelist/statelist.component';
import { StateComponent } from './state/state.component';
import { CitylistComponent } from './citylist/citylist.component';
import { CityComponent } from './city/city.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { ProcessComponent } from './process/process.component';
import { VehiclelistComponent } from './vehiclelist/vehiclelist.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { NormalpricelistComponent } from './normalpricelist/normalpricelist.component';
import { NormalpriceComponent } from './normalprice/normalprice.component';
import { OutstationpricelistComponent } from './outstationpricelist/outstationpricelist.component';
import { OutstationComponent } from './outstation/outstation.component';
import { RentalComponent } from './rental/rental.component';
import { RentallistComponent } from './rentallist/rentallist.component';
import { RentalpackagelistComponent } from './rentalpackagelist/rentalpackagelist.component';
import { RentalpackageComponent } from './rentalpackage/rentalpackage.component';
import { TaxlistComponent } from './taxlist/taxlist.component';
import { TaxComponent } from './tax/tax.component';
import { CouponlistComponent } from './couponlist/couponlist.component';
import { CouponComponent } from './coupon/coupon.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { DriverComponent } from './driver/driver.component';
import { DriverlistComponent } from './driverlist/driverlist.component';
import { FaqComponent } from './faq/faq.component';
import { FaqlistComponent } from './faqlist/faqlist.component';
import { FaqcategoryComponent } from './faqcategory/faqcategory.component';
import { FaqcategorylistComponent } from './faqcategorylist/faqcategorylist.component';
import { PushnotificationlistComponent } from './pushnotificationlist/pushnotificationlist.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';






@NgModule({
  declarations: [
    CountrylistComponent,
    CountryComponent,
    CurrencylistComponent,
    CurrencyComponent,
    LanguagelistComponent,
    LanguageComponent,
    LanguagetranslationlistComponent,
    LanguagetranslationComponent,
    StatelistComponent,
    StateComponent,
    CitylistComponent,
    CityComponent,
    ProcesslistComponent,
    ProcessComponent,
    VehiclelistComponent,
    VehicleComponent,
    NormalpricelistComponent,
    NormalpriceComponent,
    OutstationpricelistComponent,
    OutstationComponent,
    RentalComponent,
    RentallistComponent,
    RentalpackagelistComponent,
    RentalpackageComponent,
    TaxlistComponent,
    TaxComponent,
    CouponlistComponent,
    CouponComponent,
    CustomerComponent,
    CustomerlistComponent,
    DriverComponent,
    DriverlistComponent,
    FaqComponent,
    FaqlistComponent,
    FaqcategoryComponent,
    FaqcategorylistComponent,
    PushnotificationlistComponent,
    PushnotificationComponent


  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],

  providers: [
    MasterService,
   // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   
    
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],


  
})
export class MasterModule { }




