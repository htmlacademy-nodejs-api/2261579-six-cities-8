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
  latitude: string,
  longitude: string
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

export type ResponseData = {
  name: string[];
  description: string[];
  publicationDate: string[];
  photos: string[]
  city: City[];
  previewImage: string[];
  isPremium: boolean[];
  isFavorite: boolean[];
  housingType: string[];
  authorPath: string[];
  amenities: Amenities[]
};

export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
} as const;
