export class ImageItem {
  path: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minutes: string;
};

export interface ImageResponse {
  images: ImageItem[];
  page: number;
  page_size: number
}
