import { readFileSync } from 'node:fs';
import { Amenities, Cities, City, Housing, Rent } from '../../types/index.js';

export class TSVFileReader {
  constructor(
    private readonly filepath: string,
    private rawData = ''
  ){}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private splitString(string: string, splitter: string): string[] {
    return string.split(splitter);
  }

  private toBoolean(string: string): boolean {
    return string === 'true';
  }

  private toNumber(string: string): number {
    return Number(string);
  }

  private parseCity(city: Cities, coordinates: string): City {
    const [latitude, longitude] = this.splitString(coordinates, ';');

    return {
      name: city,
      latitude,
      longitude
    };
  }

  private parseRawData(): Rent[] {
    return this.rawData.split('\n')
      .filter((row) => row.trim().length > 0)
      .map((item) => this.parseRawDataItem(item));
  }

  private parseRawDataItem(item: string): Rent {
    const [
      name,
      description,
      publicationDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomCount,
      guestCount,
      rentalPrice,
      amenities,
      authorPath,
      commentCount,
      coordinates
    ] = item.split('\t').map((value) => value.replace(/"/g, '').trim());

    const formatted = {
      name,
      description,
      publicationDate: new Date(publicationDate),
      city: this.parseCity(city as Cities, coordinates),
      previewImage,
      photos: this.splitString(photos, ';'),
      isPremium: this.toBoolean(isPremium),
      isFavorite: this.toBoolean(isFavorite),
      rating: this.toNumber(rating),
      housingType: housingType as Housing,
      roomCount: this.toNumber(roomCount),
      guestCount: this.toNumber(guestCount),
      rentalPrice: this.toNumber(rentalPrice),
      amenities: this.splitString(amenities, ';') as Amenities[],
      authorPath,
      commentCount: this.toNumber(commentCount),
    };

    return formatted;
  }

  public read(): void {
    this.rawData = readFileSync(this.filepath, 'utf-8');
  }

  public toArray(): Rent[] {
    this.validateRawData();
    return this.parseRawData();
  }
}
