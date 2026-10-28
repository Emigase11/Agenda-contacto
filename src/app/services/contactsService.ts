import { inject, Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Auth } from './auth';

@Service()
export class ContactsService {

authService = inject(Auth);

readonly contactList = signal<Contact[]>([]);


  async agregarContacto(nuevoContacto:Contact):Promise<Contact | null>{

const res = await fetch("http://localhost:5000/api/contacts",{
    method: "POST",
    headers: {
        "content-type" : "application/json",
        "authorization": "Bearer "+this.authService.token
    },
    body : JSON.stringify(nuevoContacto)
  })
  if(!res.ok) return null;

  const nuevoContactoBack:Contact = await res.json();
  this.contactList.update(value => [...value,nuevoContactoBack])
  return nuevoContactoBack;


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
  async getContactById(id:number){
  const res = await fetch("http://localhost:5000/api/contacts/"+id,{
    method: "GET",
    headers: {
        Authorization: "Bearer "+this.authService.token
    },
  })
  if (!res.ok) return null;
  const contacto = await res.json()
  return contacto;
}

  async deleteContact(id:number){
  const res = await fetch("http://localhost:5000/api/contacts/"+id,{
    method: "DELETE",
    headers: {
        "content-type" : "application/json",
        "authorization": "Bearer "+this.authService.token
    },
  })
  if(!res.ok) return false;
  this.contactList.update(value => value.filter(c => c.id !== id))
  return true;
}

  async editContact(contact:Contact){
  const res = await fetch("http://localhost:5000/api/contacts/"+contact.id,{
    method: "PUT",
    headers: {
        "content-type" : "application/json",
        "authorization": "Bearer "+this.authService.token
    },
    body : JSON.stringify(contact)
  })
  if(!res.ok) return false;

  // El PUT devuelve 204 (sin body), así que actualizamos la lista con lo que mandamos
  this.contactList.update(value => value.map(c => c.id === contact.id ? contact : c))
  return true;

}

// El back no guarda isFavorite al crear/editar: hay que usar este endpoint, que invierte el estado
  async toggleFavorite(id:number){
  const res = await fetch("http://localhost:5000/api/contacts/"+id+"/favorite",{
    method: "POST",
    headers: {
        "authorization": "Bearer "+this.authService.token
    },
  })
  if(!res.ok) return false;
  this.contactList.update(value => value.map(c => c.id === id ? {...c, isFavorite: !c.isFavorite} : c))
  return true;
}


}
