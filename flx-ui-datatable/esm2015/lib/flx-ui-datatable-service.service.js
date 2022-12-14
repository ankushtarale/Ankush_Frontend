/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FlxUiDatatableService } from './flx-ui-datatable.service';
import { BehaviorSubject } from 'rxjs';
export class FlxUiDataTable {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        this.behavior = new BehaviorSubject([]);
        this.flxDatatableData = this.behavior.asObservable();
        this.service.flxData.subscribe((resp) => {
            this.ChangeData(resp);
        });
    }
    /**
     *
     * @param {?} data Change table data with new data
     * @return {?}
     */
    ChangeData(data) {
        this.behavior.next(data);
    }
    /**
     * Reload data from api: void
     * @return {?}
     */
    reloadData() {
        this.service.loadFlxDataTableData(this.service.getDataUrl());
    }
    /**
     * @return {?}
     */
    abortRequest() {
        this.service.cancelLoading();
    }
}
FlxUiDataTable.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FlxUiDataTable.ctorParameters = () => [
    { type: FlxUiDatatableService }
];
function FlxUiDataTable_tsickle_Closure_declarations() {
    /** @type {?} */
    FlxUiDataTable.prototype.behavior;
    /** @type {?} */
    FlxUiDataTable.prototype.flxDatatableData;
    /** @type {?} */
    FlxUiDataTable.prototype.service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS1zZXJ2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbHgtdWktZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2ZseC11aS1kYXRhdGFibGUtc2VydmljZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFFO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFFO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFFbEQsTUFBTTs7OztJQUdGLFlBQW9CLE9BQThCO1FBQTlCLFlBQU8sR0FBUCxPQUFPLENBQXVCO3dCQUZqQixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1FBRTNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQU1ELFVBQVUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBS00sVUFBVTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFFOzs7OztJQUczRCxZQUFZO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBRTs7OztZQTFCckMsVUFBVTs7OztZQUZGLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnIDtcbmltcG9ydCB7IEZseFVpRGF0YXRhYmxlU2VydmljZSB9IGZyb20gJy4vZmx4LXVpLWRhdGF0YWJsZS5zZXJ2aWNlJyA7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZseFVpRGF0YVRhYmxle1xuICAgIGJlaGF2aW9yOiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIGZseERhdGF0YWJsZURhdGEgPSB0aGlzLmJlaGF2aW9yLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRmx4VWlEYXRhdGFibGVTZXJ2aWNlKXtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmZseERhdGEuc3Vic2NyaWJlKChyZXNwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkNoYW5nZURhdGEocmVzcCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIENoYW5nZSB0YWJsZSBkYXRhIHdpdGggbmV3IGRhdGFcbiAgICAgKi9cbiAgICBDaGFuZ2VEYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5iZWhhdmlvci5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCBkYXRhIGZyb20gYXBpOiB2b2lkXG4gICAgICovXG4gICAgcHVibGljIHJlbG9hZERhdGEoKTogdm9pZHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmxvYWRGbHhEYXRhVGFibGVEYXRhKHRoaXMuc2VydmljZS5nZXREYXRhVXJsKCkpIDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJvcnRSZXF1ZXN0KCl7XG4gICAgICAgIHRoaXMuc2VydmljZS5jYW5jZWxMb2FkaW5nKCkgO1xuICAgIH1cbn0iXX0=