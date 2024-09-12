export enum Cities {
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam'
}

export enum Housing {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export enum Amenities {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export type City = {
  name: Cities,
  coordinates: string[]
}

export type Rent = {
  name: string,
  description: string,
  publicationDate: Date,
  city: City,
  previewImage: string,
  photos: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  housingType: Housing,
  roomCount: number,
  guestCount: number,
  rentalPrice: number,
  amenities: Amenities[],
  authorPath: string,
  commentCount: number
};
