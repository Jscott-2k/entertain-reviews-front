import { Injectable } from '@angular/core';
import { IgdbImageSize } from '../shared/enums/igdb-image-size.enum';


@Injectable({
  providedIn: 'root'
})
export class IgdbImageService {
  private readonly baseUrl = 'https://images.igdb.com/igdb/image/upload/';
  constructor() {}
  getImageUrl(imageId: number | string, size: IgdbImageSize): string {
    if (size) {
      return `${this.baseUrl}${size.valueOf()}/${imageId}.jpg`;
    }
    // Default to the CoverBig size if an invalid size is provided
    return `${this.baseUrl}${IgdbImageSize.CoverBig}/${imageId}.jpg`;
  }
}