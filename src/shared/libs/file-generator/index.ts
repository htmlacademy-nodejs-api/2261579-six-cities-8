import { City, ResponseData } from '../../types/index.js';
import { generateRandomArray, generateRandomItem, generateRandomNumber } from '../utils/index.js';

export class TSVFileGenerator {
  constructor(private res: ResponseData) {

  }

  private joinArr<T>(arr: T[]): string {
    return arr.join(';');
  }

  public generate(): string {
    const randomCity = generateRandomItem(this.res.city) as City;

    const generated = {
      name: generateRandomItem(this.res.name),
      description: generateRandomItem(this.res.description),
      publicationDate: generateRandomItem(this.res.publicationDate),
      city: randomCity.name,
      previewImage: generateRandomItem(this.res.previewImage),
      photos: this.joinArr(generateRandomArray(this.res.photos, 6)),
      isPremium: generateRandomItem(this.res.isPremium),
      isFavorite: generateRandomItem(this.res.isFavorite),
      rating: generateRandomNumber(1, 5),
      housingType: generateRandomItem(this.res.housingType),
      roomCount: generateRandomNumber(1, 8),
      guestsCount: generateRandomNumber(1, 10),
      rentalPrice: generateRandomNumber(100, 100000),
      amenities: this.joinArr(generateRandomArray(this.res.amenities, 3)),
      authorPath: generateRandomItem(this.res.authorPath),
      commentCount: generateRandomNumber(1, 10),
      coordinates: this.joinArr([randomCity.latitude, randomCity.longitude])
    };

    const values = Object.values(generated);

    return values.join('\t');
  }
}
