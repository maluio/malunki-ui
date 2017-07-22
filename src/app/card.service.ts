import {CardHttpService} from './cardhttp.service';
import {Injectable}    from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

import {Card} from './card';
import {Observable} from "rxjs";

@Injectable()
export class CardService {
    private _cards: BehaviorSubject<Card[]> = new BehaviorSubject([]);
    public readonly cards: Observable<Card[]> = this._cards.asObservable();

    constructor(private cardHttpService: CardHttpService) {
    }

    loadCards(): void {
        this.cardHttpService.getCards()
            .then((cards) => {
                //convert string to Date object
                cards.forEach(
                    (c) => c.reviewDate = new Date(c.reviewDate)
                );
                cards.sort(
                  (a, b) => {return a.reviewDate < b.reviewDate ? -1 : 1}
                );
                this._cards.next(cards);
                console.log('cards loaded');
            });
    }

    getCard(id: number): Promise<Card> {
        let cards = this._cards.value;
        let card = cards.find(card => card.id == id);
        return new Promise((resolve) =>
            resolve(card)
        );
    }

    createCard(card): void {
        if (!card.front) {
            return;
        }
        this.cardHttpService.create(card)
            .then(() => this.loadCards()
            );
    }

    updateCard(card): void {
        let cards = this._cards.getValue();
        cards = cards.map((c) => {
            if (c.id == card.id) c = card;
            return c;
        });
        this._cards.next(cards);
        this.cardHttpService.update(card).then();
    }

    deleteCard(card: Card): void {
        let cards = this._cards.getValue();
        cards = cards.filter(c => c !== card);
        this._cards.next(cards);
        this.cardHttpService
            .delete(card.id)
            .then(() => this.loadCards()
            );
    }

    learnCard(card, nextReview: number): void{
      card.minutesTilNextReview = nextReview;
      card.reviewDate = new Date(Date.now() + nextReview*60000);
      this.updateCard(card);
    }
}
