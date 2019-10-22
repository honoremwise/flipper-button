import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuestGuard } from 'projects/pharmacy-pos/src/lib/importables/guards/guest-guard.service';
import { PharmacyPosDemoComponent } from './pharmacy-pos-demo/pharmacy-pos-demo.component';
const routes: Routes = [
  {path: '', component: PharmacyPosDemoComponent, canActivate: [GuestGuard]},
  // {path: '',

  // loadChildren: ()=> import('projects/pharmacy-pos/src/lib/pos/pos.module').then(m=>m.PosModule), canLoad: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
