/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
var FlxUiDatatableService = /** @class */ (function () {
    function FlxUiDatatableService(http) {
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
    FlxUiDatatableService.prototype.setLazyloadingConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.lazyloadingConfig = config;
    };
    /**
     *
     * @param {?} url User api rul
     * @return {?}
     */
    FlxUiDatatableService.prototype.getData = /**
     *
     * @param {?} url User api rul
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url, { headers: headers }).pipe(retry(5), map(function (response) { return response.json(); }));
    };
    /**
     *
     * @param {?} url Service api url
     * @param {?} id Datatype id to export
     * @param {?} data Data to export
     * @return {?}
     */
    FlxUiDatatableService.prototype.postData = /**
     *
     * @param {?} url Service api url
     * @param {?} id Datatype id to export
     * @param {?} data Data to export
     * @return {?}
     */
    function (url, id, data) {
        var /** @type {?} */ headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(url + id, data, { headers: headers }).pipe(map(function (resp) { return resp.json(); }));
    };
    /**
     *
     * @param {?} dataUrl Set dataurl
     * @return {?}
     */
    FlxUiDatatableService.prototype.setDataUrl = /**
     *
     * @param {?} dataUrl Set dataurl
     * @return {?}
     */
    function (dataUrl) {
        this.dataUrl = dataUrl;
    };
    /**
     * @return {?}
     */
    FlxUiDatatableService.prototype.getDataUrl = /**
     * @return {?}
     */
    function () {
        return this.dataUrl;
    };
    /**
     *
     * @param {?} data Register new data from user API
     * @return {?}
     */
    FlxUiDatatableService.prototype.chageDataTable = /**
     *
     * @param {?} data Register new data from user API
     * @return {?}
     */
    function (data) {
        this.behavior.next(data);
    };
    /**
     *
     * @param {?} numberOfList Total number of list
     * @param {?} limit Pagination limit
     * @return {?}
     */
    FlxUiDatatableService.prototype.createPagination = /**
     *
     * @param {?} numberOfList Total number of list
     * @param {?} limit Pagination limit
     * @return {?}
     */
    function (numberOfList, limit) {
        var /** @type {?} */ obj = [];
        var /** @type {?} */ counter = 1;
        for (var /** @type {?} */ i = 0; i < numberOfList; i += limit) {
            obj.push({ label: counter, value: i });
            counter++;
        }
        if (!this.isLazyLoadingEnabled) {
            obj.push({ label: 'All', value: 'all' });
        }
        return obj;
    };
    /**
     * @return {?}
     */
    FlxUiDatatableService.prototype.isLazyLoadingEnabled = /**
     * @return {?}
     */
    function () {
        return this.lazyloadingConfig.hasOwnProperty("apiOffsetKey") && this.lazyloadingConfig.apiOffsetKey;
    };
    /**
     * @param {?} dataUrl
     * @param {?=} setSelectPagination
     * @return {?}
     */
    FlxUiDatatableService.prototype.loadFlxDataTableData = /**
     * @param {?} dataUrl
     * @param {?=} setSelectPagination
     * @return {?}
     */
    function (dataUrl, setSelectPagination) {
        var _this = this;
        if (setSelectPagination === void 0) { setSelectPagination = true; }
        this.loadFinish = false;
        this.loader = this.getData(dataUrl).subscribe(function (responseData) {
            try {
                _this.multipleDeletion = [];
                var /** @type {?} */ data = (_this.dataSrcKey) ? responseData[_this.dataSrcKey] : responseData;
                _this.chageDataTable(data);
                if (_this.isLazyLoadingEnabled()) {
                    _this.totalItems = responseData.total;
                    // Handle 1 pagination out of zero problem 1/0  instead of 0/0 if no data is comming
                    if (data.length > 0) {
                        _this.dataOffset = _this.dataOffset + _this.limit;
                    }
                }
                else {
                    _this.totalItems = data.length;
                    _this.dataOffset = 1;
                }
                if (setSelectPagination) {
                    if (_this.isLazyLoadingEnabled()) {
                        _this.pagination = _this.createPagination(responseData.total, _this.limit);
                    }
                    else {
                        _this.pagination = _this.createPagination(data.length, _this.limit);
                    }
                }
                _this.loadFinish = true;
            }
            catch (/** @type {?} */ e) {
                console.log('Error in reading data in ', e);
            }
        }, (function (e) {
            _this.loadFinish = true;
        }));
    };
    /**
     * @return {?}
     */
    FlxUiDatatableService.prototype.cancelLoading = /**
     * @return {?}
     */
    function () {
        this.loader.unsubscribe();
    };
    //Set source key to read from payload response JSON
    /**
     * @param {?} srcKey
     * @return {?}
     */
    FlxUiDatatableService.prototype.setDataSrcKey = /**
     * @param {?} srcKey
     * @return {?}
     */
    function (srcKey) {
        this.dataSrcKey = srcKey;
    };
    /**
     * @return {?}
     */
    FlxUiDatatableService.prototype.getDataLength = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.flxData.subscribe(function (resp) {
                resolve(resp.length);
            }, (function (e) {
                resolve(0);
            }));
        });
    };
    FlxUiDatatableService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FlxUiDatatableService.ctorParameters = function () { return [
        { type: Http }
    ]; };
    return FlxUiDatatableService;
}());
export { FlxUiDatatableService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmx4LXVpLWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9mbHgtdWktZGF0YXRhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUU7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQVUsTUFBTSxlQUFlLENBQUU7QUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBQyxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBRTtBQUM1QyxPQUFPLEVBQWtCLGVBQWUsRUFBZSxNQUFNLE1BQU0sQ0FBQzs7SUEwQmxFLCtCQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTt1QkF0QkgsRUFBRTt3QkFDWSxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUM7dUJBRW5ELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFOzBCQUVWLEVBQUU7MEJBRVQsQ0FBQzswQkFFRCxDQUFDO3FCQUVOLEVBQUU7MEJBRUUsRUFBRTs7Z0NBRUMsRUFBRTs7MEJBSVYsS0FBSztpQ0FFTSxFQUFFO0tBR2xDOzs7OztJQUVNLG9EQUFvQjs7OztjQUFDLE1BQVU7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBRTs7Ozs7OztJQVE1Qix1Q0FBTzs7Ozs7Y0FBQyxHQUFVO1FBQ3JCLHFCQUFJLE9BQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFFO1FBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDLG1DQUFtQyxDQUFDLENBQUU7UUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLFVB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QVFDO1FBUEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTztZQUNqQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUU7YUFDdkIsRUFBQyxDQUFDLFVBQUEsQ0FBQztnQkFDRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUU7YUFDYixDQUFDLENBQUMsQ0FBQTtTQUNKLENBQUMsQ0FBRTtLQUNMOztnQkF4SkYsVUFBVTs7OztnQkFIRixJQUFJOztnQ0FEYjs7U0FLYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZScgO1xuaW1wb3J0IHsgSHR0cCxIZWFkZXJzLFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9odHRwJyA7XG5pbXBvcnQgeyBtYXAscmV0cnkgfSBmcm9tICdyeGpzL29wZXJhdG9ycycgO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSxwaXBlLEJlaGF2aW9yU3ViamVjdCxTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGbHhVaURhdGF0YWJsZVNlcnZpY2V7XG4gIC8vVXNlciBkYXRhIEFQSSB1cmxcbiAgcHJpdmF0ZSBkYXRhVXJsOiBzdHJpbmcgPSAnJyA7XG4gIHB1YmxpYyBiZWhhdmlvcjogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oW10pIDtcbiAgLy9Ib2xkIGFsbCBkYXRhIGZyb20gQVBJXG4gIHB1YmxpYyBmbHhEYXRhID0gdGhpcy5iZWhhdmlvci5hc09ic2VydmFibGUoKTsgIFxuICAvL0hlYWRlciBzZWxlY3QgcGFnaW5hdGlvblxuICBwdWJsaWMgcGFnaW5hdGlvbjogQXJyYXk8T2JqZWN0PiA9IFtdIDtcbiAgLy9Ib2xkIHRvdGFsIGl0ZW1zIGxvYWRlZCBmcm9tIEFQSVxuICBwdWJsaWMgdG90YWxJdGVtczogbnVtYmVyID0gMCA7XG4gIC8vS2VlcCB0cmFjayBvZiBjdXJyZW50IHBhZ2luYXRpb24gb2Zmc2V0XG4gIHB1YmxpYyBkYXRhT2Zmc2V0OiBudW1iZXIgPSAwIDtcbiAgLy9Vc2VyIGRlZmluZWQgbGltaXQgZm9yIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnaW5hdGlvblxuICBwdWJsaWMgbGltaXQ6IG51bWJlciA9IDIwIDtcbiAgLy9EYXRhIHNvdXJjZSBrZXkgdG8gcmVhZCBmcm9tIEFQSSBwYXlsb2FkIHJlc3BvbnNlXG4gIHB1YmxpYyBkYXRhU3JjS2V5OnN0cmluZyA9ICcnO1xuICAvL0hvbGQgaXRlbXMgc2VsZWN0ZWQgZm9yIG11bHRpcGxlIHNlbGVjdFxuICBtdWx0aXBsZURlbGV0aW9uOkFycmF5PGFueT4gPSBbXSA7XG4gIC8vSG9sZCBzdWJzY3JpcHRpb24gb2YgYXBpIGNhbGxzIHdoaWNoIGNhbiBiZSBjYW5jZWQgYnkgY2FsbGluZyBjYW5jZWxMb2FkaW5nKCkgXG4gIGxvYWRlcjogU3Vic2NyaXB0aW9uIDsgIFxuICAvL0tlZXAgdHJhY2sgaWYgQVBJIGNhbGwgaXMgY29tcGxldGVkXG4gIGxvYWRGaW5pc2g6IGJvb2xlYW4gPSBmYWxzZSA7XG4gIC8vIExhenkgbG9hZGluZyBjb25maWdcbiAgcHJpdmF0ZSBsYXp5bG9hZGluZ0NvbmZpZzogYW55ID0ge30gO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCl7XG4gICAgICBcbiAgfVxuXG4gIHB1YmxpYyBzZXRMYXp5bG9hZGluZ0NvbmZpZyhjb25maWc6YW55KXtcbiAgICB0aGlzLmxhenlsb2FkaW5nQ29uZmlnID0gY29uZmlnIDtcbiAgfVxuXG4gIC8vR0VUIHJlcXVlc3QgdG8gdXNlcidzIEFQSSB1cmxcbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gdXJsIFVzZXIgYXBpIHJ1bFxuICAgKi9cbiAgcHVibGljIGdldERhdGEodXJsOnN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgIGxldCBoZWFkZXJzOiBIZWFkZXJzID0gbmV3IEhlYWRlcnMoKSA7XG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLHtoZWFkZXJzOmhlYWRlcnN9KS5waXBlKHJldHJ5KDUpLG1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpKSA7XG4gIH1cblxuICAvL1Bvc3QgcmVxdWVzdCBmb3IgZGF0YSBleHBvcnRcbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gdXJsIFNlcnZpY2UgYXBpIHVybFxuICAgKiBAcGFyYW0gaWQgRGF0YXR5cGUgaWQgdG8gZXhwb3J0XG4gICAqIEBwYXJhbSBkYXRhIERhdGEgdG8gZXhwb3J0XG4gICAqL1xuICBwdWJsaWMgcG9zdERhdGEodXJsOnN0cmluZyxpZDphbnksZGF0YTpzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgbGV0IGhlYWRlcnM6IEhlYWRlcnMgPSBuZXcgSGVhZGVycygpIDtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpIDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsK2lkLGRhdGEse2hlYWRlcnM6aGVhZGVyc30pLnBpcGUobWFwKChyZXNwOiBSZXNwb25zZSkgPT4gcmVzcC5qc29uKCkpKSA7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBkYXRhVXJsIFNldCBkYXRhdXJsXG4gICAqL1xuICBwdWJsaWMgc2V0RGF0YVVybChkYXRhVXJsOnN0cmluZyk6dm9pZHtcbiAgICB0aGlzLmRhdGFVcmwgPSBkYXRhVXJsIDtcbiAgfVxuXG4gIC8vR2V0IGRhdGEgdXJsIFxuICBwdWJsaWMgZ2V0RGF0YVVybCgpOnN0cmluZ3tcbiAgICByZXR1cm4gdGhpcy5kYXRhVXJsIDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGRhdGEgUmVnaXN0ZXIgbmV3IGRhdGEgZnJvbSB1c2VyIEFQSVxuICAgKi9cbiAgcHVibGljIGNoYWdlRGF0YVRhYmxlKGRhdGE6YW55KXtcbiAgICB0aGlzLmJlaGF2aW9yLm5leHQoZGF0YSkgO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gbnVtYmVyT2ZMaXN0IFRvdGFsIG51bWJlciBvZiBsaXN0XG4gICAqIEBwYXJhbSBsaW1pdCBQYWdpbmF0aW9uIGxpbWl0XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVBhZ2luYXRpb24obnVtYmVyT2ZMaXN0Om51bWJlcixsaW1pdDpudW1iZXIpOiBBcnJheTxPYmplY3Q+e1xuICAgIGxldCBvYmo6IEFycmF5PE9iamVjdD4gPSBbXSA7XG4gICAgbGV0IGNvdW50ZXI6IG51bWJlciA9IDEgO1xuICAgIGZvcihsZXQgaT0wO2k8bnVtYmVyT2ZMaXN0O2krPWxpbWl0KXtcbiAgICAgICAgb2JqLnB1c2goe2xhYmVsOmNvdW50ZXIsdmFsdWU6aX0pIDtcbiAgICAgICAgY291bnRlcisrIDtcbiAgICB9XG4gICAgaWYoIXRoaXMuaXNMYXp5TG9hZGluZ0VuYWJsZWQpe1xuICAgICAgb2JqLnB1c2goeyBsYWJlbDogJ0FsbCcsIHZhbHVlOiAnYWxsJyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9iaiA7XG4gIH1cblxuICBwdWJsaWMgaXNMYXp5TG9hZGluZ0VuYWJsZWQoKXtcbiAgICByZXR1cm4gdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImFwaU9mZnNldEtleVwiKSAmJiB0aGlzLmxhenlsb2FkaW5nQ29uZmlnLmFwaU9mZnNldEtleSA7XG4gIH1cblxuICAvL0V2ZW50IHRvIGxvYWQgZGF0YSBmcm9tIHVzZXJzIGFwaVxuICBwdWJsaWMgbG9hZEZseERhdGFUYWJsZURhdGEoZGF0YVVybDpzdHJpbmcsc2V0U2VsZWN0UGFnaW5hdGlvbjpib29sZWFuPXRydWUpe1xuICAgIHRoaXMubG9hZEZpbmlzaCA9IGZhbHNlIDtcbiAgICAgIHRoaXMubG9hZGVyID0gdGhpcy5nZXREYXRhKGRhdGFVcmwpLnN1YnNjcmliZSgocmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICB0aGlzLm11bHRpcGxlRGVsZXRpb24gPSBbXSA7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gKHRoaXMuZGF0YVNyY0tleSkgPyByZXNwb25zZURhdGFbdGhpcy5kYXRhU3JjS2V5XSA6IHJlc3BvbnNlRGF0YTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFnZURhdGFUYWJsZShkYXRhKSA7XG4gICAgICAgICAgICAgIGlmKHRoaXMuaXNMYXp5TG9hZGluZ0VuYWJsZWQoKSl7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcyA9IHJlc3BvbnNlRGF0YS50b3RhbCA7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIDEgcGFnaW5hdGlvbiBvdXQgb2YgemVybyBwcm9ibGVtIDEvMCAgaW5zdGVhZCBvZiAwLzAgaWYgbm8gZGF0YSBpcyBjb21taW5nXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFPZmZzZXQgPSB0aGlzLmRhdGFPZmZzZXQrdGhpcy5saW1pdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcyA9IGRhdGEubGVuZ3RoIDtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFPZmZzZXQgPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmKHNldFNlbGVjdFBhZ2luYXRpb24pe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNMYXp5TG9hZGluZ0VuYWJsZWQoKSl7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSB0aGlzLmNyZWF0ZVBhZ2luYXRpb24ocmVzcG9uc2VEYXRhLnRvdGFsLCB0aGlzLmxpbWl0KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbiA9IHRoaXMuY3JlYXRlUGFnaW5hdGlvbihkYXRhLmxlbmd0aCwgdGhpcy5saW1pdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubG9hZEZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gcmVhZGluZyBkYXRhIGluICcsZSkgO1xuICAgICAgICAgIH1cbiAgICAgIH0sKGUgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZEZpbmlzaCA9IHRydWUgO1xuICAgICAgfSkpXG4gIH1cblxuICAvL0NhbmNlbCBhcGkgR0VUIHJlcXVlc3QgdG8gYXBpXG4gIHB1YmxpYyBjYW5jZWxMb2FkaW5nKCl7XG4gICAgdGhpcy5sb2FkZXIudW5zdWJzY3JpYmUoKSA7XG4gIH0gIFxuXG4gIC8vU2V0IHNvdXJjZSBrZXkgdG8gcmVhZCBmcm9tIHBheWxvYWQgcmVzcG9uc2UgSlNPTlxuICBzZXREYXRhU3JjS2V5KHNyY0tleTpzdHJpbmcpOnZvaWQge1xuICAgIHRoaXMuZGF0YVNyY0tleSA9IHNyY0tleTtcbiAgfVxuXG4gIGdldERhdGFMZW5ndGgoKTogUHJvbWlzZTxudW1iZXI+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KChyZXNvbHZlKSA9PntcbiAgICAgIHRoaXMuZmx4RGF0YS5zdWJzY3JpYmUoKHJlc3ApID0+e1xuICAgICAgICByZXNvbHZlKHJlc3AubGVuZ3RoKSA7XG4gICAgICB9LChlPT57XG4gICAgICAgIHJlc29sdmUoMCkgO1xuICAgICAgfSkpXG4gICAgfSkgO1xuICB9XG59Il19