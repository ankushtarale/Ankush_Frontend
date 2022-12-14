import { FlxUiDatatableService } from './flx-ui-datatable.service';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class FlxUiDataTable {
    private service;
    behavior: BehaviorSubject<any>;
    flxDatatableData: Observable<any>;
    constructor(service: FlxUiDatatableService);
    /**
     *
     * @param data Change table data with new data
     */
    ChangeData(data: any): void;
    /**
     * Reload data from api: void
     */
    reloadData(): void;
    abortRequest(): void;
}
