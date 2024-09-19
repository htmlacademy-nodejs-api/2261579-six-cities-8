import { createReadStream } from 'node:fs';
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

  public async read(): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(this.filepath, { encoding: 'utf-8', highWaterMark: 16 * 1024 });
      let lineCount = 0;

      stream.on('data', (chunk: string) => {
        this.rawData += chunk;
        lineCount += chunk.split('\n').length - 1;
      });

      stream.on('end', () => {
        console.log(`${lineCount} lines were imported`);
        resolve();
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

  public toArray(): Rent[] {
    this.validateRawData();
    return this.parseRawData();
  }
}
