import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { form, FormField } from '@angular/forms/signals';
import { ContactsService } from '../../services/contactsService';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

/// Como varios campos son opcionales en Contact, el formulario usa su propia
/// versión con todos obligatorios: Signal Forms no puede bindear un input a un
/// campo que pueda ser undefined.
type ContactFormModel = Required<Contact>;

/// Mientras no haya login, los contactos nuevos se crean para este usuario
const USER_ID_POR_DEFECTO = 1;

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-create-edit-contact',
  styleUrl: './create-edit-contact.scss',
  templateUrl: './create-edit-contact.html',
})
export class CreateEditContact {

  contactsService = inject(ContactsService);
  router = inject(Router);

  /// Llega solo en la ruta contacts/:id/edit, y siempre como string
  id = input<string>();

  modoEdicion = computed(() => this.id() !== undefined);

  private contactoAEditar = computed(() => {
    const id = this.id();
    return id === undefined ? undefined : this.contactsService.getContactById(Number(id));
  });

  contactModel = linkedSignal<ContactFormModel>(() => {
    const contacto = this.contactoAEditar();
    return {
      id: contacto?.id ?? 0,
      firstName: contacto?.firstName ?? '',
      lastName: contacto?.lastName ?? '',
      address: contacto?.address ?? '',
      number: contacto?.number ?? '',
      email: contacto?.email ?? '',
      image: contacto?.image ?? '',
      company: contacto?.company ?? '',
      description: contacto?.description ?? '',
      userId: contacto?.userId ?? USER_ID_POR_DEFECTO,
      isFavorite: contacto?.isFavorite ?? false
    };
  });

  formContact = form(this.contactModel);

  onSubmit(event: Event) {
    event.preventDefault();

    const idContacto = this.modoEdicion()
      ? this.editar()
      : this.contactsService.agregarContacto(this.contactModel());

    this.mostrarToast(this.modoEdicion() ? "Contacto editado" : "Contacto creado");

    this.router.navigate(['/contacts', idContacto]);
  }

  private editar() {
    const id = Number(this.id());
    this.contactsService.editarContacto(id, this.contactModel());
    return id;
  }

  private mostrarToast(titulo: string) {
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
      title: titulo
    });
  }

}
