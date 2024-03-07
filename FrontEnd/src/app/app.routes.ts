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
import { AdmindashboardComponent } from './Components/AdminComponents/admindashboard/admindashboard.component';
import { DashboardComponent } from './Components/AdminComponents/dashboard/dashboard.component';
import { AdminProductsViewComponent } from './Components/AdminComponents/admin-products-view/admin-products-view.component';
import { AdminCategoriesViewComponent } from './Components/AdminComponents/admin-categories-view/admin-categories-view.component';
import { AdminOrdersViewComponent } from './Components/AdminComponents/admin-orders-view/admin-orders-view.component';
import { AdminUsersViewComponent } from './Components/AdminComponents/admin-users-view/admin-users-view.component';
import { AdminProfileViewComponent } from './Components/AdminComponents/admin-profile-view/admin-profile-view.component';
import { AdminupdateuserComponent } from './Components/AdminComponents/adminupdateuser/adminupdateuser.component';
import { AdminupdateproductComponent } from './Components/AdminComponents/adminupdateproduct/adminupdateproduct.component';
import { AddProductComponent } from './Components/AdminComponents/add-product/add-product.component';
import { CategoryupdateComponent } from './Components/AdminComponents/categoryupdate/categoryupdate.component';
import { CreatecategoryComponent } from './Components/AdminComponents/createcategory/createcategory.component';
import { WildcardComponent } from './Components/wildcard/wildcard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdmindashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: AdminProductsViewComponent },
      { path: 'categories', component: AdminCategoriesViewComponent },
      { path: 'orders', component: AdminOrdersViewComponent },
      { path: 'users', component: AdminUsersViewComponent },
      { path: 'profile', component: AdminProfileViewComponent },
      { path: 'updateUser/:user_id', component: AdminupdateuserComponent },
      {
        path: 'updateProduct/:product_id',
        component: AdminupdateproductComponent,
      },
      {
        path: 'createProduct',
        component: AddProductComponent,
      },
      {
        path: 'updatecategory/:category_id',
        component: CategoryupdateComponent,
      },
      {
        path: 'createCategory',
        component: CreatecategoryComponent,
      },
    ],
  },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'product/:id', component: ViewPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: '', component: LandingComponent },
  { path: '**', component: WildcardComponent },
];
