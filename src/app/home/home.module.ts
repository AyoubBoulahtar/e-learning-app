import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home/home.component'
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    AboutComponent
  ],
  imports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
