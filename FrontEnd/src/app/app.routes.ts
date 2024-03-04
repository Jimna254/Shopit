import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AppComponent } from './app.component';
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

export const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
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
];
