export class Card {
    id: number;
    reviewDate: Date;
    minutesTilNextReview: number = 0;
    word: string;
    front: string;
    gender: string = null;
    images: Image[] = [];
}

export class Image {
    id: number;
    url: string;
}
