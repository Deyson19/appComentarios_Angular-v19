export class ImageHelper {
  constructor() {}
  private static readonly images: string[] = [
    'https://cdn.pixabay.com/photo/2019/10/21/12/01/newspapers-4565916_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/12/02/21/43/writer-7631703_960_720.png',
    'https://cdn.pixabay.com/photo/2017/08/05/22/43/newspaper-2586311_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/08/13/23/13/news-1591767_1280.jpg',
  ];
  private static readonly avatars: string[] = [
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(29).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp',
  ];

  private static getIndex(elements: string[]): number {
    let random = Math.random();
    let item = Math.floor(random * elements.length);
    return item;
  }

  public static getImages(): string {
    let image = this.getIndex(this.images);
    return this.images[image];
  }
  public static getAvatar(): string {
    return this.avatars[this.getIndex(this.avatars)];
  }
}
