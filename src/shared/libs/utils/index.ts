export const generateRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomItem = <T>(arr: T[]): T => arr[generateRandomNumber(0, arr.length - 1)];

export const generateRandomArray = <T>(arr: T[], size: number): T[] => {
  const result: T[] = [];
  const uniqueItems = new Set<T>(arr);

  while (result.length < size && result.length < uniqueItems.size) {
    const randomItem = generateRandomItem(arr);

    if (!result.includes(randomItem)) {
      result.push(randomItem);
    }
  }

  return result;
};

