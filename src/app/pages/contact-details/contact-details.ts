import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../interfaces/contact';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails implements OnInit {

  id = input.required<number>();
  contacto:Contact | undefined;
  contactsService = inject(ContactsService);
  router = inject(Router)

  ngOnInit(): void {
    //this.contacto = this.contactsService.getContactById(this.id())
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
      this.router.navigate(["/contacts"])
    }

}
