import {Injectable}    from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from "rxjs";

@Injectable()

export class Error {

    constructor(public readonly message: string){};
}

export class ErrorService {
    private _errors: BehaviorSubject<Error[]> = new BehaviorSubject([]);
    public readonly errors: Observable<Error[]> = this._errors.asObservable();

    addError(error: Error){
        let currentErrors = this._errors.value;
        currentErrors.push(error);
        this._errors.next(currentErrors);
    }
}
