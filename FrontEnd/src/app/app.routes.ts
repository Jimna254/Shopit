import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ViewPageComponent } from './Components/view-page/view-page.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShopComponent } from './Components/shop/shop.component';
import { LandingComponent } from './Components/landing/landing.component';
import { WildcardComponent } from './Components/wildcard/wildcard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'product', component: ViewPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'shop', component: ShopComponent },
  { path: '', component: LandingComponent },
  { path: '**', component: WildcardComponent },
];
