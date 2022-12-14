import { Http } from '@angular/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
export declare class FlxUiDatatableService {
    http: Http;
    private dataUrl;
    behavior: BehaviorSubject<any>;
    flxData: Observable<any>;
    pagination: Array<Object>;
    totalItems: number;
    dataOffset: number;
    limit: number;
    dataSrcKey: string;
    multipleDeletion: Array<any>;
    loader: Subscription;
    loadFinish: boolean;
    private lazyloadingConfig;
    constructor(http: Http);
    setLazyloadingConfig(config: any): void;
    /**
     *
     * @param url User api rul
     */
    getData(url: string): Observable<any>;
    /**
     *
     * @param url Service api url
     * @param id Datatype id to export
     * @param data Data to export
     */
    postData(url: string, id: any, data: string): Observable<any>;
    /**
     *
     * @param dataUrl Set dataurl
     */
    setDataUrl(dataUrl: string): void;
    getDataUrl(): string;
    /**
     *
     * @param data Register new data from user API
     */
    chageDataTable(data: any): void;
    /**
     *
     * @param numberOfList Total number of list
     * @param limit Pagination limit
     */
    private createPagination(numberOfList, limit);
    isLazyLoadingEnabled(): any;
    loadFlxDataTableData(dataUrl: string, setSelectPagination?: boolean): void;
    cancelLoading(): void;
    setDataSrcKey(srcKey: string): void;
    getDataLength(): Promise<number>;
}
