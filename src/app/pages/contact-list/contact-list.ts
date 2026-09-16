import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ContactsService } from '../../services/contactsService';
import Swal from 'sweetalert2'

@Component({
  imports: [RouterLink],
  selector: 'app-contact-list',
  styleUrl: './contact-list.scss',
  templateUrl: './contact-list.html',
})
export class ContactList {

  contactsService = inject(ContactsService);

  eliminarContacto(id:string){
    this.contactsService.deleteContact(id);
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      theme: 'dark',
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Contacto eliminado"
    });
  }

}
