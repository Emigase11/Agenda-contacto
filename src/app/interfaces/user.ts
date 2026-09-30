import { State } from './state';

/// Espeja el UserDto de la API:
/// UserDto(int Id, string FirstName, string LastName, string Email, State State)
export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    state: State
}
