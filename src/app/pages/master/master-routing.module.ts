import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CityviewComponent } from './city/cityview/cityview.component';
import { CitylistComponent } from './citylist/citylist.component';
import { CountryComponent } from './country/country.component';
import { CountryviewComponent } from './country/countryview/countryview.component';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponviewComponent } from './coupon/couponview/couponview.component';
import { CouponlistComponent } from './couponlist/couponlist.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyviewComponent } from './currency/currencyview/currencyview.component';
import { CurrencylistComponent } from './currencylist/currencylist.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { DriverComponent } from './driver/driver.component';
import { DriverlistComponent } from './driverlist/driverlist.component';
import { FaqComponent } from './faq/faq.component';
import { FaqcategoryComponent } from './faqcategory/faqcategory.component';
import { FaqcategorylistComponent } from './faqcategorylist/faqcategorylist.component';
import { FaqlistComponent } from './faqlist/faqlist.component';
import { LanguageComponent } from './language/language.component';
import { LanguageviewComponent } from './language/languageview/languageview.component';
import { LanguagelistComponent } from './languagelist/languagelist.component';
import { LanguagetranslationComponent } from './languagetranslation/languagetranslation.component';
import { LanguagetranslationlistComponent } from './languagetranslationlist/languagetranslationlist.component';
import { NormalpriceComponent } from './normalprice/normalprice.component';
import { NormalviewComponent } from './normalprice/normalview/normalview.component';
import { NormalpricelistComponent } from './normalpricelist/normalpricelist.component';
import { OutstationComponent } from './outstation/outstation.component';
import { OutstationviewComponent } from './outstation/outstationview/outstationview.component';
import { OutstationpricelistComponent } from './outstationpricelist/outstationpricelist.component';
import { ProcessComponent } from './process/process.component';
import { ProcessviewComponent } from './process/processview/processview.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { PushnotificationlistComponent } from './pushnotificationlist/pushnotificationlist.component';
import { RentalComponent } from './rental/rental.component';
import { RentalviewComponent } from './rental/rentalview/rentalview.component';
import { RentallistComponent } from './rentallist/rentallist.component';
import { RentalpackageComponent } from './rentalpackage/rentalpackage.component';
import { RentalpackageviewComponent } from './rentalpackage/rentalpackageview/rentalpackageview.component';
import { RentalpackagelistComponent } from './rentalpackagelist/rentalpackagelist.component';
import { StateComponent } from './state/state.component';
import { StateviewComponent } from './state/stateview/stateview.component';
import { StatelistComponent } from './statelist/statelist.component';
import { TaxComponent } from './tax/tax.component';
import { TaxviewComponent } from './tax/taxview/taxview.component';
import { TaxlistComponent } from './taxlist/taxlist.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleviewComponent } from './vehicle/vehicleview/vehicleview.component';
import { VehiclelistComponent } from './vehiclelist/vehiclelist.component';

