import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ContactsService } from '../../services/contactsService';
import { Router, RouterLink } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Auth } from '../../services/auth';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-create-edit-contact',
  styleUrl: './create-edit-contact.scss',
  templateUrl: './create-edit-contact.html',
})
export class CreateEditContact implements OnInit{
  async ngOnInit(): Promise<void> {
    if(this.id()){
      const contacto = await this.contactsService.getContactById(this.id()!);
      if(contacto) {
        // El back puede devolver null en los campos opcionales
        this.newContactModel.set({
          ...contacto,
          number: contacto.number ?? '',
          company: contacto.company ?? '',
          email: contacto.email ?? '',
          description: contacto.description ?? '',
        })
        this.favoritoOriginal = contacto.isFavorite;
      }
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
    company: '',
    email: '',
    description: '',
    isFavorite: false,
    groupIds: []
  });

  // Para saber si al editar cambió el favorito
  favoritoOriginal = false;

  id = input<number>();

  formCreateContact = form(this.newContactModel, (schemaPath) => {
    required(schemaPath.firstName);
    email(schemaPath.email!);
  });

  onSubmit(event: Event) {
    event.preventDefault();

    //Editar
    if(this.id()){
      this.editarContacto()
    } else {
      this.crearContacto()
    }

  }

  async crearContacto(){
    const contactoCreado = await this.contactsService.agregarContacto(this.newContactModel());
    if(!contactoCreado) {
      this.mostrarToast("error", "No se pudo crear el contacto");
      return;
    }

    // El back siempre crea los contactos como no favoritos
    if(this.newContactModel().isFavorite) {
      await this.contactsService.toggleFavorite(contactoCreado.id);
    }

    this.mostrarToast("success", "Contacto creado");
    this.router.navigate(['/contacts', contactoCreado.id])
  }

  async editarContacto(){
    const contacto = this.newContactModel();

    if(contacto.isFavorite !== this.favoritoOriginal) {
      await this.contactsService.toggleFavorite(contacto.id);
    }

    const editado = await this.contactsService.editContact(contacto);
    if(!editado) {
      this.mostrarToast("error", "No se pudo editar el contacto");
      return;
    }

    this.mostrarToast("success", "Contacto editado");
    this.router.navigate(['/contacts', contacto.id])
  }

  mostrarToast(icon: SweetAlertIcon, title: string){
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
    }).fire({ icon, title });
  }

}
