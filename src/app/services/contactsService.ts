import { Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Service()
export class ContactsService {

  contactList = signal<Contact[]>([
    {
      id: 1,
      firstName: 'Ana',
      lastName: 'Gómez',
      address: 'Av. Corrientes 1234, CABA',
      number: '+54 11 4567-8901',
      email: 'ana.gomez@example.com',
      company: 'Estudio Gómez & Asoc.',
      description: 'Contadora del estudio, contacto para facturación.',
      userId: 1,
      isFavorite: false
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Fernández',
      address: 'Calle Falsa 123, Rosario',
      number: '+54 11 4789-2345',
      email: 'bruno.fernandez@example.com',
      company: 'Logística del Litoral',
      description: 'Responsable de envíos al interior.',
      userId: 1,
      isFavorite: false
    },
    {
      id: 3,
      firstName: 'Carla',
      lastName: 'Ruiz',
      address: 'Bv. San Juan 456, Córdoba',
      number: '+54 351 622-1187',
      email: 'carla.ruiz@example.com',
      company: 'Nube Sur',
      description: 'Diseñadora UX, trabaja en el rediseño del sitio.',
      userId: 1,
      isFavorite: false
    },
    {
      id: 4,
      firstName: 'Diego',
      lastName: 'Martínez',
      address: 'Av. Las Heras 789, Mendoza',
      number: '+54 261 415-9032',
      email: 'diego.martinez@example.com',
      company: 'Andes Software',
      description: 'Desarrollador backend, referente de la API.',
      userId: 1,
      isFavorite: false
    },
    {
      id: 5,
      firstName: 'Elena',
      lastName: 'Sosa',
      address: 'Calle 7 N° 1020, La Plata',
      number: '+54 221 483-5566',
      email: 'elena.sosa@example.com',
      company: 'Municipalidad de La Plata',
      description: 'Contacto administrativo para trámites.',
      userId: 1,
      isFavorite: false
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
  getContactById(id: number) {
    const contactoEncontrado = this.contactList().find(contact => contact.id === id);
    return contactoEncontrado;
  }

  editarContacto(id: number, datos: Contact) {
    this.contactList.update((contactos) =>
      contactos.map((contacto) =>
        contacto.id === id ? { ...datos, id } : contacto
      )
    );
  }

  deleteContact(id: number) {
    this.contactList.update((contactos) => contactos.filter(c => c.id !== id));
  }

  /// Genera un id que no esté usado por ningún contacto
  private generarId() {
    let numero = this.contactList().length + 1;
    while (this.contactList().some(contacto => contacto.id === numero)) {
      numero++;
    }
    return numero;
  }

}
