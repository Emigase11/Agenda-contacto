import { Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Service()
export class ContactsService {

  contactList = signal<Contact[]>([
    {
      id: "1",
      nombre: 'AA',
      apellido: "iiiii",
      email: 'AA@AA.com',
      numeroTelefono: '12345',
    },
    {
      id: "2",
      nombre: 'BB',
      apellido: "iiiii",
      email: 'BB@BB.com',
      numeroTelefono: '12345',
      direccion: "ABCABC"
    },
    {
      id: "aaasfa",
      nombre: 'CC',
      apellido: "iiiii",
      email: 'CC@CC.com',
      numeroTelefono: '12345',
      direccion: 'ASDFGHJ'
    },
    {
      id: "dddd",
      nombre: 'DD',
      apellido: "iiiii",
      email: 'DD@DD.com',
      numeroTelefono: '12345',
    },
    {
      id: "eeeee",
      nombre: 'EE',
      apellido: "iiiii",
      email: 'EE@EE.com',
      numeroTelefono: '12345',
    }
  ]);

  agregarContacto(nuevoContacto: Contact) {
    const nuevoId = this.generarId();
    this.contactList.update((contactos) => [
      ...contactos,
      { ...nuevoContacto, id: nuevoId }
    ]);
    return nuevoId;
  }

  /// Busca un contacto desde un ID
  getContactById(id: string) {
    const contactoEncontrado = this.contactList().find(contact => contact.id === id);
    return contactoEncontrado;
  }

  editarContacto(id: string, datos: Contact) {
    this.contactList.update((contactos) =>
      contactos.map((contacto) =>
        contacto.id === id ? { ...datos, id } : contacto
      )
    );
  }

  deleteContact(id: string) {
    this.contactList.update((contactos) => contactos.filter(c => c.id !== id));
  }

  /// Genera un id que no esté usado por ningún contacto
  private generarId() {
    let numero = this.contactList().length + 1;
    while (this.contactList().some(contacto => contacto.id === numero.toString())) {
      numero++;
    }
    return numero.toString();
  }

}
