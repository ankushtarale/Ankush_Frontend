/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
export class FlxUiDatatableService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.dataUrl = '';
        this.behavior = new BehaviorSubject([]);
        this.flxData = this.behavior.asObservable();
        this.pagination = [];
        this.totalItems = 0;
        this.dataOffset = 0;
        this.limit = 20;
        this.dataSrcKey = '';
        //Hold items selected for multiple select
        this.multipleDeletion = [];
        //Keep track if API call is completed
        this.loadFinish = false;
        this.lazyloadingConfig = {};
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setLazyloadingConfig(config) {
        this.lazyloadingConfig = config;
    }
    /**
     *
     * @param {?} url User api rul
     * @return {?}
     */
    getData(url) {
        let /** @type {?} */ headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url, { headers: headers }).pipe(retry(5), map((response) => response.json()));
    }
    /**
     *
     * @param {?} url Service api url
     * @param {?} id Datatype id to export
     * @param {?} data Data to export
     * @return {?}
     */
    postData(url, id, data) {
        let /** @type {?} */ headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(url + id, data, { headers: headers }).pipe(map((resp) => resp.json()));
    }
    /**
     *
     * @param {?} dataUrl Set dataurl
     * @return {?}
     */
    setDataUrl(dataUrl) {
        this.dataUrl = dataUrl;
    }
    /**
     * @return {?}
     */
    getDataUrl() {
        return this.dataUrl;
    }
    /**
     *
     * @param {?} data Register new data from user API
     * @return {?}
     */
    chageDataTable(data) {
        this.behavior.next(data);
    }
    /**
     *
     * @param {?} numberOfList Total number of list
     * @param {?} limit Pagination limit
     * @return {?}
     */
    createPagination(numberOfList, limit) {
        let /** @type {?} */ obj = [];
        let /** @type {?} */ counter = 1;
        for (let /** @type {?} */ i = 0; i < numberOfList; i += limit) {
            obj.push({ label: counter, value: i });
            counter++;
        }
        if (!this.isLazyLoadingEnabled) {
            obj.push({ label: 'All', value: 'all' });
        }
        return obj;
    }
    /**
     * @return {?}
     */
    isLazyLoadingEnabled() {
        return this.lazyloadingConfig.hasOwnProperty("apiOffsetKey") && this.lazyloadingConfig.apiOffsetKey;
    }
    /**
     * @param {?} dataUrl
     * @param {?=} setSelectPagination
     * @return {?}
     */
    loadFlxDataTableData(dataUrl, setSelectPagination = true) {
        this.loadFinish = false;
        this.loader = this.getData(dataUrl).subscribe((responseData) => {
            try {
                this.multipleDeletion = [];
                var /** @type {?} */ data = (this.dataSrcKey) ? responseData[this.dataSrcKey] : responseData;
                this.chageDataTable(data);
                if (this.isLazyLoadingEnabled()) {
                    this.totalItems = responseData.total;
                    // Handle 1 pagination out of zero problem 1/0  instead of 0/0 if no data is comming
                    if (data.length > 0) {
                        this.dataOffset = this.dataOffset + this.limit;
                    }
                }
                else {
                    this.totalItems = data.length;
                    this.dataOffset = 1;
                }
                if (setSelectPagination) {
                    if (this.isLazyLoadingEnabled()) {
                        this.pagination = this.createPagination(responseData.total, this.limit);
                    }
                    else {
                        this.pagination = this.createPagination(data.length, this.limit);
                    }
                }
                this.loadFinish = true;
            }
            catch (/** @type {?} */ e) {
                console.log('Error in reading data in ', e);
            }
        }, (e => {
            this.loadFinish = true;
        }));
    }
    /**
     * @return {?}
     */
    cancelLoading() {
        this.loader.unsubscribe();
    }
    /**
     * @param {?} srcKey
     * @return {?}
     */
    setDataSrcKey(srcKey) {
        this.dataSrcKey = srcKey;
    }
    /**
     * @return {?}
     */
    getDataLength() {
        return new Promise((resolve) => {
            this.flxData.subscribe((resp) => {
                resolve(resp.length);
            }, (e => {
                resolve(0);
            }));
        });
    }
}
FlxUiDatatableService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FlxUiDatatableService.ctorParameters = () => [
    { type: Http }
];
function FlxUiDatatableService_tsickle_Closure_declarations() {
    /** @type {?} */
    FlxUiDatatableService.prototype.dataUrl;
    /** @type {?} */
    FlxUiDatatableService.prototype.behavior;
    /** @type {?} */
    FlxUiDatatableService.prototype.flxData;
    /** @type {?} */
    FlxUiDatatableService.prototype.pagination;
    /** @type {?} */
    FlxUiDatatableService.prototype.totalItems;
    /** @type {?} */
    FlxUiDatatableService.prototype.dataOffset;
    /** @type {?} */
    FlxUiDatatableService.prototype.limit;
    /** @type {?} */
    FlxUiDatatableService.prototype.dataSrcKey;
    /** @type {?} */
    FlxUiDatatableService.prototype.multipleDeletion;
    /** @type {?} */
    FlxUiDatatableService.prototype.loader;
    /** @type {?} */
    FlxUiDatatableService.prototype.loadFinish;
    /** @type {?} */
    FlxUiDatatableService.prototype.lazyloadingConfig;
    /** @type {?} */
    FlxUiDatatableService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmx4LXVpLWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9mbHgtdWktZGF0YXRhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUU7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQVUsTUFBTSxlQUFlLENBQUU7QUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBQyxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBRTtBQUM1QyxPQUFPLEVBQWtCLGVBQWUsRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxNQUFNOzs7O0lBd0JKLFlBQW1CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO3VCQXRCSCxFQUFFO3dCQUNZLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQzt1QkFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7MEJBRVYsRUFBRTswQkFFVCxDQUFDOzBCQUVELENBQUM7cUJBRU4sRUFBRTswQkFFRSxFQUFFOztnQ0FFQyxFQUFFOzswQkFJVixLQUFLO2lDQUVNLEVBQUU7S0FHbEM7Ozs7O0lBRU0sb0JBQW9CLENBQUMsTUFBVTtRQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFFOzs7Ozs7O0lBUTVCLE9BQU8sQ0FBQyxHQUFVO1FBQ3JCLHFCQUFJLE9BQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFFO1FBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDLG1DQUFtQyxDQUFDLENBQUU7UUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFD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Q0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBRTthQUN2QixFQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUU7Z0JBQ0osT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFFO2FBQ2IsQ0FBQyxDQUFDLENBQUE7U0FDSixDQUFDLENBQUU7S0FDTDs7O1lBeEpGLFVBQVU7Ozs7WUFIRixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnIDtcbmltcG9ydCB7IEh0dHAsSGVhZGVycyxSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCcgO1xuaW1wb3J0IHsgbWFwLHJldHJ5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnIDtcbmltcG9ydCB7IE9ic2VydmFibGUscGlwZSxCZWhhdmlvclN1YmplY3QsU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmx4VWlEYXRhdGFibGVTZXJ2aWNle1xuICAvL1VzZXIgZGF0YSBBUEkgdXJsXG4gIHByaXZhdGUgZGF0YVVybDogc3RyaW5nID0gJycgO1xuICBwdWJsaWMgYmVoYXZpb3I6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFtdKSA7XG4gIC8vSG9sZCBhbGwgZGF0YSBmcm9tIEFQSVxuICBwdWJsaWMgZmx4RGF0YSA9IHRoaXMuYmVoYXZpb3IuYXNPYnNlcnZhYmxlKCk7ICBcbiAgLy9IZWFkZXIgc2VsZWN0IHBhZ2luYXRpb25cbiAgcHVibGljIHBhZ2luYXRpb246IEFycmF5PE9iamVjdD4gPSBbXSA7XG4gIC8vSG9sZCB0b3RhbCBpdGVtcyBsb2FkZWQgZnJvbSBBUElcbiAgcHVibGljIHRvdGFsSXRlbXM6IG51bWJlciA9IDAgO1xuICAvL0tlZXAgdHJhY2sgb2YgY3VycmVudCBwYWdpbmF0aW9uIG9mZnNldFxuICBwdWJsaWMgZGF0YU9mZnNldDogbnVtYmVyID0gMCA7XG4gIC8vVXNlciBkZWZpbmVkIGxpbWl0IGZvciBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2luYXRpb25cbiAgcHVibGljIGxpbWl0OiBudW1iZXIgPSAyMCA7XG4gIC8vRGF0YSBzb3VyY2Uga2V5IHRvIHJlYWQgZnJvbSBBUEkgcGF5bG9hZCByZXNwb25zZVxuICBwdWJsaWMgZGF0YVNyY0tleTpzdHJpbmcgPSAnJztcbiAgLy9Ib2xkIGl0ZW1zIHNlbGVjdGVkIGZvciBtdWx0aXBsZSBzZWxlY3RcbiAgbXVsdGlwbGVEZWxldGlvbjpBcnJheTxhbnk+ID0gW10gO1xuICAvL0hvbGQgc3Vic2NyaXB0aW9uIG9mIGFwaSBjYWxscyB3aGljaCBjYW4gYmUgY2FuY2VkIGJ5IGNhbGxpbmcgY2FuY2VsTG9hZGluZygpIFxuICBsb2FkZXI6IFN1YnNjcmlwdGlvbiA7ICBcbiAgLy9LZWVwIHRyYWNrIGlmIEFQSSBjYWxsIGlzIGNvbXBsZXRlZFxuICBsb2FkRmluaXNoOiBib29sZWFuID0gZmFsc2UgO1xuICAvLyBMYXp5IGxvYWRpbmcgY29uZmlnXG4gIHByaXZhdGUgbGF6eWxvYWRpbmdDb25maWc6IGFueSA9IHt9IDtcbiAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHApe1xuICAgICAgXG4gIH1cblxuICBwdWJsaWMgc2V0TGF6eWxvYWRpbmdDb25maWcoY29uZmlnOmFueSl7XG4gICAgdGhpcy5sYXp5bG9hZGluZ0NvbmZpZyA9IGNvbmZpZyA7XG4gIH1cblxuICAvL0dFVCByZXF1ZXN0IHRvIHVzZXIncyBBUEkgdXJsXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHVybCBVc2VyIGFwaSBydWxcbiAgICovXG4gIHB1YmxpYyBnZXREYXRhKHVybDpzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICBsZXQgaGVhZGVyczogSGVhZGVycyA9IG5ldyBIZWFkZXJzKCkgO1xuICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIDtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCx7aGVhZGVyczpoZWFkZXJzfSkucGlwZShyZXRyeSg1KSxtYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKSkgO1xuICB9XG5cbiAgLy9Qb3N0IHJlcXVlc3QgZm9yIGRhdGEgZXhwb3J0XG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHVybCBTZXJ2aWNlIGFwaSB1cmxcbiAgICogQHBhcmFtIGlkIERhdGF0eXBlIGlkIHRvIGV4cG9ydFxuICAgKiBAcGFyYW0gZGF0YSBEYXRhIHRvIGV4cG9ydFxuICAgKi9cbiAgcHVibGljIHBvc3REYXRhKHVybDpzdHJpbmcsaWQ6YW55LGRhdGE6c3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgIGxldCBoZWFkZXJzOiBIZWFkZXJzID0gbmV3IEhlYWRlcnMoKSA7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKSA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCtpZCxkYXRhLHtoZWFkZXJzOmhlYWRlcnN9KS5waXBlKG1hcCgocmVzcDogUmVzcG9uc2UpID0+IHJlc3AuanNvbigpKSkgO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YVVybCBTZXQgZGF0YXVybFxuICAgKi9cbiAgcHVibGljIHNldERhdGFVcmwoZGF0YVVybDpzdHJpbmcpOnZvaWR7XG4gICAgdGhpcy5kYXRhVXJsID0gZGF0YVVybCA7XG4gIH1cblxuICAvL0dldCBkYXRhIHVybCBcbiAgcHVibGljIGdldERhdGFVcmwoKTpzdHJpbmd7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVVybCA7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFJlZ2lzdGVyIG5ldyBkYXRhIGZyb20gdXNlciBBUElcbiAgICovXG4gIHB1YmxpYyBjaGFnZURhdGFUYWJsZShkYXRhOmFueSl7XG4gICAgdGhpcy5iZWhhdmlvci5uZXh0KGRhdGEpIDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIG51bWJlck9mTGlzdCBUb3RhbCBudW1iZXIgb2YgbGlzdFxuICAgKiBAcGFyYW0gbGltaXQgUGFnaW5hdGlvbiBsaW1pdFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVQYWdpbmF0aW9uKG51bWJlck9mTGlzdDpudW1iZXIsbGltaXQ6bnVtYmVyKTogQXJyYXk8T2JqZWN0PntcbiAgICBsZXQgb2JqOiBBcnJheTxPYmplY3Q+ID0gW10gO1xuICAgIGxldCBjb3VudGVyOiBudW1iZXIgPSAxIDtcbiAgICBmb3IobGV0IGk9MDtpPG51bWJlck9mTGlzdDtpKz1saW1pdCl7XG4gICAgICAgIG9iai5wdXNoKHtsYWJlbDpjb3VudGVyLHZhbHVlOml9KSA7XG4gICAgICAgIGNvdW50ZXIrKyA7XG4gICAgfVxuICAgIGlmKCF0aGlzLmlzTGF6eUxvYWRpbmdFbmFibGVkKXtcbiAgICAgIG9iai5wdXNoKHsgbGFiZWw6ICdBbGwnLCB2YWx1ZTogJ2FsbCcgfSk7XG4gICAgfVxuICAgIHJldHVybiBvYmogO1xuICB9XG5cbiAgcHVibGljIGlzTGF6eUxvYWRpbmdFbmFibGVkKCl7XG4gICAgcmV0dXJuIHRoaXMubGF6eWxvYWRpbmdDb25maWcuaGFzT3duUHJvcGVydHkoXCJhcGlPZmZzZXRLZXlcIikgJiYgdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlPZmZzZXRLZXkgO1xuICB9XG5cbiAgLy9FdmVudCB0byBsb2FkIGRhdGEgZnJvbSB1c2VycyBhcGlcbiAgcHVibGljIGxvYWRGbHhEYXRhVGFibGVEYXRhKGRhdGFVcmw6c3RyaW5nLHNldFNlbGVjdFBhZ2luYXRpb246Ym9vbGVhbj10cnVlKXtcbiAgICB0aGlzLmxvYWRGaW5pc2ggPSBmYWxzZSA7XG4gICAgICB0aGlzLmxvYWRlciA9IHRoaXMuZ2V0RGF0YShkYXRhVXJsKS5zdWJzY3JpYmUoKHJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgdGhpcy5tdWx0aXBsZURlbGV0aW9uID0gW10gO1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9ICh0aGlzLmRhdGFTcmNLZXkpID8gcmVzcG9uc2VEYXRhW3RoaXMuZGF0YVNyY0tleV0gOiByZXNwb25zZURhdGE7XG4gICAgICAgICAgICAgIHRoaXMuY2hhZ2VEYXRhVGFibGUoZGF0YSkgO1xuICAgICAgICAgICAgICBpZih0aGlzLmlzTGF6eUxvYWRpbmdFbmFibGVkKCkpeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSByZXNwb25zZURhdGEudG90YWwgO1xuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSAxIHBhZ2luYXRpb24gb3V0IG9mIHplcm8gcHJvYmxlbSAxLzAgIGluc3RlYWQgb2YgMC8wIGlmIG5vIGRhdGEgaXMgY29tbWluZ1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhT2Zmc2V0ID0gdGhpcy5kYXRhT2Zmc2V0K3RoaXMubGltaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSBkYXRhLmxlbmd0aCA7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhT2Zmc2V0ID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZihzZXRTZWxlY3RQYWdpbmF0aW9uKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzTGF6eUxvYWRpbmdFbmFibGVkKCkpe1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gdGhpcy5jcmVhdGVQYWdpbmF0aW9uKHJlc3BvbnNlRGF0YS50b3RhbCwgdGhpcy5saW1pdCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSB0aGlzLmNyZWF0ZVBhZ2luYXRpb24oZGF0YS5sZW5ndGgsIHRoaXMubGltaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmxvYWRGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIHJlYWRpbmcgZGF0YSBpbiAnLGUpIDtcbiAgICAgICAgICB9XG4gICAgICB9LChlID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRGaW5pc2ggPSB0cnVlIDtcbiAgICAgIH0pKVxuICB9XG5cbiAgLy9DYW5jZWwgYXBpIEdFVCByZXF1ZXN0IHRvIGFwaVxuICBwdWJsaWMgY2FuY2VsTG9hZGluZygpe1xuICAgIHRoaXMubG9hZGVyLnVuc3Vic2NyaWJlKCkgO1xuICB9ICBcblxuICAvL1NldCBzb3VyY2Uga2V5IHRvIHJlYWQgZnJvbSBwYXlsb2FkIHJlc3BvbnNlIEpTT05cbiAgc2V0RGF0YVNyY0tleShzcmNLZXk6c3RyaW5nKTp2b2lkIHtcbiAgICB0aGlzLmRhdGFTcmNLZXkgPSBzcmNLZXk7XG4gIH1cblxuICBnZXREYXRhTGVuZ3RoKCk6IFByb21pc2U8bnVtYmVyPntcbiAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSkgPT57XG4gICAgICB0aGlzLmZseERhdGEuc3Vic2NyaWJlKChyZXNwKSA9PntcbiAgICAgICAgcmVzb2x2ZShyZXNwLmxlbmd0aCkgO1xuICAgICAgfSwoZT0+e1xuICAgICAgICByZXNvbHZlKDApIDtcbiAgICAgIH0pKVxuICAgIH0pIDtcbiAgfVxufSJdfQ==