import { PipeTransform } from '@angular/core';
export declare class Ceil implements PipeTransform {
    constructor();
    transform(value: number, limit: number): number;
}
