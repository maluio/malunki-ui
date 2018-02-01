import {Injectable}    from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthenticationService} from './authentication.service';

import 'rxjs/add/operator/toPromise';

import {Card} from './model';
import {ErrorService, Error} from "./error.service";

@Injectable()
export class CardHttpService {

    private headers: Headers;
    private apiUrl = '/cards';

    constructor(
        private http: Http,
        private errorService: ErrorService,
        private authService:AuthenticationService
    )
    {
      this.headers = new Headers(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Server-Select': 'malunki_api'
          // 'Authorization': 'Basic ' +  btoa(this.authService.getUsername() + ':' + this.authService.getPassword())
        }
      );
    }

    getCards(): Promise<Card[]> {
        return this.http.get(this.apiUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Card[])
            .catch((error) => {
                this.errorService.addError(new Error('Couldn\'t load cards'));
                return Promise.reject(error.message || error);
            });
    }

    create(card: Card): Promise<Card> {
        return this.http
            .post(this.apiUrl, JSON.stringify(card), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Card)
            .catch((error) => {
                this.errorService.addError(new Error('Couldn\'t create card'));
                return Promise.reject(error.message || error);
             });
    }

    update(card: Card): Promise<Card> {
        return this.http
            .put(this.apiUrl + '/' + card.id, JSON.stringify(card), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Card)
            .catch((error) => {
                this.errorService.addError(new Error('Couldn\'t update card'));
                return Promise.reject(error.message || error);
            });
    }

    delete(id: number): Promise<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch((error) => {
                this.errorService.addError(new Error('Couldn\'t delete card'));
                return Promise.reject(error.message || error);
            });
    }

}
