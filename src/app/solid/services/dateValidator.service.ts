import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class DateValidatorService {
    constructor() { }

    validateDate(date: string): boolean {
        let arrS = date.split('-');

        let arrN: number[] = [];
        for (let i = 0; i < arrS.length; i++) {
            arrN[i] = Number(arrS[i]);
        }

        if(arrN.length !== 3) {
            return false;
        }

        arrN[1] -= 1; 

        let d = new Date(arrN[2], arrN[0], arrN[1]);
        if (d.getFullYear() !== arrN[2] 
            || d.getMonth() !== arrN[0] 
            || d.getDate() !== arrN[1]) {
            return false;
        }

        return true;
    }
   
}