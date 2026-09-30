/// Espeja el ContactDto de la API:
/// ContactDto(int Id, string FirstName, string LastName, string? Address,
///            string? Number, string? Email, string? Image, string? Company,
///            string Description, int UserId, bool IsFavorite)
export interface Contact {
    id: number
    firstName: string
    lastName: string
    address?: string
    number?: string
    email?: string
    image?: string
    company?: string
    description: string
    userId: number
    isFavorite: boolean
}
