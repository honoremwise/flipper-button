import {
  NgModule, CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { PosComponent } from "./pos/pos.component";
import { PosRoutingModule } from "./pos-routing.module";

import { CartItemComponent, CartDialog } from "./cart-item/cart-item.component";
import { ApiPosService } from "./api/api.service";

import {  HttpClientModule } from "@angular/common/http";
import { PosInfiniteScrollDirective } from './pos/pos-infinite-scroll.directive';
import { NgxsModule, NgxsModuleOptions, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { ItemCategoriesComponent } from './pos/load-item/item-categories/item-categories.component';
import { PosProductsComponent } from './pos/load-item/pos-products/pos-products.component';
import { ListItemHeaderComponent } from './pos/list-item-header/list-item-header.component';
import { BottomSheetOverviewStock } from './pos/boottom-sheet-stock-movement/bottom-sheet-of-stock.componet';
import { SelectCustomerModelComponent } from './select-customer-model/select-customer-model.component';
import { PosSearchBarComponent } from './pos-search-bar/pos-search-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../importables/material/material.module';
import { HttpModule } from '../importables/http/http.module';
import { PipeModuleModule } from '../importables/pipe-module/pipe-module.module';
import { GlobalVariables } from '../importables/global-variables';
import { DataTableModule } from '../importables/data-table/data-table/data-table.module';
import { environment } from 'src/environments/environment';
import { UiModule } from '../importables/ui/ui.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../importables/core.module';
import { PrintOutModule } from '../importables/print-out/print-out.module';
import { CustomersModule } from '../importables/customers/customers.module';
import { TranslationsModule } from '../importables/translations/translations.module';
import { PosCateoriesState } from '../importables/store/states/PosCategoryStates';
import { PosStockStates } from '../importables/store/states/PosStockStates';
import { PosSearchStockStates } from '../importables/store/states/PosSearchStockStates';
import { PosOrderState } from '../importables/store/states/PosOrderStates';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See above for their effects)
    suppressErrors: false, 
    injectContainerState: false
  },
  compatibility: {
    strictContentSecurityPolicy: true
  },
  // Execution strategy overridden for illustrative purposes 
  // (only do this if you know what you are doing)
  executionStrategy: NoopNgxsExecutionStrategy
};

@NgModule({
  declarations: [
    // SalePointComponent,
    // SessionsComponent,
    PosComponent,
  //   CartItemComponent,
  //    ItemCategoriesComponent,
  //    CartDialog,
  //    BottomSheetOverviewStock,
  //    PosInfiniteScrollDirective,
  //   PosProductsComponent,
  //   ListItemHeaderComponent,
  //   SelectCustomerModelComponent,
  //   PosSearchBarComponent
  ],
  imports: [
     CommonModule,
     HttpClientModule,
      //  MaterialModule,
    //    //PosRoutingModule,
    // // CoreModule.forRoot(),
    // //   PrintOutModule,
    // //   CustomersModule,
    //    UiModule,
    // //   HttpModule,
      // PipeModuleModule,
      //  FlexLayoutModule,
    //   DataTableModule,
      // TranslationsModule,
      // NgxsModule.forFeature([
      //     PosCateoriesState,
      //    PosStockStates,
      //    PosSearchStockStates,
      //    PosOrderState
      //   ])
    ],
  exports: [
    //  SessionsComponent,
    // SalePointComponent,
    PosComponent,
    // CartDialog,
    // ItemCategoriesComponent,
    // BottomSheetOverviewStock,
    // PosInfiniteScrollDirective
  ],
  // entryComponents: [CartDialog,BottomSheetOverviewStock],
  // providers: [ApiPosService],
  bootstrap: [PosComponent]
})

export class PosModule {
      constructor(public g: GlobalVariables) {
        this.g.checkInternet();
      }
}
