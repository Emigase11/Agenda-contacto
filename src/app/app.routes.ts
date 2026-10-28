import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ContactList } from './pages/contact-list/contact-list';
import { ContactDetails } from './pages/contact-details/contact-details';
import { CreateEditContact } from './pages/create-edit-contact/create-edit-contact';
import { soloUserGuard } from './guards/solo-user-guard';
import { soloPublicGuard } from './guards/solo-public-guard';

export const routes: Routes = [
    {
        path:"login",
        component:Login,
        canActivate: [soloPublicGuard]
    },
    {
        path:"register",
        component:Register,
        canActivate: [soloPublicGuard]
    },
    {
        path: "contacts",
        component: ContactList,
        canActivate: [soloUserGuard]
    },
    {
        path: "contacts/create",
        component: CreateEditContact,
        canActivate: [soloUserGuard]

    },
    {
        path: "contacts/:id",
        component: ContactDetails,
        canActivate: [soloUserGuard]
    },
    {
        path: "contacts/:id/edit",
        component: CreateEditContact,
        canActivate: [soloUserGuard]

    },
    {
        path: "",
        redirectTo: "contacts",
        pathMatch: "full"
    }
];
