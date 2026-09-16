import { Component, computed, inject, input } from '@angular/core';
import { ContactsService } from '../../services/contactsService';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails {

  id = input.required<string>();
  contactsService = inject(ContactsService);

  contacto = computed(() => this.contactsService.getContactById(this.id()));

}
