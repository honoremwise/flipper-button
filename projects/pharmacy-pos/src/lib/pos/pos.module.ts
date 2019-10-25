import {
  NgModule,
} from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '../importables/ui/ui.module';
import { MaterialModule } from '../importables/material/material.module';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos/pos.component';

import { ApiPosService } from './api/api.service';

@NgModule({
  declarations: [
    // SalePointComponent,
    // SessionsComponent,
    // CartItemComponent,
    // ItemCategoriesComponent,
    // CartDialog,
    // BottomSheetOverviewStock,
    // PosInfiniteScrollDirective,
    // PosProductsComponent,
    //  ListItemHeaderComponent,
    // PosSearchBarComponent,
    //  SelectTaxrateModalComponent,
    //  TaxRatesComponent,
    // CrupdateTaxRateModalComponent,
    PosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    // PosRoutingModule,
    // PrintOutModule,
    // CustomersModule,
    UiModule,
    // HttpModule,
    // PipeModuleModule,
    // FlexLayoutModule,
    // DataTableModule,
    // TranslationsModule,
    // NgxModelModule,
    NgxsModule.forRoot([
      //TODO: FIXME:
      // PosCateoriesState,
      // PosStockStates,
      // PosSearchStockStates,
      // PosOrderState
    ])
  ],
  exports: [
    // SessionsComponent,
    // SalePointComponent,
    // PosComponent,
    // CartDialog,
    // ItemCategoriesComponent,
    // BottomSheetOverviewStock,
    // PosInfiniteScrollDirective
  ],
  entryComponents: [
    // CartDialog, 
    // BottomSheetOverviewStock, 
    // SelectTaxrateModalComponent, 
    // SelectCustomerTypeModalComponent, 
    // CrupdateTaxRateModalComponent
  ],
   providers: [
     ApiPosService
    ],
  bootstrap: [
    PosComponent
  ]
})

export class PosModule {

  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: PosModule,
  //     providers: [
  //       Bootstrapper,
  //       CurrentUser,
  //       {
  //         provide: APP_CONFIG,
  //         useValue: DEFAULT_FLIPPER_CONFIG,
  //         multi: true,
  //       },
  //       {
  //         provide: HttpErrorHandler,
  //         useClass: BackendHttpErrorHandler,
  //       },
  //       {
  //         provide: APP_INITIALIZER,
  //         useFactory: init_app,
  //         deps: [Bootstrapper],
  //         multi: true,
  //       },
  //       {
  //         provide: ErrorHandler,
  //         // useFactory: ravenErrorHandlerFactory,
  //         deps: [Settings, CurrentUser],
  //       },
  //     ]
  //   };
  // }
  
  //FIXME: when you uncomment me I error out!
  // constructor(public g: GlobalVariables) {
  // this.g.checkInternet();
  // }
}
