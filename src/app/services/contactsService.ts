import { inject, Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Auth } from './auth';

@Service()
export class ContactsService {

authService = inject(Auth);

readonly contactList = signal<Contact[]>([]);


agregarContacto(nuevoContacto:Contact){
  // const nuevoId = this.contactList.length;
  // this.contactList.push({
  //   id: nuevoId,
  //   firstName: nuevoContacto.firstName,
  //   lastName: nuevoContacto.lastName,
  //   number: nuevoContacto.number,
  //   isFavorite: false,
  //   groupIds: []
  // })
  // return nuevoId;
  // console.log(this.contactList)
}

async getContacts():Promise<Contact[]>{
  const res = await fetch("http://localhost:5000/api/contacts",{
    method: "GET",
    headers: {
        Authorization: "Bearer "+this.authService.token
    },
    
  })
  if (!res.ok) return [];
  const contactos = await res.json()
  this.contactList.set(contactos);
  console.log(this.contactList)

  return contactos;
}

// Busca un contacto desde un ID
getContactById(id:number){
  //const contactoEncontrado = this.contactList.find(contact => contact.id === id);
  //return contactoEncontrado;
}

deleteContact(id:number){
  //this.contactList = this.contactList.filter(c => c.id !== id);
}

editContact(contact:Contact){
  //this.contactList = this.contactList.map(c => {
  //  if(c.id === contact.id) return contact;
  //  return c
  //});
}


}
