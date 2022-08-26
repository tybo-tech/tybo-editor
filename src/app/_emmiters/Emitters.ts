import { EventEmitter } from "@angular/core";

export class Emitters {
    static authEmmiter = new EventEmitter<boolean>();
    static dyanamicEmmiter = new EventEmitter<boolean>();
    static dataIdEmmiter = new EventEmitter<string>();
}