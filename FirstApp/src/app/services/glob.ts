import { Injectable } from '@angular/core';

Injectable()
export class Globals{
    uname:string;

    set(obj){
        this.uname=obj;
    }

    get(){
        return this.uname;
    }
}