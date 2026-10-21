import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { form, FormField } from '@angular/forms/signals';
import { ContactsService } from '../../services/contactsService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth';

@Component({
  imports: [FormField],
  selector: 'app-create-edit-contact',
  styleUrl: './create-edit-contact.scss',
  templateUrl: './create-edit-contact.html',
})
export class CreateEditContact implements OnInit{
  ngOnInit(): void {
    if(this.id()){
      const contacto = this.contactsService.getContactById(this.id()!);
      // if(contacto) {
      //   this.newContactModel.set(contacto)
      // }
    }
  }

  authService = inject(Auth);
  contactsService = inject(ContactsService);
  router = inject(Router)

  newContactModel = signal<Contact>({
    id: 0,
    firstName: '',
    lastName: '',
    number: '',
    isFavorite: false,
    groupIds: []
  });

  id = input<number>();

  // mostrarForm = effect(() => console.log(this.newContactModel()))

  formCreateContact = form(this.newContactModel);

  onSubmit(event: Event) {
    event.preventDefault();

    //Editar
    if(this.id()){
      this.editarContacto()
    } else {
      this.crearContacto()
    }
    
  }

  crearContacto(){
    const idContactoCreado = this.contactsService.agregarContacto(this.newContactModel());

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
      title: "Contacto creado"
    });

    this.router.navigate(['/contacts',idContactoCreado])
  }

  editarContacto(){
    this.contactsService.editContact(this.newContactModel())

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
      title: "Contacto editado"
    });

    this.router.navigate(['/contacts',this.newContactModel().id])
  }

}
