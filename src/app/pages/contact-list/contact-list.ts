import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ContactsService } from '../../services/contactsService';
import Swal from 'sweetalert2'
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-list',
  styleUrl: './contact-list.scss',
  templateUrl: './contact-list.html',
})
export class ContactList implements OnInit {
  
  contactsService = inject(ContactsService);
  authService = inject(Auth);

  ngOnInit(): void {
    this.contactsService.getContacts()
  }
  
  eliminarContacto(id:number){
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