const routes: Routes = [
  {
    path: 'countrylist',
    component: CountrylistComponent
  },

  {
    path: 'countryadd',
    component: CountryComponent
  },
  {
    path: 'countryedit/:id',
    component: CountryComponent
  },

  {
    path: 'countryview/:id',
    component: CountryviewComponent
  },

  {
    path: 'currencylist',
    component: CurrencylistComponent
  },

  {
    path: 'currencyadd',
    component: CurrencyComponent
  },


  {
    path: 'currencyedit/:id',
    component: CurrencyComponent
  },

  {
    path: 'currencyview/:id',
    component: CurrencyviewComponent
  },

  {
    path: 'languagelist',
    component: LanguagelistComponent
  },

  {
    path: 'languageadd',
    component: LanguageComponent
  },
  {
    path: 'languageedit/:id',
    component: LanguageComponent
  },

  {
    path: 'languageview/:id',
    component: LanguageviewComponent
  },

  {
    path: 'languagetrsnslationlist',
    component: LanguagetranslationlistComponent
  },

  {
    path: 'languagetrsnslationadd',
    component: LanguagetranslationComponent
  },
  {
    path: 'languagetrsnslationedit/:id',
    component: LanguagetranslationComponent
  },

  {
    path: 'statelist',
    component: StatelistComponent
  },

  {
    path: 'stateadd',
    component: StateComponent
  },
  {
    path: 'stateedit/:id',
    component: StateComponent
  },

  {
    path: 'stateview/:id',
    component: StateviewComponent
  },

  {
    path: 'citylist',
    component: CitylistComponent
  },

  {
    path: 'cityadd',
    component: CityComponent
  },
  {
    path: 'cityedit/:id',
    component: CityComponent
  },

  {
    path: 'cityview/:id',
    component: CityviewComponent
  },

  {
    path: 'processlist',
    component: ProcesslistComponent
  },

  {
    path: 'processadd',
    component: ProcessComponent
  },
  {
    path: 'processedit/:id',
    component: ProcessComponent
  },

  {
    path: 'processview/:id',
    component: ProcessviewComponent
  },

  {
    path: 'vehiclelist',
    component: VehiclelistComponent
  },

  {
    path: 'vehicleadd',
    component: VehicleComponent
  },
  {
    path: 'vehicleedit/:id',
    component: VehicleComponent
  },

  {
    path: 'vehicleview/:id',
    component: VehicleviewComponent
  },
  {
    path: 'normalpricelist',
    component: NormalpricelistComponent
  },

  {
    path: 'normalpriceadd',
    component: NormalpriceComponent
  },
  {
    path: 'normalpriceedit/:id',
    component: NormalpriceComponent
  },

  {
    path: 'normalview/:id',
    component: NormalviewComponent
  },



  {
    path: 'outstationpricelist',
    component: OutstationpricelistComponent
  },

  {
    path: 'outstationpriceadd',
    component: OutstationComponent
  },
  {
    path: 'outstationpriceedit/:id',
    component: OutstationComponent
  },

  {
    path: 'outstationview/:id',
    component: OutstationviewComponent
  },

  {
    path: 'rentallist',
    component: RentallistComponent
  },

  {
    path: 'rentaladd',
    component: RentalComponent
  },
  {
    path: 'rentaledit/:id',
    component: RentalComponent
  },

  {
    path: 'rentalview/:id',
    component: RentalviewComponent
  },

  

  {
    path: 'rentalpackagellist',
    component: RentalpackagelistComponent
  },

  {
    path: 'rentapackageadd',
    component: RentalpackageComponent
  },
  {
    path: 'rentapackageedit/:id',
    component: RentalpackageComponent
  },


  {
    path: 'rentapackagview/:id',
    component: RentalpackageviewComponent
  },

  {
    path: 'taxlist',
    component: TaxlistComponent
  },

  {
    path: 'taxadd',
    component: TaxComponent
  },
  {
    path: 'taxedit/:id',
    component: TaxComponent
  },

  {
    path: 'taxview/:id',
    component: TaxviewComponent
  },

  {
    path: 'couponlist',
    component: CouponlistComponent
  },

  {
    path: 'couponadd',
    component: CouponComponent
  },
  {
    path: 'couponedit/:id',
    component: CouponComponent
  },

  {
    path: 'couponview/:id',
    component: CouponviewComponent
  },

  {
    path: 'customerlist',
    component: CustomerlistComponent
  },

  {
    path: 'customeradd',
    component: CustomerComponent
  },
  {
    path: 'customeredit/:id',
    component: CustomerComponent
  },

  {
    path: 'driverlist',
    component: DriverlistComponent
  },

  {
    path: 'driveradd',
    component: DriverComponent
  },
  {
    path: 'driveredit/:id',
    component: DriverComponent
  },

  {
    path: 'faqlist',
    component: FaqlistComponent
  },

  {
    path: 'faqadd',
    component: FaqComponent
  },
  {
    path: 'faqedit/:id',
    component: FaqComponent
  },

  {
    path: 'faqcategorylist',
    component: FaqcategorylistComponent
  },

  {
    path: 'faqcategoryadd',
    component: FaqcategoryComponent
  },
  {
    path: 'faqcategoryedit/:id',
    component: FaqcategoryComponent
  },
  {
    path: 'pushnotificationlist',
    component: PushnotificationlistComponent
  },
  {
    path: 'pushnotificationadd',
    component: PushnotificationComponent
  },
  {
    path: 'pushnotificationedit/:id',
    component: PushnotificationComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
