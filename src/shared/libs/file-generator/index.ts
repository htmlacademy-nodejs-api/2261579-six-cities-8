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

    const generated = [
      generateRandomItem(this.res.name),
      generateRandomItem(this.res.description),
      generateRandomItem(this.res.publicationDate),
      randomCity.name,
      generateRandomItem(this.res.previewImage),
      this.joinArr(generateRandomArray(this.res.photos, 6)),
      generateRandomItem(this.res.isPremium),
      generateRandomItem(this.res.isFavorite),
      generateRandomNumber(1, 5),
      generateRandomItem(this.res.housingType),
      generateRandomNumber(1, 8),
      generateRandomNumber(1, 10),
      generateRandomNumber(100, 100000),
      this.joinArr(generateRandomArray(this.res.amenities, 3)),
      generateRandomItem(this.res.authorPath),
      generateRandomNumber(1, 10),
      this.joinArr([randomCity.latitude, randomCity.longitude])
    ];

    return generated.join('\t');
  }
}
