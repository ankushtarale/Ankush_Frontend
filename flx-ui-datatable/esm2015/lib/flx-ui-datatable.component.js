/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FlxUiDatatableService } from './flx-ui-datatable.service';
import { BehaviorSubject } from 'rxjs';
export class FlxUiDatatableComponent {
    /**
     * @param {?} __form
     * @param {?} service
     */
    constructor(__form, service) {
        this.__form = __form;
        this.service = service;
        this.classes = {};
        this.headers = [];
        this.lazyloadingConfig = {};
        this.embedPictures = {};
        this.dataKeys = [];
        this.enableDataExports = false;
        this.dataExportsConfig = {};
        this.searchKeys = [];
        this.dataSrcKey = '';
        this.hasActionButtons = false;
        this.hideNumbers = false;
        this.enableMultipleSelection = false;
        this.multipleSelectKey = '';
        this.hasAddButton = false;
        this.dataUrl = '';
        this.actionButtonStart = false;
        this.multipleSelectButton = { text: 'Selected', icon: '' };
        this.searchPlaceholder = 'Enter name to search';
        this.actionHeader = 'Actions';
        this.limit = 20;
        this.spinnerSrc = '';
        this.actionButtons = [];
        this.paginationButtons = { background: '#dddddd', textColor: '#335599' };
        this.tableHeader = { background: '#ffffff', textColor: '#335599' };
        this.searchButton = { background: '#cccccc', textColor: '#335599' };
        this.addButton = {};
        this.searchBar = { borderSize: '1px', borderColor: '#ccc', background: '#ffffff', textColor: '#000000' };
        this.firstActionButtonClicked = new EventEmitter();
        this.secondActionButtonClicked = new EventEmitter();
        this.thirdActionButtonClicked = new EventEmitter();
        this.multipleSelectClicked = new EventEmitter();
        this.addButtonClicked = new EventEmitter();
        this.isExportAll = false;
        this.tData = [];
        this.behavior = new BehaviorSubject([]);
        this.searchDataTempOffset = [];
        this.displayData = this.behavior.asObservable();
        this.offset = 1;
    }
    /**
     * @return {?}
     */
    reload() {
        this.service.loadFlxDataTableData(this.reloadUrl, true);
    }
    /**
     *
     * @param {?} checked Export all selection
     * @return {?}
     */
    checkToExportOption(checked) {
        this.isExportAll = checked;
    }
    /**
     *
     * @param {?} exportType Export type: print|pdf|excel|word
     * @return {?}
     */
    exportDocumentsAs(exportType) {
        let /** @type {?} */ loading = /** @type {?} */ (document.getElementById("export_loading"));
        loading.style.display = 'block';
        let /** @type {?} */ headers = (!this.dataExportsConfig.dataColumns || this.dataExportsConfig.dataColumns.length < 1) ? this.dataKeys : this.dataExportsConfig.dataColumns;
        let /** @type {?} */ dataToExport = (!this.isExportAll) ? this.displayData : this.service.flxData;
        //Subscribe to data
        dataToExport.subscribe((data) => {
            let /** @type {?} */ arrayObj = [];
            //Loop and push data
            for (let /** @type {?} */ d of data) {
                let /** @type {?} */ obj = {};
                for (let /** @type {?} */ h = 0; h < headers.length; h++) {
                    obj[headers[h]] = d[headers[h]];
                }
                arrayObj.push(obj);
            }
            if (exportType == 'print') {
                try {
                    printJS({ printable: arrayObj, properties: headers, type: 'json' });
                    loading.style.display = 'none';
                }
                catch (/** @type {?} */ e) {
                    loading.style.display = 'none';
                    // console.log('PrintJS not found. Add `https://printjs-4de6.kxcdn.com/print.min.js` to your index.html or add as part of angular.json script') ;
                }
            }
            else {
                let /** @type {?} */ extension = (exportType == 'pdf') ? 'pdf' : (exportType == 'excel') ? 'xlsx' : 'docx';
                let /** @type {?} */ pageId = (exportType == 'pdf') ? 3 : (exportType == 'excel') ? 5 : 4;
                let /** @type {?} */ requestData = { "data": JSON.stringify(arrayObj) };
                this.service.postData('http://exporter.azurewebsites.net/api/export/ExportFromJSON/', pageId, requestData).subscribe((resp) => {
                    var /** @type {?} */ download = 'http://exporter.azurewebsites.net/api/export/GetFile/' + resp;
                    download += "?fileName=andrei&extension=" + extension;
                    window.location.href = download;
                    loading.style.display = 'none';
                }, (e => {
                    //console.log('file export error',e) ;
                }));
            }
        }).unsubscribe();
    }
    /**
     * @return {?}
     */
    hasImageEmbeded() {
        return this.embedPictures.hasOwnProperty("index");
    }
    /**
     * @return {?}
     */
    getImage() {
        console.log('eoeoe');
        //   let img = new Image() ;
        //   img.src = imageSrc ;
        //   img.onload = ((e)=>{
        //       return imageSrc ;
        //   }) ;
        //   img.onerror = ((e)=>{
        //     return this.embedPictures.fallbackUrl ;
        //   })
    }
    /**
     * @param {?} JSONData
     * @param {?} ReportTitle
     * @param {?} ShowLabel
     * @return {?}
     */
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var /** @type {?} */ arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var /** @type {?} */ CSV = '';
        //Set Report title in first row or line
        CSV += ReportTitle + '\r\n\n';
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var /** @type {?} */ row = "";
            //This loop will extract the label from 1st index of on array
            for (var /** @type {?} */ index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + '\r\n';
        }
        //1st loop is to extract each row
        for (var /** @type {?} */ i = 0; i < arrData.length; i++) {
            var /** @type {?} */ row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var /** @type {?} */ index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            alert("Invalid data");
            return;
        }
        //Generate a file name
        var /** @type {?} */ fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        //Initialize file format you want csv or xls
        var /** @type {?} */ uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension
        //this trick will generate a temp <a /> tag
        var /** @type {?} */ link = document.createElement("a");
        link.href = uri;
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /**
     *
     * @param {?} newData
     * @return {?}
     */
    changeDisplayData(newData) {
        this.behavior.next(newData);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.isLazyloadingEnabled()) {
            this.reloadUrl = this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=0&' + this.lazyloadingConfig.apiSearchKey + '=';
        }
        else {
            this.reloadUrl = this.dataUrl;
        }
        this.searchForm = this.__form.group({
            searchString: ['', Validators.required]
        });
        this.searchForm = this.__form.group({
            searchString: ['', Validators.required]
        });
        this.service.limit = this.limit;
        this.service.setLazyloadingConfig(this.lazyloadingConfig);
        this.service.setDataUrl(this.dataUrl);
        this.service.setDataSrcKey(this.dataSrcKey);
        let /** @type {?} */ url = (this.isLazyloadingEnabled()) ? this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=0&' + this.lazyloadingConfig.apiSearchKey + '=' : this.dataUrl;
        this.service.loadFlxDataTableData(url);
        this.service.flxData.subscribe((resp) => {
            this.tData = resp;
            let /** @type {?} */ obj = [];
            if (this.tData.length > this.limit) {
                for (let /** @type {?} */ i = 0; i < this.limit; i++) {
                    obj.push(this.tData[i]);
                }
                // this.service.dataOffset = this.limit;
            }
            else {
                let /** @type {?} */ counter = 0;
                for (let /** @type {?} */ i = 0; i < this.tData.length; i++) {
                    obj.push(this.tData[i]);
                    counter++;
                }
                // this.service.dataOffset = obj.length;
            }
            this.searchDataTempOffset = obj;
            this.changeDisplayData(obj);
        });
    }
    /**
     * @param {?} values
     * @param {?} form
     * @return {?}
     */
    searchDataInApi(values, form) {
        this.service.chageDataTable([]);
        this.service.loadFlxDataTableData(this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=0&' + this.lazyloadingConfig.apiSearchKey + '=' + values.searchString);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // alert(window.innerWidth)
    }
    /**
     * @param {?} index
     * @param {?} buttonIndex
     * @return {?}
     */
    actionButtonClicked(index, buttonIndex) {
        if (buttonIndex == 0) {
            return this.firstActionButtonClicked.emit({ index: index, data: this.tData[index] });
        }
        else if (buttonIndex == 1) {
            return this.secondActionButtonClicked.emit({ index: index, data: this.tData[index] });
        }
        else {
            this.thirdActionButtonClicked.emit({ index: index, data: this.tData[index] });
        }
    }
    /**
     * @return {?}
     */
    addButtonClick() {
        this.addButtonClicked.emit();
    }
    /**
     * @return {?}
     */
    confirmDelete() {
        return this.multipleSelectClicked.emit(this.service.multipleDeletion);
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    addRemove(checked) {
        if (checked) {
            this.displayData.subscribe((data) => {
                let /** @type {?} */ counter = 0;
                for (let /** @type {?} */ i of data) {
                    try {
                        this.service.multipleDeletion.push(i[this.multipleSelectKey]);
                    }
                    catch (/** @type {?} */ e) { }
                }
                // console.log(this.service.multipleDeletion) ;
            });
        }
        else {
            this.service.multipleDeletion = [];
        }
    }
    /**
     * @param {?} dataKeyvalue
     * @param {?} index
     * @param {?} selected
     * @return {?}
     */
    addRemoveDeleteItem(dataKeyvalue, index, selected) {
        if (!selected) {
            for (var /** @type {?} */ i = 0; i < this.service.multipleDeletion.length; i++) {
                if (dataKeyvalue == this.service.multipleDeletion[i]) {
                    this.service.multipleDeletion.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.displayData.subscribe((resp) => {
                this.service.multipleDeletion.push(resp[index][this.multipleSelectKey]);
            });
        }
        // console.log('left '+dataKeyvalue,this.service.multipleDeletion) ;
    }
    /**
     * @return {?}
     */
    getSearchColumns() {
        return (this.hasAddButton) ? (this.enableDataExports) ? 'col-md-6 search-container' : 'col-md-7 search-container' :
            (this.enableDataExports) ? 'col-md-7 search-container' : 'col-md-8 search-container';
    }
    /**
     * @return {?}
     */
    disablePrevtButton() {
        return Math.ceil(this.service.dataOffset / this.limit) <= 1;
    }
    /**
     * @return {?}
     */
    disableNextButton() {
        return Math.ceil(this.service.dataOffset / this.limit) == Math.ceil(this.service.totalItems / this.limit);
    }
    /**
     * @return {?}
     */
    isLazyloadingEnabled() {
        return this.lazyloadingConfig.hasOwnProperty("apiOffsetKey") && this.lazyloadingConfig.apiOffsetKey;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    nextPrevItem(type) {
        if (this.isLazyloadingEnabled()) {
            this.service.loadFinish = false;
            this.service.getDataLength().then(dataLength => {
                this.service.chageDataTable([]);
                this.service.dataOffset = (type == 'prev') ? ((this.service.dataOffset - this.limit) - this.limit) : this.service.dataOffset;
                let /** @type {?} */ url = (this.isLazyloadingEnabled()) ? this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=' + this.service.dataOffset + '&' + this.lazyloadingConfig.apiSearchKey + '=' : this.dataUrl;
                this.service.loadFlxDataTableData(url);
            }).catch(e => {
                //console.log('error',e) ;
            });
            return;
        }
        // Paginate if lazyloading is disabled
        if (type == 'prev') {
            this.paginateDatatableRecord((this.service.dataOffset - this.limit) - this.limit);
        }
        else {
            if (this.service.dataOffset < this.limit) {
                this.paginateDatatableRecord(this.service.dataOffset + (this.limit - 1));
            }
            else {
                this.paginateDatatableRecord(this.service.dataOffset);
            }
        }
    }
    /**
     * @param {?=} searchString
     * @return {?}
     */
    filterData(searchString = '') {
        this.changeDisplayData([]);
        this.service.flxData.subscribe((data) => {
            let /** @type {?} */ searchResults = [];
            //If no string provided. Register all the previous data to the dataset
            if (searchString.trim() == '') {
                this.changeDisplayData(this.searchDataTempOffset);
                return;
            }
            //Check if searchKeys are set else use dataKeys as searchKeys
            let /** @type {?} */ searchKeys = (this.searchKeys.length < 1) ? this.dataKeys : this.searchKeys;
            for (let /** @type {?} */ i = 0; i < data.length; i++) {
                //Variable to check if a data is found
                let /** @type {?} */ found = -1;
                for (let /** @type {?} */ x = 0; x < searchKeys.length; x++) {
                    try {
                        if (data[i][String(searchKeys[x])].toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1) {
                            found = i;
                            break;
                        }
                    }
                    catch (/** @type {?} */ e) { }
                }
                //If found push the index of the data to the searchResults variable
                if (found > -1) {
                    searchResults.push(data[found]);
                }
            }
            //Register the results to the dataset
            this.changeDisplayData(searchResults);
        });
    }
    /**
     * @param {?} value offset value
     * @return {?}
     */
    paginateDatatable(value) {
        // Check if lazy loading is enabled
        if (this.isLazyloadingEnabled()) {
            this.service.loadFinish = false;
            // Subscribe to get the data length
            this.service.getDataLength().then(() => {
                this.service.chageDataTable([]);
                // Check if all is selected to prevent NAN value
                if (value != 'all') {
                    this.service.dataOffset = parseInt(value);
                }
                // setup url
                let /** @type {?} */ url = (this.isLazyloadingEnabled()) ? this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=' + value + '&' + this.lazyloadingConfig.apiSearchKey + '=' : this.dataUrl;
                // paginate
                this.service.loadFlxDataTableData(url, false);
            }).catch(e => {
                // console.log('error',e) ;
            });
            return;
        }
        this.paginateDatatableRecord(value);
    }
    /**
     *
     * @param {?} value pagination number
     * Perform pagination to the dataset
     * @return {?}
     */
    paginateDatatableRecord(value) {
        if (this.lazyloadingConfig.hasOwnProperty("apiOffsetKey") && this.lazyloadingConfig.apiOffsetKey) {
            this.service.loadFinish = false;
            this.service.getDataLength().then(dataLength => {
                this.service.chageDataTable([]);
                this.service.dataOffset = parseInt(value) + this.limit;
                this.service.loadFlxDataTableData(this.dataUrl + '&' + this.lazyloadingConfig.apiOffsetKey + '=' + value + '&' + this.lazyloadingConfig.apiSearchKey + '=');
            }).catch(e => {
                // console.log('error',e) ;
            });
            return;
        }
        let /** @type {?} */ num = parseInt(value);
        if (num <= 0) {
            this.offset = 1;
            this.service.dataOffset = this.limit;
        }
        else {
            if (value != 'all') {
                this.offset = num + 1;
                this.service.dataOffset = num + this.limit;
            }
            else {
                this.offset = 1;
            }
        }
        this.service.flxData.subscribe((data) => {
            if (value !== 'all') {
                let /** @type {?} */ paginateResult = [];
                for (let /** @type {?} */ i = value; i < (this.limit + parseInt(value)); i++) {
                    if (data[i]) {
                        paginateResult.push(data[i]);
                    }
                }
                if (paginateResult.length > 0) {
                    this.changeDisplayData(paginateResult);
                }
            }
            else {
                this.changeDisplayData(data);
                this.searchDataTempOffset = data;
            }
        });
    }
}
FlxUiDatatableComponent.decorators = [
    { type: Component, args: [{
                selector: 'flx-ui-datatable',
                template: `<div class="col-md-12 flx-ui-datatable-main {{ classes?.maincontainer }}">
    <div id="export_loading" class="col-md-12 text-center" style="display: none;margin-bottom:0.5em;color:#dddddd;font-size:13px;font-weight:bold;">Exporting...</div>
    <div class="col-md-12 flx-ui-datatable-header">
        <div class="col-xs-3 col-sm-3 pagination-select col-md-2" style="position:relative;z-index: 1;">
            <select class="form-control rmsh rmrd {{ classes?.paginationselect }}" (change)="paginateDatatable($event?.target?.value)">
                <option *ngFor="let paging of service?.pagination" [value]="paging?.value">{{ paging?.label }}</option>
            </select>
        </div>
        <div class="col-xs-5 col-sm-5 col-md-2 text-center flx-datatable-pagination rmpd" style="position:relative;z-index: 2;">
            <button mat-icon-button [ngClass]="{'flx-pagination-end': disablePrevtButton()}" (click)="nextPrevItem('prev')" [disabled]="disablePrevtButton()" class="flx-ui-datatable-pagination-buttons {{ classes?.paginationButton }}"><span class="fa fa-angle-double-left fa-1x"></span> <span class="flx-datatable-tooltip-prev" [ngClass]="{'flx-pagination-end': disablePrevtButton()}">Previous</span> </button>
                {{ service?.dataOffset | ceil: limit }} / {{ service?.totalItems | ceil: limit }}
            <button mat-icon-button [ngClass]="{'flx-pagination-end': disableNextButton()}" (click)="nextPrevItem('next')" [disabled]="disableNextButton()" class="flx-ui-datatable-pagination-buttons {{ classes?.paginationButton }}"><span class="fa fa-angle-double-right fa-1x"></span> <span class="flx-datatable-tooltip-next" [ngClass]="{'flx-pagination-end': disableNextButton()}">Next</span></button>
        </div>
        <div [class]="'search-bar '+getSearchColumns()">
            <input type="text" *ngIf="!isLazyloadingEnabled()" [style.background]="searchBar?.background" [style.color]="searchBar?.textColor" [ngStyle]="{border:searchBar?.borderSize +' solid '+ searchBar?.borderColor} " (keyup)="filterData($event?.target?.value)" class="form-control rmsh rmrd customclass" [placeholder]="searchPlaceholder">
            <form (ngSubmit)="searchDataInApi(srch?.value,srch)" #srch="ngForm" *ngIf="isLazyloadingEnabled()">
                <div class="input-group">
                    <input type="text" required name="searchString" ngModel [style.background]="searchBar?.background" [style.color]="searchBar?.textColor" [ngStyle]="{border:searchBar?.borderSize +' solid '+ searchBar?.borderColor} " class="form-control rmsh rmrd {{ classes?.searchbar }}" [placeholder]="searchPlaceholder">
                    <span class="input-group-addon">
                        <button [disabled]="!srch?.valid" type="submit" class="btn btn-default btn-clear btn-md">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>
        </div>
        <div class="col-md-1 text-right rmpd" *ngIf="hasAddButton">
            <button (click)="addButtonClick()" class="{{ classes?.addButton }}" [style.background]="addButton?.background" [style.borderColor]="addButton?.background" [style.color]="addButton?.textColor"><span class="glyphicon glyphicon-plus"></span> Add</button>
        </div>
        <div class="col-md-1 text-right rmpd export-cnt" *ngIf="enableDataExports">
            <span class="dropdown">
                <button class="btn btn-default {{ classes?.exportButton }} dropdown-toggle" type="button" data-toggle="dropdown">
                
                <i class="caret"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-export">
                    <li class="dropdown-header">{{ dataExportsConfig?.title }}. <input type="checkbox" (change)="checkToExportOption($event?.target?.checked)" style="position: relative;top:0.3em;"> <sup style="font-size:10px;color:#999;"> All</sup></li> 
                    <li class="divider"></li>
                    <li class="dropdown-submenu" *ngFor="let export of dataExportsConfig?.exportsTo" (click)="exportDocumentsAs(export)">
                        <a href="javascript:void(0)" *ngIf="export=='print'"><i class="glyphicon glyphicon-print"></i> Print</a>
                        <a href="javascript:void(0)" *ngIf="export=='pdf'" style="color:#ff0000"><i class="glyphicon glyphicon-file"></i> PDF</a>
                        <a href="javascript:void(0)" *ngIf="export=='excel'" style="color:#009900;"><i class="glyphicon glyphicon-file"></i> Excel</a>            
                        <a href="javascript:void(0)" *ngIf="export=='word'" style="color:#335599;"><i class="glyphicon glyphicon-file"></i> Word</a>                        
                    </li>
                    <li class="divider"></li>
                    <li class="dropdown-header">
                        <span  *ngIf="!isExportAll">{{ (displayData | async)?.length }}</span>
                        <span  *ngIf="isExportAll">{{ (service?.flxData | async)?.length }}</span> 
                    </li>
                </ul>
            </span>
        </div>
    </div>
    <div class="col-md-12 rmpd table-responsive">
        <table class="table {{ classes?.tableType }} table-responsive" id="flx_ui_table_tag">
            <thead class="{{ classes?.tableHeader }}">
                <tr>
                    <th *ngIf="!hideNumbers">N<sup><u>o</u></sup></th>
                    <th *ngFor="let header of headers">{{ header }}</th>
                    <th *ngIf="hasActionButtons">{{ actionHeader }} 
                        <input type="checkbox" [checked]="service?.multipleDeletion?.length>0" (change)="addRemove($event?.target?.checked)" *ngIf="enableMultipleSelection">
                        <button class="btn btn-danger btn-xs flx-multiple-deletion-button" *ngIf="enableMultipleSelection && service?.multipleDeletion?.length>0" (click)="confirmDelete()"><span [class]="multipleSelectButton?.icon"></span> {{ multipleSelectButton?.text }}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngIf="!service?.loadFinish">                    
                    <td colspan="20" class="text-center">
                        <img *ngIf="spinnerSrc" [class]="classes?.spinner" [src]="spinnerSrc" style="margin-top:1em;margin-bottom:1em;">
                    </td>
                </tr>
                <tr class="flxuidatatablerow" id="flxdatatable_singlerow" *ngFor="let data of displayData | async;let i=index">
                    <!-- Numbers -->
                    <td class="{{ classes?.tableData }}" *ngIf="!hideNumbers" style="color: #999;">{{ offset+i }}</td>
                    <!-- Main -->
                    <td class="{{ classes?.tableData }}" *ngFor="let dataKey of dataKeys;let x=index">
                        <img *ngIf="hasImageEmbeded() && x==embedPictures?.index" [class]="'img-fall-back ' +embedPictures?.class" [src]="embedPictures?.rootFolder+data[dataKey]" [flx-ui-datatable-img-fallback]="embedPictures?.fallbackUrl" >
                        <span *ngIf="!hasImageEmbeded() || x!=embedPictures?.index">{{ data[dataKey] }}</span>
                    </td>
                    <!-- Buttons -->
                    <td class="table-buttons" *ngIf="hasActionButtons" scope="row">
                        <span *ngFor="let aButton of actionButtons;let buttonIndex=index">
                            <button (click)="actionButtonClicked(i,buttonIndex)" class="btn {{ aButton?.class }}">
                                <div class="toltip" class="flx-tooltip" [ngClass]="{'flx-tooltip-left':aButton?.tooltipPosition=='left','flx-tooltip-bottom':aButton?.tooltipPosition=='bottom','flx-tooltip-right':aButton?.tooltipPosition=='right'}" *ngIf="aButton?.tooltip">{{ aButton?.tooltip }}</div>
                                <span class="action-button-icon-left" [class]="aButton?.icon" *ngIf="!aButton?.iconPosition || aButton?.iconPosition!='right'"></span>
                                <span class="button-text"> {{ aButton?.text }} </span>
                                <span [class]="aButton?.icon" *ngIf="aButton?.iconPosition=='right'"></span>
                            </button>
                        </span> 
                        <input type="checkbox" checked (change)="addRemoveDeleteItem(data[multipleSelectKey],i,$event?.target?.checked)" *ngIf="enableMultipleSelection && service?.multipleDeletion?.length>0">
                    </td>
                </tr>
                <tr *ngIf="tData?.length<1">
                    <td colspan="10" class="text-center" *ngIf="service?.loadFinish">
                        <span style="color:#ff0000;font-size:13px;">No data found</span> <br>
                        <button style="margin-top:1em;" (click)="reload()" class="btn btn-default {{ classes?.reloadbutton }}" color="primary"><span class="fa fa-refresh"></span> Reload</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="col-md-12 rmpd flx-total-data" *ngIf="showBottomInfo">
            <div class="col-md-4 text-left rmpd">Total pagination: <span> {{ service?.totalItems | ceil: limit }}</span></div>
            <div class="col-md-4 text-center rmpd"># of items per pagination: <span>{{ limit }}</span></div>
            <div class="col-md-4 text-right rmpd">Total items: <span>{{ (service?.flxData | async)?.length }}</span></div>
        </div>
    </div>
</div>`,
                styles: [`.flx-ui-datatable-main{background-color:#fff;padding-top:1em;padding-bottom:1em}.flx-ui-datatable-main .btn-danger{background-color:#f50057;border:1px solid #f50057;box-shadow:0 3px 5px 1px #ddd;-moz-box-shadow:0 3px 5px 1px #ddd;-webkit-box-shadow:0 3px 5px 1px #ddd;-o-box-shadow:0 3px 5px 1px #ddd;-ms-box-shadow:0 3px 5px 1px #ddd;border-radius:3px;margin-left:.3em}.flx-ui-datatable-main img.img-fall-back{width:30px;height:30px}.flx-ui-datatable-main .pagination-select input[type=text],.flx-ui-datatable-main .pagination-select select,.flx-ui-datatable-main .search-bar input[type=text],.flx-ui-datatable-main .search-bar select{border-top:none!important;border-left:none!important;border-right:none!important;border-bottom:2px solid #ddd!important;border-radius:0!important;box-shadow:0 0 0 0 transparent!important;-moz-box-shadow:0 0 0 0 transparent!important;-webkit-box-shadow:0 0 0 0 transparent!important;-o-box-shadow:0 0 0 0 transparent!important;-ms-box-shadow:0 0 0 0 transparent!important}.flx-ui-datatable-main .pagination-select input[type=text]:focus,.flx-ui-datatable-main .pagination-select select:focus,.flx-ui-datatable-main .search-bar input[type=text]:focus,.flx-ui-datatable-main .search-bar select:focus{border-bottom-color:#359!important;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .pagination-select select,.flx-ui-datatable-main .search-bar select{-webkit-appearance:none;appearance:none;-moz-appearance:none}.flx-ui-datatable-main .flx-datatable-pagination{padding-top:.5em}.flx-ui-datatable-main .flx-datatable-pagination button{width:35px!important;height:35px!important;border-radius:50em!important;border:none!important;box-shadow:0 3px 10px 0 #b3c4e6;-moz-box-shadow:0 3px 10px 0 #b3c4e6;-webkit-box-shadow:0 3px 10px 0 #b3c4e6;-o-box-shadow:0 3px 10px 0 #b3c4e6;-ms-box-shadow:0 3px 10px 0 #b3c4e6;background-color:#359;color:#fff;font-size:23px;font-weight:700;position:absolute;top:0}.flx-ui-datatable-main .flx-datatable-pagination button:first-child{left:0}.flx-ui-datatable-main .flx-datatable-pagination button:first-child .flx-datatable-tooltip-prev{position:absolute;left:0;font-size:13px;font-weight:400;color:#fff;background-color:#359;padding-left:.3em;padding-right:.3em;border-radius:3px;margin-left:-57px;margin-top:.5em;box-shadow:0 3px 10px 0 #b3c4e6!important;-moz-box-shadow:0 3px 10px 0 #b3c4e6!important;-webkit-box-shadow:0 3px 10px 0 #b3c4e6!important;-o-box-shadow:0 3px 10px 0 #b3c4e6!important;-ms-box-shadow:0 3px 10px 0 #b3c4e6!important;visibility:hidden}.flx-ui-datatable-main .flx-datatable-pagination button:hover>span.flx-datatable-tooltip-next,.flx-ui-datatable-main .flx-datatable-pagination button:hover>span.flx-datatable-tooltip-prev{visibility:visible}.flx-ui-datatable-main .flx-datatable-pagination .flx-pagination-end{background-color:#f50057!important;box-shadow:0 3px 10px 0 #ffc2d8!important;-moz-box-shadow:0 3px 10px 0 #ffc2d8!important;-webkit-box-shadow:0 3px 10px 0 #ffc2d8!important;-o-box-shadow:0 3px 10px 0 #ffc2d8!important;-ms-box-shadow:0 3px 10px 0 #ffc2d8!important;cursor:not-allowed}.flx-ui-datatable-main .flx-datatable-pagination .flx-pagination-end:hover>span.flx-datatable-tooltip-next,.flx-ui-datatable-main .flx-datatable-pagination .flx-pagination-end:hover>span.flx-datatable-tooltip-prev{visibility:hidden}.flx-ui-datatable-main .flx-datatable-pagination button:last-child{right:0}.flx-ui-datatable-main .flx-datatable-pagination button:last-child .flx-datatable-tooltip-next{position:absolute;left:0;font-size:13px;font-weight:400;color:#fff;background-color:#359;padding-left:.3em;padding-right:.3em;border-radius:3px;margin-left:35px;margin-top:.5em;box-shadow:0 3px 10px 0 #b3c4e6!important;-moz-box-shadow:0 3px 10px 0 #b3c4e6!important;-webkit-box-shadow:0 3px 10px 0 #b3c4e6!important;-o-box-shadow:0 3px 10px 0 #b3c4e6!important;-ms-box-shadow:0 3px 10px 0 #b3c4e6!important;visibility:hidden}.flx-ui-datatable-main .export-cnt button{border-radius:50em!important}.flx-ui-datatable-main table{margin-top:1.5em}.flx-ui-datatable-main table tbody tr{padding-top:0!important}.flx-ui-datatable-main table tbody tr td{padding-top:.5em;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0}.flx-ui-datatable-main table tbody tr td button{margin-right:.3em;margin-left:0}.flx-ui-datatable-main table tbody tr td button div.flx-tooltip{position:absolute;background-color:rgba(32,27,27,.808);text-align:center;font-size:13px;color:#fff;border-radius:3px;box-shadow:0 3px 20px 0 #4b4949;-moz-box-shadow:0 3px 20px 0 #4b4949;-webkit-box-shadow:0 3px 20px 0 #4b4949;-o-box-shadow:0 3px 20px 0 #4b4949;-ms-box-shadow:0 3px 20px 0 #4b4949;margin-left:-2.5em;margin-top:-2.8em;visibility:hidden;width:80px;padding:.3em .5em}.flx-ui-datatable-main table tbody tr td button .flx-tooltip-left{margin-left:-95px!important;margin-top:-.3em!important}.flx-ui-datatable-main table tbody tr td button .flx-tooltip-bottom{margin-top:2.3em!important}.flx-ui-datatable-main table tbody tr td button .flx-tooltip-right{margin-left:28px!important;margin-top:-.3em!important}.flx-ui-datatable-main table tbody tr td button:hover>div.flx-tooltip{transition:.3s;visibility:visible}.flx-ui-datatable-main table tbody tr td.table-buttons{padding-top:.2em;padding-bottom:.2em}.flx-ui-datatable-main table tbody tr:nth-of-type(even){background-color:#f8f9fa}.flx-ui-datatable-main table tbody tr:nth-of-type(odd){background-color:#fff}.flx-ui-datatable-main .btn-danger:hover{background-color:#ff146b;border:1px solid #ff146b;box-shadow:0 3px 10px 1px #ff5fb6;-moz-box-shadow:0 3px 10px 1px #ff5fb6;-webkit-box-shadow:0 3px 10px 1px #ff5fb6;-o-box-shadow:0 3px 10px 1px #ff5fb6;-ms-box-shadow:0 3px 10px 1px #ff5fb6;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .btn-danger:focus{background-color:#f50057;border:1px solid #f50057}.flx-ui-datatable-main .btn-white{background-color:#fff}.flx-ui-datatable-main .btn-dark{background-color:#222!important}.flx-ui-datatable-main .btn-primary{background-color:#359;color:#fff;border:1px solid #359;box-shadow:0 3px 5px 1px #ddd;-moz-box-shadow:0 3px 5px 1px #ddd;-webkit-box-shadow:0 3px 5px 1px #ddd;-o-box-shadow:0 3px 5px 1px #ddd;-ms-box-shadow:0 3px 5px 1px #ddd;border-radius:3px}.flx-ui-datatable-main .btn-primary:hover{background-color:#4769ad;border:1px solid #4769ad;box-shadow:0 3px 10px 0 #b3c4e6;-moz-box-shadow:0 3px 10px 0 #b3c4e6;-webkit-box-shadow:0 3px 10px 0 #b3c4e6;-o-box-shadow:0 3px 10px 0 #b3c4e6;-ms-box-shadow:0 3px 10px 0 #b3c4e6;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .btn-primary:focus{background-color:#359;border:1px solid #359}.flx-ui-datatable-main .btn-large{padding-top:1em!important;padding-bottom:1em!important}.flx-ui-datatable-main .btn-medium{padding-top:.7em!important;padding-bottom:.7em!important}.flx-ui-datatable-main .btn-success{box-shadow:0 3px 5px 1px #ddd;-moz-box-shadow:0 3px 5px 1px #ddd;-webkit-box-shadow:0 3px 5px 1px #ddd;-o-box-shadow:0 3px 5px 1px #ddd;-ms-box-shadow:0 3px 5px 1px #ddd;border-radius:3px;background-color:#5cb85c;border:1px solid #5cb85c}.flx-ui-datatable-main .btn-success:hover{background-color:#70cc70;border:1px solid #70cc70;box-shadow:0 3px 10px 1px #9df99d;-moz-box-shadow:0 3px 10px 1px #9df99d;-webkit-box-shadow:0 3px 10px 1px #9df99d;-o-box-shadow:0 3px 10px 1px #9df99d;-ms-box-shadow:0 3px 10px 1px #9df99d;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .btn-success:focus{background-color:#5cb85c;border:1px solid #5cb85c}.flx-ui-datatable-main .btn-default{background-color:#fff;box-shadow:0 3px 5px 1px #eee;-moz-box-shadow:0 3px 5px 1px #eee;-webkit-box-shadow:0 3px 5px 1px #eee;-o-box-shadow:0 3px 5px 1px #eee;-ms-box-shadow:0 3px 5px 1px #eee;border-radius:3px;border:1px solid #ddd}.flx-ui-datatable-main .btn-default:hover{background-color:#fff;border:1px solid #e7e7e7;box-shadow:0 3px 10px 1px #e2e2e2;-moz-box-shadow:0 3px 10px 1px #e2e2e2;-webkit-box-shadow:0 3px 10px 1px #e2e2e2;-o-box-shadow:0 3px 10px 1px #e2e2e2;-ms-box-shadow:0 3px 10px 1px #e2e2e2;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .btn-default:focus{background-color:#fff;border:1px solid #ddd}.flx-ui-datatable-main .btn-secondary{box-shadow:0 3px 5px 1px #ddd;-moz-box-shadow:0 3px 5px 1px #ddd;-webkit-box-shadow:0 3px 5px 1px #ddd;-o-box-shadow:0 3px 5px 1px #ddd;-ms-box-shadow:0 3px 5px 1px #ddd;border-radius:3px;background-color:#1e88e5;color:#fff}.flx-ui-datatable-main .btn-secondary:hover{color:#fff;background-color:#2892ef;border:1px solid #2892ef;box-shadow:0 3px 10px 1px #55bfff;-moz-box-shadow:0 3px 10px 1px #55bfff;-webkit-box-shadow:0 3px 10px 1px #55bfff;-o-box-shadow:0 3px 10px 1px #55bfff;-ms-box-shadow:0 3px 10px 1px #55bfff;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;-ms-transition:.5s}.flx-ui-datatable-main .btn-secondary:focus{color:#fff}.flx-ui-datatable-main .pagination-button{background-color:#359;color:#fff}.flx-ui-datatable-main .table-font{font-family:Khula,sans-serif!important}.flx-ui-datatable-main .table-header-icon{position:absolute;right:.2em;width:80px;height:80px;font-size:50px;margin-top:-30px;border-radius:5px!important}.flx-ui-datatable-main .table-title{background-color:#359;color:#fff;border-radius:2px;padding:1em;font-size:15px;font-weight:700;margin-bottom:1.5em;font-family:Roboto,sans-serif;box-shadow:0 1px 5px 1px #ddd;-moz-box-shadow:0 1px 5px 1px #ddd;-webkit-box-shadow:0 1px 5px 1px #ddd;-o-box-shadow:0 1px 5px 1px #ddd;-ms-box-shadow:0 1px 5px 1px #ddd}.flx-ui-datatable-main .danger{background-color:#f50057;color:#fff}.flx-ui-datatable-main .primary{background-color:#359;color:#fff}.flx-ui-datatable-main .success{background-color:#5cb85c;color:#fff}.flx-ui-datatable-main .default{background-color:#fff;color:#000}.flx-ui-datatable-main .secondary{background-color:#1e88e5;color:#fff}.flx-ui-datatable-main .btn-clear{border:none!important;box-shadow:none!important}.flx-ui-datatable-main .input-group,.flx-ui-datatable-main .input-group input{background-color:transparent!important}.flx-ui-datatable-main .input-group-addon{border:none!important;padding:0!important;box-shadow:none!important;background-color:transparent!important}.flx-ui-datatable-main .input-group-addon button{border:1px solid transparent!important;box-shadow:none!important;border-top:none!important;border-bottom:none!important;background-color:transparent!important;border-radius:50em!important;color:#359;width:30px;height:30px}.flx-ui-datatable-main .input-group-addon button i{font-size:18px}.flx-ui-datatable-main .input-group-addon button:disabled{background-color:transparent!important}.flx-ui-datatable-main .input-group-addon button:disabled i{color:#f50057}`]
            },] },
];
/** @nocollapse */
FlxUiDatatableComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: FlxUiDatatableService }
];
FlxUiDatatableComponent.propDecorators = {
    classes: [{ type: Input }],
    headers: [{ type: Input }],
    lazyloadingConfig: [{ type: Input }],
    embedPictures: [{ type: Input }],
    dataKeys: [{ type: Input }],
    enableDataExports: [{ type: Input }],
    dataExportsConfig: [{ type: Input }],
    showBottomInfo: [{ type: Input }],
    searchKeys: [{ type: Input }],
    dataSrcKey: [{ type: Input }],
    hasActionButtons: [{ type: Input }],
    hideNumbers: [{ type: Input }],
    enableMultipleSelection: [{ type: Input }],
    multipleSelectKey: [{ type: Input }],
    hasAddButton: [{ type: Input }],
    dataUrl: [{ type: Input }],
    actionButtonStart: [{ type: Input }],
    multipleSelectButton: [{ type: Input }],
    searchPlaceholder: [{ type: Input }],
    actionHeader: [{ type: Input }],
    limit: [{ type: Input }],
    spinnerSrc: [{ type: Input }],
    actionButtons: [{ type: Input }],
    paginationButtons: [{ type: Input }],
    tableHeader: [{ type: Input }],
    searchButton: [{ type: Input }],
    addButton: [{ type: Input }],
    searchBar: [{ type: Input }],
    firstActionButtonClicked: [{ type: Output }],
    secondActionButtonClicked: [{ type: Output }],
    thirdActionButtonClicked: [{ type: Output }],
    multipleSelectClicked: [{ type: Output }],
    addButtonClicked: [{ type: Output }]
};
function FlxUiDatatableComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FlxUiDatatableComponent.prototype.classes;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.headers;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.lazyloadingConfig;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.embedPictures;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.dataKeys;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.enableDataExports;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.dataExportsConfig;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.showBottomInfo;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchKeys;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.dataSrcKey;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.hasActionButtons;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.hideNumbers;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.enableMultipleSelection;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.multipleSelectKey;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.hasAddButton;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.dataUrl;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.actionButtonStart;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.multipleSelectButton;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchPlaceholder;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.actionHeader;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.limit;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.spinnerSrc;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.actionButtons;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.paginationButtons;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.tableHeader;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchButton;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.addButton;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchBar;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.firstActionButtonClicked;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.secondActionButtonClicked;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.thirdActionButtonClicked;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.multipleSelectClicked;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.addButtonClicked;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.isExportAll;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchForm;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.tData;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.behavior;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.searchDataTempOffset;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.displayData;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.offset;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.reloadUrl;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.__form;
    /** @type {?} */
    FlxUiDatatableComponent.prototype.service;
}
import { Directive, ElementRef } from '@angular/core';
export class ImageFallBack {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.isApplied = false;
        this.EVENT_TYPE = 'error';
        this.el = el.nativeElement;
        this.el.addEventListener(this.EVENT_TYPE, this.onError.bind(this));
    }
    /**
     * @return {?}
     */
    onError() {
        this.removeEvents();
        if (!this.isApplied) {
            this.isApplied = true;
            this.el.setAttribute('src', this.imgSrc);
        }
    }
    /**
     * @return {?}
     */
    removeEvents() {
        this.el.removeEventListener(this.EVENT_TYPE, this.onError);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeEvents();
    }
}
ImageFallBack.decorators = [
    { type: Directive, args: [{
                selector: '[flx-ui-datatable-img-fallback]'
            },] },
];
/** @nocollapse */
ImageFallBack.ctorParameters = () => [
    { type: ElementRef }
];
ImageFallBack.propDecorators = {
    imgSrc: [{ type: Input, args: ['flx-ui-datatable-img-fallback',] }]
};
function ImageFallBack_tsickle_Closure_declarations() {
    /** @type {?} */
    ImageFallBack.prototype.imgSrc;
    /** @type {?} */
    ImageFallBack.prototype.el;
    /** @type {?} */
    ImageFallBack.prototype.isApplied;
    /** @type {?} */
    ImageFallBack.prototype.EVENT_TYPE;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbHgtdWktZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2ZseC11aS1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQVksVUFBVSxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFFO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFFO0FBRXBFLE9BQU8sRUFBRSxlQUFlLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBaUhqRSxNQUFNOzs7OztJQTZDSixZQUFtQixNQUFtQixFQUFRLE9BQThCO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQWE7UUFBUSxZQUFPLEdBQVAsT0FBTyxDQUF1Qjt1QkE1Q3BELEVBQUU7dUJBQ1EsRUFBRTtpQ0FDRixFQUFFOzZCQUNOLEVBQUU7d0JBQ0csRUFBRTtpQ0FDQyxLQUFLO2lDQUNULEVBQUU7MEJBRWQsRUFBRTswQkFDTSxFQUFFO2dDQUNLLEtBQUs7MkJBQ1YsS0FBSzt1Q0FDTyxLQUFLO2lDQUNaLEVBQUU7NEJBQ04sS0FBSzt1QkFDWCxFQUFFO2lDQUNTLEtBQUs7b0NBQ1gsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7aUNBQ3pCLHNCQUFzQjs0QkFDM0IsU0FBUztxQkFDaEIsRUFBRTswQkFDQSxFQUFFOzZCQUNXLEVBQUU7aUNBQ1IsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUM7MkJBQ2hELEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDOzRCQUN6QyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsU0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpYlQsT0FBTyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUU7QUFJcEQsTUFBTTs7OztJQU1GLFlBQVksRUFBYzt5QkFIRyxLQUFLOzBCQUNMLE9BQU87UUFHbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQ25FOzs7O0lBRU8sT0FBTztRQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUM7Ozs7O0lBR0ssWUFBWTtRQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUc3RCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQ0FBaUM7YUFDOUM7Ozs7WUFIaUIsVUFBVTs7O3FCQUt2QixLQUFLLFNBQUMsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLCBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLFZhbGlkYXRvcnMsRm9ybUJ1aWxkZXJ9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJyA7XG5pbXBvcnQgeyBGbHhVaURhdGF0YWJsZVNlcnZpY2UgfSBmcm9tICcuL2ZseC11aS1kYXRhdGFibGUuc2VydmljZScgO1xuaW1wb3J0IHsgQXN5bmNQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJyA7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuZGVjbGFyZSB2YXIgcHJpbnRKUzogYW55IDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjonZmx4LXVpLWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBmbHgtdWktZGF0YXRhYmxlLW1haW4ge3sgY2xhc3Nlcz8ubWFpbmNvbnRhaW5lciB9fVwiPlxuICAgIDxkaXYgaWQ9XCJleHBvcnRfbG9hZGluZ1wiIGNsYXNzPVwiY29sLW1kLTEyIHRleHQtY2VudGVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO21hcmdpbi1ib3R0b206MC41ZW07Y29sb3I6I2RkZGRkZDtmb250LXNpemU6MTNweDtmb250LXdlaWdodDpib2xkO1wiPkV4cG9ydGluZy4uLjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgZmx4LXVpLWRhdGF0YWJsZS1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGNvbC1zbS0zIHBhZ2luYXRpb24tc2VsZWN0IGNvbC1tZC0yXCIgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OiAxO1wiPlxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBybXNoIHJtcmQge3sgY2xhc3Nlcz8ucGFnaW5hdGlvbnNlbGVjdCB9fVwiIChjaGFuZ2UpPVwicGFnaW5hdGVEYXRhdGFibGUoJGV2ZW50Py50YXJnZXQ/LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHBhZ2luZyBvZiBzZXJ2aWNlPy5wYWdpbmF0aW9uXCIgW3ZhbHVlXT1cInBhZ2luZz8udmFsdWVcIj57eyBwYWdpbmc/LmxhYmVsIH19PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNSBjb2wtc20tNSBjb2wtbWQtMiB0ZXh0LWNlbnRlciBmbHgtZGF0YXRhYmxlLXBhZ2luYXRpb24gcm1wZFwiIHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDogMjtcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFtuZ0NsYXNzXT1cInsnZmx4LXBhZ2luYXRpb24tZW5kJzogZGlzYWJsZVByZXZ0QnV0dG9uKCl9XCIgKGNsaWNrKT1cIm5leHRQcmV2SXRlbSgncHJldicpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVQcmV2dEJ1dHRvbigpXCIgY2xhc3M9XCJmbHgtdWktZGF0YXRhYmxlLXBhZ2luYXRpb24tYnV0dG9ucyB7eyBjbGFzc2VzPy5wYWdpbmF0aW9uQnV0dG9uIH19XCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtbGVmdCBmYS0xeFwiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmbHgtZGF0YXRhYmxlLXRvb2x0aXAtcHJldlwiIFtuZ0NsYXNzXT1cInsnZmx4LXBhZ2luYXRpb24tZW5kJzogZGlzYWJsZVByZXZ0QnV0dG9uKCl9XCI+UHJldmlvdXM8L3NwYW4+IDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHt7IHNlcnZpY2U/LmRhdGFPZmZzZXQgfCBjZWlsOiBsaW1pdCB9fSAvIHt7IHNlcnZpY2U/LnRvdGFsSXRlbXMgfCBjZWlsOiBsaW1pdCB9fVxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW25nQ2xhc3NdPVwieydmbHgtcGFnaW5hdGlvbi1lbmQnOiBkaXNhYmxlTmV4dEJ1dHRvbigpfVwiIChjbGljayk9XCJuZXh0UHJldkl0ZW0oJ25leHQnKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlTmV4dEJ1dHRvbigpXCIgY2xhc3M9XCJmbHgtdWktZGF0YXRhYmxlLXBhZ2luYXRpb24tYnV0dG9ucyB7eyBjbGFzc2VzPy5wYWdpbmF0aW9uQnV0dG9uIH19XCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHQgZmEtMXhcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiZmx4LWRhdGF0YWJsZS10b29sdGlwLW5leHRcIiBbbmdDbGFzc109XCJ7J2ZseC1wYWdpbmF0aW9uLWVuZCc6IGRpc2FibGVOZXh0QnV0dG9uKCl9XCI+TmV4dDwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgW2NsYXNzXT1cIidzZWFyY2gtYmFyICcrZ2V0U2VhcmNoQ29sdW1ucygpXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAqbmdJZj1cIiFpc0xhenlsb2FkaW5nRW5hYmxlZCgpXCIgW3N0eWxlLmJhY2tncm91bmRdPVwic2VhcmNoQmFyPy5iYWNrZ3JvdW5kXCIgW3N0eWxlLmNvbG9yXT1cInNlYXJjaEJhcj8udGV4dENvbG9yXCIgW25nU3R5bGVdPVwie2JvcmRlcjpzZWFyY2hCYXI/LmJvcmRlclNpemUgKycgc29saWQgJysgc2VhcmNoQmFyPy5ib3JkZXJDb2xvcn0gXCIgKGtleXVwKT1cImZpbHRlckRhdGEoJGV2ZW50Py50YXJnZXQ/LnZhbHVlKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHJtc2ggcm1yZCBjdXN0b21jbGFzc1wiIFtwbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cInNlYXJjaERhdGFJbkFwaShzcmNoPy52YWx1ZSxzcmNoKVwiICNzcmNoPVwibmdGb3JtXCIgKm5nSWY9XCJpc0xhenlsb2FkaW5nRW5hYmxlZCgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlcXVpcmVkIG5hbWU9XCJzZWFyY2hTdHJpbmdcIiBuZ01vZGVsIFtzdHlsZS5iYWNrZ3JvdW5kXT1cInNlYXJjaEJhcj8uYmFja2dyb3VuZFwiIFtzdHlsZS5jb2xvcl09XCJzZWFyY2hCYXI/LnRleHRDb2xvclwiIFtuZ1N0eWxlXT1cIntib3JkZXI6c2VhcmNoQmFyPy5ib3JkZXJTaXplICsnIHNvbGlkICcrIHNlYXJjaEJhcj8uYm9yZGVyQ29sb3J9IFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHJtc2ggcm1yZCB7eyBjbGFzc2VzPy5zZWFyY2hiYXIgfX1cIiBbcGxhY2Vob2xkZXJdPVwic2VhcmNoUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiIXNyY2g/LnZhbGlkXCIgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1jbGVhciBidG4tbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEgdGV4dC1yaWdodCBybXBkXCIgKm5nSWY9XCJoYXNBZGRCdXR0b25cIj5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImFkZEJ1dHRvbkNsaWNrKClcIiBjbGFzcz1cInt7IGNsYXNzZXM/LmFkZEJ1dHRvbiB9fVwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImFkZEJ1dHRvbj8uYmFja2dyb3VuZFwiIFtzdHlsZS5ib3JkZXJDb2xvcl09XCJhZGRCdXR0b24/LmJhY2tncm91bmRcIiBbc3R5bGUuY29sb3JdPVwiYWRkQnV0dG9uPy50ZXh0Q29sb3JcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj4gQWRkPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEgdGV4dC1yaWdodCBybXBkIGV4cG9ydC1jbnRcIiAqbmdJZj1cImVuYWJsZURhdGFFeHBvcnRzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB7eyBjbGFzc2VzPy5leHBvcnRCdXR0b24gfX0gZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImNhcmV0XCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1leHBvcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24taGVhZGVyXCI+e3sgZGF0YUV4cG9ydHNDb25maWc/LnRpdGxlIH19LiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJjaGVja1RvRXhwb3J0T3B0aW9uKCRldmVudD8udGFyZ2V0Py5jaGVja2VkKVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO3RvcDowLjNlbTtcIj4gPHN1cCBzdHlsZT1cImZvbnQtc2l6ZToxMHB4O2NvbG9yOiM5OTk7XCI+IEFsbDwvc3VwPjwvbGk+IFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiICpuZ0Zvcj1cImxldCBleHBvcnQgb2YgZGF0YUV4cG9ydHNDb25maWc/LmV4cG9ydHNUb1wiIChjbGljayk9XCJleHBvcnREb2N1bWVudHNBcyhleHBvcnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKm5nSWY9XCJleHBvcnQ9PSdwcmludCdcIj48aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcHJpbnRcIj48L2k+IFByaW50PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiICpuZ0lmPVwiZXhwb3J0PT0ncGRmJ1wiIHN0eWxlPVwiY29sb3I6I2ZmMDAwMFwiPjxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1maWxlXCI+PC9pPiBQREY8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKm5nSWY9XCJleHBvcnQ9PSdleGNlbCdcIiBzdHlsZT1cImNvbG9yOiMwMDk5MDA7XCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWZpbGVcIj48L2k+IEV4Y2VsPC9hPiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiICpuZ0lmPVwiZXhwb3J0PT0nd29yZCdcIiBzdHlsZT1cImNvbG9yOiMzMzU1OTk7XCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWZpbGVcIj48L2k+IFdvcmQ8L2E+ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICAqbmdJZj1cIiFpc0V4cG9ydEFsbFwiPnt7IChkaXNwbGF5RGF0YSB8IGFzeW5jKT8ubGVuZ3RoIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gICpuZ0lmPVwiaXNFeHBvcnRBbGxcIj57eyAoc2VydmljZT8uZmx4RGF0YSB8IGFzeW5jKT8ubGVuZ3RoIH19PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHJtcGQgdGFibGUtcmVzcG9uc2l2ZVwiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB7eyBjbGFzc2VzPy50YWJsZVR5cGUgfX0gdGFibGUtcmVzcG9uc2l2ZVwiIGlkPVwiZmx4X3VpX3RhYmxlX3RhZ1wiPlxuICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwie3sgY2xhc3Nlcz8udGFibGVIZWFkZXIgfX1cIj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCAqbmdJZj1cIiFoaWRlTnVtYmVyc1wiPk48c3VwPjx1Pm88L3U+PC9zdXA+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBoZWFkZXIgb2YgaGVhZGVyc1wiPnt7IGhlYWRlciB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCAqbmdJZj1cImhhc0FjdGlvbkJ1dHRvbnNcIj57eyBhY3Rpb25IZWFkZXIgfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwic2VydmljZT8ubXVsdGlwbGVEZWxldGlvbj8ubGVuZ3RoPjBcIiAoY2hhbmdlKT1cImFkZFJlbW92ZSgkZXZlbnQ/LnRhcmdldD8uY2hlY2tlZClcIiAqbmdJZj1cImVuYWJsZU11bHRpcGxlU2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzIGZseC1tdWx0aXBsZS1kZWxldGlvbi1idXR0b25cIiAqbmdJZj1cImVuYWJsZU11bHRpcGxlU2VsZWN0aW9uICYmIHNlcnZpY2U/Lm11bHRpcGxlRGVsZXRpb24/Lmxlbmd0aD4wXCIgKGNsaWNrKT1cImNvbmZpcm1EZWxldGUoKVwiPjxzcGFuIFtjbGFzc109XCJtdWx0aXBsZVNlbGVjdEJ1dHRvbj8uaWNvblwiPjwvc3Bhbj4ge3sgbXVsdGlwbGVTZWxlY3RCdXR0b24/LnRleHQgfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nSWY9XCIhc2VydmljZT8ubG9hZEZpbmlzaFwiPiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMjBcIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwic3Bpbm5lclNyY1wiIFtjbGFzc109XCJjbGFzc2VzPy5zcGlubmVyXCIgW3NyY109XCJzcGlubmVyU3JjXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjFlbTttYXJnaW4tYm90dG9tOjFlbTtcIj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImZseHVpZGF0YXRhYmxlcm93XCIgaWQ9XCJmbHhkYXRhdGFibGVfc2luZ2xlcm93XCIgKm5nRm9yPVwibGV0IGRhdGEgb2YgZGlzcGxheURhdGEgfCBhc3luYztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIE51bWJlcnMgLS0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInt7IGNsYXNzZXM/LnRhYmxlRGF0YSB9fVwiICpuZ0lmPVwiIWhpZGVOdW1iZXJzXCIgc3R5bGU9XCJjb2xvcjogIzk5OTtcIj57eyBvZmZzZXQraSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gTWFpbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwie3sgY2xhc3Nlcz8udGFibGVEYXRhIH19XCIgKm5nRm9yPVwibGV0IGRhdGFLZXkgb2YgZGF0YUtleXM7bGV0IHg9aW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgKm5nSWY9XCJoYXNJbWFnZUVtYmVkZWQoKSAmJiB4PT1lbWJlZFBpY3R1cmVzPy5pbmRleFwiIFtjbGFzc109XCInaW1nLWZhbGwtYmFjayAnICtlbWJlZFBpY3R1cmVzPy5jbGFzc1wiIFtzcmNdPVwiZW1iZWRQaWN0dXJlcz8ucm9vdEZvbGRlcitkYXRhW2RhdGFLZXldXCIgW2ZseC11aS1kYXRhdGFibGUtaW1nLWZhbGxiYWNrXT1cImVtYmVkUGljdHVyZXM/LmZhbGxiYWNrVXJsXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaGFzSW1hZ2VFbWJlZGVkKCkgfHwgeCE9ZW1iZWRQaWN0dXJlcz8uaW5kZXhcIj57eyBkYXRhW2RhdGFLZXldIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEJ1dHRvbnMgLS0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRhYmxlLWJ1dHRvbnNcIiAqbmdJZj1cImhhc0FjdGlvbkJ1dHRvbnNcIiBzY29wZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGFCdXR0b24gb2YgYWN0aW9uQnV0dG9ucztsZXQgYnV0dG9uSW5kZXg9aW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJhY3Rpb25CdXR0b25DbGlja2VkKGksYnV0dG9uSW5kZXgpXCIgY2xhc3M9XCJidG4ge3sgYUJ1dHRvbj8uY2xhc3MgfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvbHRpcFwiIGNsYXNzPVwiZmx4LXRvb2x0aXBcIiBbbmdDbGFzc109XCJ7J2ZseC10b29sdGlwLWxlZnQnOmFCdXR0b24/LnRvb2x0aXBQb3NpdGlvbj09J2xlZnQnLCdmbHgtdG9vbHRpcC1ib3R0b20nOmFCdXR0b24/LnRvb2x0aXBQb3NpdGlvbj09J2JvdHRvbScsJ2ZseC10b29sdGlwLXJpZ2h0JzphQnV0dG9uPy50b29sdGlwUG9zaXRpb249PSdyaWdodCd9XCIgKm5nSWY9XCJhQnV0dG9uPy50b29sdGlwXCI+e3sgYUJ1dHRvbj8udG9vbHRpcCB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFjdGlvbi1idXR0b24taWNvbi1sZWZ0XCIgW2NsYXNzXT1cImFCdXR0b24/Lmljb25cIiAqbmdJZj1cIiFhQnV0dG9uPy5pY29uUG9zaXRpb24gfHwgYUJ1dHRvbj8uaWNvblBvc2l0aW9uIT0ncmlnaHQnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbi10ZXh0XCI+IHt7IGFCdXR0b24/LnRleHQgfX0gPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiYUJ1dHRvbj8uaWNvblwiICpuZ0lmPVwiYUJ1dHRvbj8uaWNvblBvc2l0aW9uPT0ncmlnaHQnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkIChjaGFuZ2UpPVwiYWRkUmVtb3ZlRGVsZXRlSXRlbShkYXRhW211bHRpcGxlU2VsZWN0S2V5XSxpLCRldmVudD8udGFyZ2V0Py5jaGVja2VkKVwiICpuZ0lmPVwiZW5hYmxlTXVsdGlwbGVTZWxlY3Rpb24gJiYgc2VydmljZT8ubXVsdGlwbGVEZWxldGlvbj8ubGVuZ3RoPjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciAqbmdJZj1cInREYXRhPy5sZW5ndGg8MVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiICpuZ0lmPVwic2VydmljZT8ubG9hZEZpbmlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjojZmYwMDAwO2ZvbnQtc2l6ZToxM3B4O1wiPk5vIGRhdGEgZm91bmQ8L3NwYW4+IDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9XCJtYXJnaW4tdG9wOjFlbTtcIiAoY2xpY2spPVwicmVsb2FkKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB7eyBjbGFzc2VzPy5yZWxvYWRidXR0b24gfX1cIiBjb2xvcj1cInByaW1hcnlcIj48c3BhbiBjbGFzcz1cImZhIGZhLXJlZnJlc2hcIj48L3NwYW4+IFJlbG9hZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHJtcGQgZmx4LXRvdGFsLWRhdGFcIiAqbmdJZj1cInNob3dCb3R0b21JbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTQgdGV4dC1sZWZ0IHJtcGRcIj5Ub3RhbCBwYWdpbmF0aW9uOiA8c3Bhbj4ge3sgc2VydmljZT8udG90YWxJdGVtcyB8IGNlaWw6IGxpbWl0IH19PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtY2VudGVyIHJtcGRcIj4jIG9mIGl0ZW1zIHBlciBwYWdpbmF0aW9uOiA8c3Bhbj57eyBsaW1pdCB9fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCB0ZXh0LXJpZ2h0IHJtcGRcIj5Ub3RhbCBpdGVtczogPHNwYW4+e3sgKHNlcnZpY2U/LmZseERhdGEgfCBhc3luYyk/Lmxlbmd0aCB9fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmZseC11aS1kYXRhdGFibGUtbWFpbntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZy10b3A6MWVtO3BhZGRpbmctYm90dG9tOjFlbX0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tZGFuZ2Vye2JhY2tncm91bmQtY29sb3I6I2Y1MDA1Nztib3JkZXI6MXB4IHNvbGlkICNmNTAwNTc7Ym94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW1vei1ib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2RkZDstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkOy1vLWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkOy1tcy1ib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2RkZDtib3JkZXItcmFkaXVzOjNweDttYXJnaW4tbGVmdDouM2VtfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gaW1nLmltZy1mYWxsLWJhY2t7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5wYWdpbmF0aW9uLXNlbGVjdCBpbnB1dFt0eXBlPXRleHRdLC5mbHgtdWktZGF0YXRhYmxlLW1haW4gLnBhZ2luYXRpb24tc2VsZWN0IHNlbGVjdCwuZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5zZWFyY2gtYmFyIGlucHV0W3R5cGU9dGV4dF0sLmZseC11aS1kYXRhdGFibGUtbWFpbiAuc2VhcmNoLWJhciBzZWxlY3R7Ym9yZGVyLXRvcDpub25lIWltcG9ydGFudDtib3JkZXItbGVmdDpub25lIWltcG9ydGFudDtib3JkZXItcmlnaHQ6bm9uZSFpbXBvcnRhbnQ7Ym9yZGVyLWJvdHRvbToycHggc29saWQgI2RkZCFpbXBvcnRhbnQ7Ym9yZGVyLXJhZGl1czowIWltcG9ydGFudDtib3gtc2hhZG93OjAgMCAwIDAgdHJhbnNwYXJlbnQhaW1wb3J0YW50Oy1tb3otYm94LXNoYWRvdzowIDAgMCAwIHRyYW5zcGFyZW50IWltcG9ydGFudDstd2Via2l0LWJveC1zaGFkb3c6MCAwIDAgMCB0cmFuc3BhcmVudCFpbXBvcnRhbnQ7LW8tYm94LXNoYWRvdzowIDAgMCAwIHRyYW5zcGFyZW50IWltcG9ydGFudDstbXMtYm94LXNoYWRvdzowIDAgMCAwIHRyYW5zcGFyZW50IWltcG9ydGFudH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5wYWdpbmF0aW9uLXNlbGVjdCBpbnB1dFt0eXBlPXRleHRdOmZvY3VzLC5mbHgtdWktZGF0YXRhYmxlLW1haW4gLnBhZ2luYXRpb24tc2VsZWN0IHNlbGVjdDpmb2N1cywuZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5zZWFyY2gtYmFyIGlucHV0W3R5cGU9dGV4dF06Zm9jdXMsLmZseC11aS1kYXRhdGFibGUtbWFpbiAuc2VhcmNoLWJhciBzZWxlY3Q6Zm9jdXN7Ym9yZGVyLWJvdHRvbS1jb2xvcjojMzU5IWltcG9ydGFudDt0cmFuc2l0aW9uOi41czstbW96LXRyYW5zaXRpb246LjVzOy13ZWJraXQtdHJhbnNpdGlvbjouNXM7LW8tdHJhbnNpdGlvbjouNXM7LW1zLXRyYW5zaXRpb246LjVzfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLnBhZ2luYXRpb24tc2VsZWN0IHNlbGVjdCwuZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5zZWFyY2gtYmFyIHNlbGVjdHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuZmx4LWRhdGF0YWJsZS1wYWdpbmF0aW9ue3BhZGRpbmctdG9wOi41ZW19LmZseC11aS1kYXRhdGFibGUtbWFpbiAuZmx4LWRhdGF0YWJsZS1wYWdpbmF0aW9uIGJ1dHRvbnt3aWR0aDozNXB4IWltcG9ydGFudDtoZWlnaHQ6MzVweCFpbXBvcnRhbnQ7Ym9yZGVyLXJhZGl1czo1MGVtIWltcG9ydGFudDtib3JkZXI6bm9uZSFpbXBvcnRhbnQ7Ym94LXNoYWRvdzowIDNweCAxMHB4IDAgI2IzYzRlNjstbW96LWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjYjNjNGU2Oy1vLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7LW1zLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7YmFja2dyb3VuZC1jb2xvcjojMzU5O2NvbG9yOiNmZmY7Zm9udC1zaXplOjIzcHg7Zm9udC13ZWlnaHQ6NzAwO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiBidXR0b246Zmlyc3QtY2hpbGR7bGVmdDowfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiBidXR0b246Zmlyc3QtY2hpbGQgLmZseC1kYXRhdGFibGUtdG9vbHRpcC1wcmV2e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo0MDA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMzNTk7cGFkZGluZy1sZWZ0Oi4zZW07cGFkZGluZy1yaWdodDouM2VtO2JvcmRlci1yYWRpdXM6M3B4O21hcmdpbi1sZWZ0Oi01N3B4O21hcmdpbi10b3A6LjVlbTtib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjYjNjNGU2IWltcG9ydGFudDstbW96LWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTYhaW1wb3J0YW50Oy13ZWJraXQtYm94LXNoYWRvdzowIDNweCAxMHB4IDAgI2IzYzRlNiFpbXBvcnRhbnQ7LW8tYm94LXNoYWRvdzowIDNweCAxMHB4IDAgI2IzYzRlNiFpbXBvcnRhbnQ7LW1zLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTYhaW1wb3J0YW50O3Zpc2liaWxpdHk6aGlkZGVufS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiBidXR0b246aG92ZXI+c3Bhbi5mbHgtZGF0YXRhYmxlLXRvb2x0aXAtbmV4dCwuZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5mbHgtZGF0YXRhYmxlLXBhZ2luYXRpb24gYnV0dG9uOmhvdmVyPnNwYW4uZmx4LWRhdGF0YWJsZS10b29sdGlwLXByZXZ7dmlzaWJpbGl0eTp2aXNpYmxlfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiAuZmx4LXBhZ2luYXRpb24tZW5ke2JhY2tncm91bmQtY29sb3I6I2Y1MDA1NyFpbXBvcnRhbnQ7Ym94LXNoYWRvdzowIDNweCAxMHB4IDAgI2ZmYzJkOCFpbXBvcnRhbnQ7LW1vei1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjZmZjMmQ4IWltcG9ydGFudDstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNmZmMyZDghaW1wb3J0YW50Oy1vLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNmZmMyZDghaW1wb3J0YW50Oy1tcy1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjZmZjMmQ4IWltcG9ydGFudDtjdXJzb3I6bm90LWFsbG93ZWR9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuZmx4LWRhdGF0YWJsZS1wYWdpbmF0aW9uIC5mbHgtcGFnaW5hdGlvbi1lbmQ6aG92ZXI+c3Bhbi5mbHgtZGF0YXRhYmxlLXRvb2x0aXAtbmV4dCwuZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5mbHgtZGF0YXRhYmxlLXBhZ2luYXRpb24gLmZseC1wYWdpbmF0aW9uLWVuZDpob3Zlcj5zcGFuLmZseC1kYXRhdGFibGUtdG9vbHRpcC1wcmV2e3Zpc2liaWxpdHk6aGlkZGVufS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiBidXR0b246bGFzdC1jaGlsZHtyaWdodDowfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmZseC1kYXRhdGFibGUtcGFnaW5hdGlvbiBidXR0b246bGFzdC1jaGlsZCAuZmx4LWRhdGF0YWJsZS10b29sdGlwLW5leHR7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzM1OTtwYWRkaW5nLWxlZnQ6LjNlbTtwYWRkaW5nLXJpZ2h0Oi4zZW07Ym9yZGVyLXJhZGl1czozcHg7bWFyZ2luLWxlZnQ6MzVweDttYXJnaW4tdG9wOi41ZW07Ym94LXNoYWRvdzowIDNweCAxMHB4IDAgI2IzYzRlNiFpbXBvcnRhbnQ7LW1vei1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjYjNjNGU2IWltcG9ydGFudDstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTYhaW1wb3J0YW50Oy1vLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTYhaW1wb3J0YW50Oy1tcy1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjYjNjNGU2IWltcG9ydGFudDt2aXNpYmlsaXR5OmhpZGRlbn0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5leHBvcnQtY250IGJ1dHRvbntib3JkZXItcmFkaXVzOjUwZW0haW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gdGFibGV7bWFyZ2luLXRvcDoxLjVlbX0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIHRhYmxlIHRib2R5IHRye3BhZGRpbmctdG9wOjAhaW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gdGFibGUgdGJvZHkgdHIgdGR7cGFkZGluZy10b3A6LjVlbTtib3JkZXItdG9wOjFweCBzb2xpZCAjZjBmMGYwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNmMGYwZjB9LmZseC11aS1kYXRhdGFibGUtbWFpbiB0YWJsZSB0Ym9keSB0ciB0ZCBidXR0b257bWFyZ2luLXJpZ2h0Oi4zZW07bWFyZ2luLWxlZnQ6MH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIHRhYmxlIHRib2R5IHRyIHRkIGJ1dHRvbiBkaXYuZmx4LXRvb2x0aXB7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDMyLDI3LDI3LC44MDgpO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czozcHg7Ym94LXNoYWRvdzowIDNweCAyMHB4IDAgIzRiNDk0OTstbW96LWJveC1zaGFkb3c6MCAzcHggMjBweCAwICM0YjQ5NDk7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDIwcHggMCAjNGI0OTQ5Oy1vLWJveC1zaGFkb3c6MCAzcHggMjBweCAwICM0YjQ5NDk7LW1zLWJveC1zaGFkb3c6MCAzcHggMjBweCAwICM0YjQ5NDk7bWFyZ2luLWxlZnQ6LTIuNWVtO21hcmdpbi10b3A6LTIuOGVtO3Zpc2liaWxpdHk6aGlkZGVuO3dpZHRoOjgwcHg7cGFkZGluZzouM2VtIC41ZW19LmZseC11aS1kYXRhdGFibGUtbWFpbiB0YWJsZSB0Ym9keSB0ciB0ZCBidXR0b24gLmZseC10b29sdGlwLWxlZnR7bWFyZ2luLWxlZnQ6LTk1cHghaW1wb3J0YW50O21hcmdpbi10b3A6LS4zZW0haW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gdGFibGUgdGJvZHkgdHIgdGQgYnV0dG9uIC5mbHgtdG9vbHRpcC1ib3R0b217bWFyZ2luLXRvcDoyLjNlbSFpbXBvcnRhbnR9LmZseC11aS1kYXRhdGFibGUtbWFpbiB0YWJsZSB0Ym9keSB0ciB0ZCBidXR0b24gLmZseC10b29sdGlwLXJpZ2h0e21hcmdpbi1sZWZ0OjI4cHghaW1wb3J0YW50O21hcmdpbi10b3A6LS4zZW0haW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gdGFibGUgdGJvZHkgdHIgdGQgYnV0dG9uOmhvdmVyPmRpdi5mbHgtdG9vbHRpcHt0cmFuc2l0aW9uOi4zczt2aXNpYmlsaXR5OnZpc2libGV9LmZseC11aS1kYXRhdGFibGUtbWFpbiB0YWJsZSB0Ym9keSB0ciB0ZC50YWJsZS1idXR0b25ze3BhZGRpbmctdG9wOi4yZW07cGFkZGluZy1ib3R0b206LjJlbX0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIHRhYmxlIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pe2JhY2tncm91bmQtY29sb3I6I2Y4ZjlmYX0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIHRhYmxlIHRib2R5IHRyOm50aC1vZi10eXBlKG9kZCl7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1kYW5nZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmYxNDZiO2JvcmRlcjoxcHggc29saWQgI2ZmMTQ2Yjtib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICNmZjVmYjY7LW1vei1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICNmZjVmYjY7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICNmZjVmYjY7LW8tYm94LXNoYWRvdzowIDNweCAxMHB4IDFweCAjZmY1ZmI2Oy1tcy1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICNmZjVmYjY7dHJhbnNpdGlvbjouNXM7LW1vei10cmFuc2l0aW9uOi41czstd2Via2l0LXRyYW5zaXRpb246LjVzOy1vLXRyYW5zaXRpb246LjVzOy1tcy10cmFuc2l0aW9uOi41c30uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tZGFuZ2VyOmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2Y1MDA1Nztib3JkZXI6MXB4IHNvbGlkICNmNTAwNTd9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuYnRuLXdoaXRle2JhY2tncm91bmQtY29sb3I6I2ZmZn0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tZGFya3tiYWNrZ3JvdW5kLWNvbG9yOiMyMjIhaW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzM1OTtjb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgIzM1OTtib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2RkZDstbW96LWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW8tYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW1zLWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkO2JvcmRlci1yYWRpdXM6M3B4fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1wcmltYXJ5OmhvdmVye2JhY2tncm91bmQtY29sb3I6IzQ3NjlhZDtib3JkZXI6MXB4IHNvbGlkICM0NzY5YWQ7Ym94LXNoYWRvdzowIDNweCAxMHB4IDAgI2IzYzRlNjstbW96LWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDEwcHggMCAjYjNjNGU2Oy1vLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7LW1zLWJveC1zaGFkb3c6MCAzcHggMTBweCAwICNiM2M0ZTY7dHJhbnNpdGlvbjouNXM7LW1vei10cmFuc2l0aW9uOi41czstd2Via2l0LXRyYW5zaXRpb246LjVzOy1vLXRyYW5zaXRpb246LjVzOy1tcy10cmFuc2l0aW9uOi41c30uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tcHJpbWFyeTpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOiMzNTk7Ym9yZGVyOjFweCBzb2xpZCAjMzU5fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1sYXJnZXtwYWRkaW5nLXRvcDoxZW0haW1wb3J0YW50O3BhZGRpbmctYm90dG9tOjFlbSFpbXBvcnRhbnR9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuYnRuLW1lZGl1bXtwYWRkaW5nLXRvcDouN2VtIWltcG9ydGFudDtwYWRkaW5nLWJvdHRvbTouN2VtIWltcG9ydGFudH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tc3VjY2Vzc3tib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2RkZDstbW96LWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW8tYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW1zLWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzVjYjg1Yztib3JkZXI6MXB4IHNvbGlkICM1Y2I4NWN9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuYnRuLXN1Y2Nlc3M6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzBjYzcwO2JvcmRlcjoxcHggc29saWQgIzcwY2M3MDtib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICM5ZGY5OWQ7LW1vei1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICM5ZGY5OWQ7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICM5ZGY5OWQ7LW8tYm94LXNoYWRvdzowIDNweCAxMHB4IDFweCAjOWRmOTlkOy1tcy1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICM5ZGY5OWQ7dHJhbnNpdGlvbjouNXM7LW1vei10cmFuc2l0aW9uOi41czstd2Via2l0LXRyYW5zaXRpb246LjVzOy1vLXRyYW5zaXRpb246LjVzOy1tcy10cmFuc2l0aW9uOi41c30uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tc3VjY2Vzczpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOiM1Y2I4NWM7Ym9yZGVyOjFweCBzb2xpZCAjNWNiODVjfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2VlZTstbW96LWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZWVlOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNlZWU7LW8tYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNlZWU7LW1zLWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZWVlO2JvcmRlci1yYWRpdXM6M3B4O2JvcmRlcjoxcHggc29saWQgI2RkZH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5idG4tZGVmYXVsdDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZTdlN2U3O2JveC1zaGFkb3c6MCAzcHggMTBweCAxcHggI2UyZTJlMjstbW96LWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggI2UyZTJlMjstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggI2UyZTJlMjstby1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICNlMmUyZTI7LW1zLWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggI2UyZTJlMjt0cmFuc2l0aW9uOi41czstbW96LXRyYW5zaXRpb246LjVzOy13ZWJraXQtdHJhbnNpdGlvbjouNXM7LW8tdHJhbnNpdGlvbjouNXM7LW1zLXRyYW5zaXRpb246LjVzfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1kZWZhdWx0OmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNkZGR9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuYnRuLXNlY29uZGFyeXtib3gtc2hhZG93OjAgM3B4IDVweCAxcHggI2RkZDstbW96LWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW8tYm94LXNoYWRvdzowIDNweCA1cHggMXB4ICNkZGQ7LW1zLWJveC1zaGFkb3c6MCAzcHggNXB4IDFweCAjZGRkO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzFlODhlNTtjb2xvcjojZmZmfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1zZWNvbmRhcnk6aG92ZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMyODkyZWY7Ym9yZGVyOjFweCBzb2xpZCAjMjg5MmVmO2JveC1zaGFkb3c6MCAzcHggMTBweCAxcHggIzU1YmZmZjstbW96LWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggIzU1YmZmZjstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggIzU1YmZmZjstby1ib3gtc2hhZG93OjAgM3B4IDEwcHggMXB4ICM1NWJmZmY7LW1zLWJveC1zaGFkb3c6MCAzcHggMTBweCAxcHggIzU1YmZmZjt0cmFuc2l0aW9uOi41czstbW96LXRyYW5zaXRpb246LjVzOy13ZWJraXQtdHJhbnNpdGlvbjouNXM7LW8tdHJhbnNpdGlvbjouNXM7LW1zLXRyYW5zaXRpb246LjVzfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmJ0bi1zZWNvbmRhcnk6Zm9jdXN7Y29sb3I6I2ZmZn0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5wYWdpbmF0aW9uLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOiMzNTk7Y29sb3I6I2ZmZn0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC50YWJsZS1mb250e2ZvbnQtZmFtaWx5OktodWxhLHNhbnMtc2VyaWYhaW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLnRhYmxlLWhlYWRlci1pY29ue3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi4yZW07d2lkdGg6ODBweDtoZWlnaHQ6ODBweDtmb250LXNpemU6NTBweDttYXJnaW4tdG9wOi0zMHB4O2JvcmRlci1yYWRpdXM6NXB4IWltcG9ydGFudH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC50YWJsZS10aXRsZXtiYWNrZ3JvdW5kLWNvbG9yOiMzNTk7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjJweDtwYWRkaW5nOjFlbTtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWJvdHRvbToxLjVlbTtmb250LWZhbWlseTpSb2JvdG8sc2Fucy1zZXJpZjtib3gtc2hhZG93OjAgMXB4IDVweCAxcHggI2RkZDstbW96LWJveC1zaGFkb3c6MCAxcHggNXB4IDFweCAjZGRkOy13ZWJraXQtYm94LXNoYWRvdzowIDFweCA1cHggMXB4ICNkZGQ7LW8tYm94LXNoYWRvdzowIDFweCA1cHggMXB4ICNkZGQ7LW1zLWJveC1zaGFkb3c6MCAxcHggNXB4IDFweCAjZGRkfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmRhbmdlcntiYWNrZ3JvdW5kLWNvbG9yOiNmNTAwNTc7Y29sb3I6I2ZmZn0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzM1OTtjb2xvcjojZmZmfS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLnN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjojNWNiODVjO2NvbG9yOiNmZmZ9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuZGVmYXVsdHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6IzAwMH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5zZWNvbmRhcnl7YmFja2dyb3VuZC1jb2xvcjojMWU4OGU1O2NvbG9yOiNmZmZ9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuYnRuLWNsZWFye2JvcmRlcjpub25lIWltcG9ydGFudDtib3gtc2hhZG93Om5vbmUhaW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmlucHV0LWdyb3VwLC5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmlucHV0LWdyb3VwIGlucHV0e2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQhaW1wb3J0YW50fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmlucHV0LWdyb3VwLWFkZG9ue2JvcmRlcjpub25lIWltcG9ydGFudDtwYWRkaW5nOjAhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudCFpbXBvcnRhbnR9LmZseC11aS1kYXRhdGFibGUtbWFpbiAuaW5wdXQtZ3JvdXAtYWRkb24gYnV0dG9ue2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7Ym9yZGVyLXRvcDpub25lIWltcG9ydGFudDtib3JkZXItYm90dG9tOm5vbmUhaW1wb3J0YW50O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQhaW1wb3J0YW50O2JvcmRlci1yYWRpdXM6NTBlbSFpbXBvcnRhbnQ7Y29sb3I6IzM1OTt3aWR0aDozMHB4O2hlaWdodDozMHB4fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmlucHV0LWdyb3VwLWFkZG9uIGJ1dHRvbiBpe2ZvbnQtc2l6ZToxOHB4fS5mbHgtdWktZGF0YXRhYmxlLW1haW4gLmlucHV0LWdyb3VwLWFkZG9uIGJ1dHRvbjpkaXNhYmxlZHtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50IWltcG9ydGFudH0uZmx4LXVpLWRhdGF0YWJsZS1tYWluIC5pbnB1dC1ncm91cC1hZGRvbiBidXR0b246ZGlzYWJsZWQgaXtjb2xvcjojZjUwMDU3fWBdXG59KVxuZXhwb3J0IGNsYXNzIEZseFVpRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXR7XG4gIEBJbnB1dCgpIGNsYXNzZXM6IGFueSA9IHt9IDsvL3ttYWluY29udGFpbmVyfHNwaW5uZXJ8YWRkQnV0dG9ufHRhYmxlSGVhZGVyfHRhYmxlRGF0YXxleHBvcnRCdXR0b258U2VhcmNoQmFyfHRhYmxlVHlwZX1cbiAgQElucHV0KCkgaGVhZGVyczogQXJyYXk8c3RyaW5nPiA9IFtdIDsgLy8gVGFibGUgaGVhZGVycyAodjogMS4wLjApIFxuICBASW5wdXQoKSBsYXp5bG9hZGluZ0NvbmZpZzogYW55ID0ge30gO1xuICBASW5wdXQoKSBlbWJlZFBpY3R1cmVzOiBhbnkgPSB7fSA7XG4gIEBJbnB1dCgpIGRhdGFLZXlzOiBBcnJheTxzdHJpbmc+ID0gW10gOyAvLyBEYXRhIGtleXMgdG8gcG9wdWxhdGUuICAodjogMS4wLjApXG4gIEBJbnB1dCgpIGVuYWJsZURhdGFFeHBvcnRzOiBib29sZWFuID0gZmFsc2UgOy8vRGVmYXVsdCB0byBmYWxzZTsgKHY6IDEuMC4xKVxuICBASW5wdXQoKSBkYXRhRXhwb3J0c0NvbmZpZzogYW55ID0ge30gOy8vIGRhdGEgZXhwb3J0cyBjb25maWd1cmF0aW9uOiB7ZXhwb3J0c1RvOlsncHJpbnQnLCd3b3JkJywncGRmJywnZXhjZWwnXSx0aXRsZTonRXhwb3J0cyBkYXRhJyxkYXRhQ29sdW1uczpbXX19IERhdGEgY29sdW1ucyB0byBleHBvcnRcbiAgQElucHV0KCkgc2hvd0JvdHRvbUluZm86IGZhbHNlIDsgLy8gVG8gZW5hYmxlIHRhYmxlIGJvdHRvbSBpbmZvcm1hdGlvblxuICBASW5wdXQoKSBzZWFyY2hLZXlzID0gW10gOyAvLyBLZXlzIHRvIHNlYXJjaCBmb3Igc2VhcmNoIG9wdGltaXphdGlvbi4gICh2OiAxLjAuMClcbiAgQElucHV0KCkgZGF0YVNyY0tleTogc3RyaW5nID0gJycgLy8gRGF0YSB0byByZWFkIGZyb20ganNvbiByZXNwb25zZS4gICh2OiAxLjAuMClcbiAgQElucHV0KCkgaGFzQWN0aW9uQnV0dG9uczogYm9vbGVhbiA9IGZhbHNlIDsgLy9zcGVjaWZ5IGlmIGRhdGF0YWJsZSBzaG91bGQgaGF2ZSBhbmQgYWRkIGJ1dHRvbi4gKHY6IDEuMC4wKVxuICBASW5wdXQoKSBoaWRlTnVtYmVyczogYm9vbGVhbiA9IGZhbHNlIDsgLy9zcGVjaWZ5IGlmIHRoZSBudW1iZXJzLiAgKHY6IDEuMC4wKVxuICBASW5wdXQoKSBlbmFibGVNdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlIDsgLy8gRW5hYmxlIG11bHRpcGxlIHNlbGVjdCBpbnB1dCBib3ggdG8gYXBwZWFyLiAodjogMS4wLjApIGVuYWJsZU11bHRpcGxlRGVsZXRlIHJlbmFtZWQgdG8gZW5hYmxlTXVsdGlwbGVTZWxlY3Rpb24gaW4gKHY6MS4wLjEpXG4gIEBJbnB1dCgpIG11bHRpcGxlU2VsZWN0S2V5OiBzdHJpbmcgPSAnJyA7IC8vIFNwZWNpZnkgd2hpY2gga2V5IHRvIHNlbGVjdC4gKHY6MS4wLjApIG11bHRpcGxlRGVsZXRlS2V5IHJlbmFtZWQgdG8gbXVsdGlwbGVTZWxlY3RLZXkgaW4gKHY6MS4wLjApIDtcbiAgQElucHV0KCkgaGFzQWRkQnV0dG9uOiBib29sZWFuID0gZmFsc2UgOyAvLyBFbmFibGUgdG8gc2hvdyBhZGQgYnV0dG9uIG9uIHRoZSBoZWFkZXIuICh2OiAxLjAuMClcbiAgQElucHV0KCkgZGF0YVVybDogc3RyaW5nID0gJycgOyAvLyBVcmwgdG8gbG9hZCB0YWJsZSBkYXRhLiAodjogMS4wLjApXG4gIEBJbnB1dCgpIGFjdGlvbkJ1dHRvblN0YXJ0OiBib29sZWFuID0gZmFsc2UgO1xuICBASW5wdXQoKSBtdWx0aXBsZVNlbGVjdEJ1dHRvbiA9IHsgdGV4dDogJ1NlbGVjdGVkJywgaWNvbjogJycgfTsgLy8gQ2hhbmdlIHRleHQgYW5kIGljb24gb24gbXVsdGlwbGUgc2VsZWN0IGJ1dHRvbi4gKHY6IDEuMC4xKVxuICBASW5wdXQoKSBzZWFyY2hQbGFjZWhvbGRlcjogc3RyaW5nID0gJ0VudGVyIG5hbWUgdG8gc2VhcmNoJyA7IC8vIENoYW5nZSBzZWFyY2ggYmFyIHBsYWNlaG9sZGVyLiAodjogMS4wLjApXG4gIEBJbnB1dCgpIGFjdGlvbkhlYWRlcjogc3RyaW5nID0gJ0FjdGlvbnMnIDsgLy8gQ2hhbmdlIHRleHQgZm9yIGFjdGlvbiBidXR0b25zIGhlYWRlci4gKHY6IDEuMC4wKVxuICBASW5wdXQoKSBsaW1pdDogbnVtYmVyID0gMjAgOyAvLyBTcGVjaWZ5IG51bWJlciBvZiBpdGVtcyBwZXIgcGFnaW5hdGlvbi4gKHY6IDEuMC4wKVxuICBASW5wdXQoKSBzcGlubmVyU3JjOiBhbnkgPSAnJyA7IC8vIFNwaW5uZXIgdG8gc2hvdyB3aGVuIGxvYWRpbmcgZGF0YSBmcm9tIEFQSS4gKHY6IDEuMC4xKVxuICBASW5wdXQoKSBhY3Rpb25CdXR0b25zOiBBcnJheTxPYmplY3Q+ID0gW10gOyAvLyBTcGVjaWZ5IGFjdGlvbiBidXR0b25zLiBNYWtlIHN1cmUgdG8gc2V0IGhhc0FjdGlvbkJ1dHRvbnMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzaG93IGJ1dHRvbiBpbiB0aGUgdGFibGUgcm93LiAodjogMS4wLjApXG4gIEBJbnB1dCgpIHBhZ2luYXRpb25CdXR0b25zOiBhbnkgPSB7YmFja2dyb3VuZDonI2RkZGRkZCcsdGV4dENvbG9yOicjMzM1NTk5J30gOyAvLyBDaGFuZ2UgYnV0dG9uIGJ1dHRvbiBiYWNrZ3JvdW5kIGFuZCB0ZXh0Q29sb3IuICh2OiAxLjAuMClcbiAgQElucHV0KCkgdGFibGVIZWFkZXI6IGFueSA9IHtiYWNrZ3JvdW5kOicjZmZmZmZmJyx0ZXh0Q29sb3I6JyMzMzU1OTknfSA7IC8vIENoYW5nZSB0YWJsZSBoZWFkZXIgYmFja2dyb3VuZCBhbmQgdGV4dCBjb2xvci4gKHY6IDEuMC4wKVxuICBASW5wdXQoKSBzZWFyY2hCdXR0b246IGFueSA9IHtiYWNrZ3JvdW5kOicjY2NjY2NjJyx0ZXh0Q29sb3I6JyMzMzU1OTknfSA7IC8vIENoYW5nZSBiYWNrZ3JvdW5kIGFuZCB0ZXh0IGNvbG9yIG9mIHRoZSBzZWFyY2ggYnV0dG9uLiAodjogMS4wLjApXG4gIEBJbnB1dCgpIGFkZEJ1dHRvbjogYW55ID0ge30gOyAvL0NoYW5nZSBiYWNrZ3JvdW5kIGFuZCB0ZXh0IGNvbG9yIG9mIHRoZSBhZGQgYnV0dG9uLiAodjogMS4wLjApXG4gIEBJbnB1dCgpIHNlYXJjaEJhcjogYW55ID0ge2JvcmRlclNpemU6JzFweCcsYm9yZGVyQ29sb3I6JyNjY2MnLGJhY2tncm91bmQ6JyNmZmZmZmYnLHRleHRDb2xvcjonIzAwMDAwMCd9IDsgLy8gQ2hhbmdlIGJhY2tncm91bmQgYW5kIHRleHQgY29sb3Igb2YgdGhlIHNlYXJjaCBiYXIuICh2OiAxLjAuMClcbiAgQE91dHB1dCgpIGZpcnN0QWN0aW9uQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSA7IC8vIEhhbmRsZSBmaXJzdCBhY3Rpb24gYnV0dG9uLiAodjogMS4wLjApXG4gIEBPdXRwdXQoKSBzZWNvbmRBY3Rpb25CdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpIDsgLy8gSGFuZGxlIHNlY29uZCBhY3Rpb24gYnV0dG9uLiAodjogMS4wLjApXG4gIEBPdXRwdXQoKSB0aGlyZEFjdGlvbkJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gICBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSA7IC8vIEhhbmRsZSB0aGlyZCBhY3Rpb24gYnV0dG9uLiAodjogMS4wLjApXG4gIEBPdXRwdXQoKSBtdWx0aXBsZVNlbGVjdENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCkgOyAvLyBIYW5kbGUgbXVsdGlwbGUgc2VsZWN0IGJ1dHRvbi4gKHY6IDEuMC4wKVxuICBAT3V0cHV0KCkgYWRkQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSA7IC8vIEhhbmRsZSBhZGQgYnV0dG9uLiAodjogMS4wLjApXG4gIGlzRXhwb3J0QWxsOiBib29sZWFuID0gZmFsc2UgO1xuICBzZWFyY2hGb3JtOiBGb3JtR3JvdXAgO1xuICB0RGF0YTogYW55ID0gW10gO1xuICBiZWhhdmlvcjogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgLy9LZWVwIHRyYWNrIG9mIGN1cnJlbnQgZGF0YSBhZnRlciBzZWFyY2guIElmIHNlYXJjaCBzdHJpbmcgaXMgZW1wdHkgc2V0IGN1cnJlbnQgdmlldyBkYXRhXG4gIHB1YmxpYyBzZWFyY2hEYXRhVGVtcE9mZnNldCA9IFtdO1xuICAvL0RhdGEgdG8gZGlzcGxheSBpbiB0aGUgdGFibGUgYmFzZWQgb24gb2Zmc2V0XG4gIHB1YmxpYyBkaXNwbGF5RGF0YSA9IHRoaXMuYmVoYXZpb3IuYXNPYnNlcnZhYmxlKCk7IFxuICAvL0tlZXAgdHJhY2sgb2YgcGFnaW5hdGlvbiBudW1iZXJzXG4gIHB1YmxpYyBvZmZzZXQgPSAxO1xuICBwdWJsaWMgcmVsb2FkVXJsOnN0cmluZyAgO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX19mb3JtOiBGb3JtQnVpbGRlcixwdWJsaWMgc2VydmljZTogRmx4VWlEYXRhdGFibGVTZXJ2aWNlKXtcbiAgICBcbiAgfSAgXG4gIFxuICByZWxvYWQoKXtcbiAgICAgIHRoaXMuc2VydmljZS5sb2FkRmx4RGF0YVRhYmxlRGF0YSh0aGlzLnJlbG9hZFVybCx0cnVlKVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gY2hlY2tlZCBFeHBvcnQgYWxsIHNlbGVjdGlvblxuICAgKi9cbiAgY2hlY2tUb0V4cG9ydE9wdGlvbihjaGVja2VkOmJvb2xlYW4pe1xuICAgIHRoaXMuaXNFeHBvcnRBbGwgPSBjaGVja2VkIDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGV4cG9ydFR5cGUgRXhwb3J0IHR5cGU6IHByaW50fHBkZnxleGNlbHx3b3JkXG4gICAqL1xuICBleHBvcnREb2N1bWVudHNBcyhleHBvcnRUeXBlOnN0cmluZyl7XG4gICAgbGV0IGxvYWRpbmc6IEhUTUxEaXZFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cG9ydF9sb2FkaW5nXCIpIDtcbiAgICBsb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snIDtcbiAgICBsZXQgaGVhZGVycyA9ICghdGhpcy5kYXRhRXhwb3J0c0NvbmZpZy5kYXRhQ29sdW1ucyB8fCB0aGlzLmRhdGFFeHBvcnRzQ29uZmlnLmRhdGFDb2x1bW5zLmxlbmd0aDwxKSA/IHRoaXMuZGF0YUtleXMgOiB0aGlzLmRhdGFFeHBvcnRzQ29uZmlnLmRhdGFDb2x1bW5zIDtcbiAgICBsZXQgZGF0YVRvRXhwb3J0ID0gKCF0aGlzLmlzRXhwb3J0QWxsKSA/IHRoaXMuZGlzcGxheURhdGEgOiB0aGlzLnNlcnZpY2UuZmx4RGF0YSA7XG4gICAgXG4gICAgLy9TdWJzY3JpYmUgdG8gZGF0YVxuICAgIGRhdGFUb0V4cG9ydC5zdWJzY3JpYmUoKGRhdGEpID0+IHsgICAgICAgICAgICAgIFxuICAgICAgICBsZXQgYXJyYXlPYmo6IEFycmF5PGFueT4gPSBbXSA7XG4gICAgICAgIC8vTG9vcCBhbmQgcHVzaCBkYXRhXG4gICAgICAgIGZvcihsZXQgZCBvZiBkYXRhKXtcbiAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9IDtcbiAgICAgICAgICAgIGZvcihsZXQgaD0wO2g8aGVhZGVycy5sZW5ndGg7aCsrKXtcbiAgICAgICAgICAgICAgICBvYmpbaGVhZGVyc1toXV0gPSBkW2hlYWRlcnNbaF1dIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFycmF5T2JqLnB1c2gob2JqKSA7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhwb3J0VHlwZT09J3ByaW50Jyl7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICBwcmludEpTKHtwcmludGFibGU6YXJyYXlPYmoscHJvcGVydGllczpoZWFkZXJzLHR5cGU6J2pzb24nfSkgO1xuICAgICAgICAgICAgbG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnIDtcbiAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIGxvYWRpbmcuc3R5bGUuZGlzcGxheSA9ICdub25lJyA7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUHJpbnRKUyBub3QgZm91bmQuIEFkZCBgaHR0cHM6Ly9wcmludGpzLTRkZTYua3hjZG4uY29tL3ByaW50Lm1pbi5qc2AgdG8geW91ciBpbmRleC5odG1sIG9yIGFkZCBhcyBwYXJ0IG9mIGFuZ3VsYXIuanNvbiBzY3JpcHQnKSA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IGV4dGVuc2lvbiA9IChleHBvcnRUeXBlPT0ncGRmJykgPyAncGRmJzogKGV4cG9ydFR5cGU9PSdleGNlbCcpID8gJ3hsc3gnOiAnZG9jeCdcbiAgICAgICAgICAgIGxldCBwYWdlSWQgPSAoZXhwb3J0VHlwZT09J3BkZicpID8gMzogKGV4cG9ydFR5cGU9PSdleGNlbCcpID8gNTogNCA7XG5cbiAgICAgICAgICAgIGxldCByZXF1ZXN0RGF0YTogYW55ID0ge1wiZGF0YVwiOkpTT04uc3RyaW5naWZ5KGFycmF5T2JqKX1cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5wb3N0RGF0YSgnaHR0cDovL2V4cG9ydGVyLmF6dXJld2Vic2l0ZXMubmV0L2FwaS9leHBvcnQvRXhwb3J0RnJvbUpTT04vJyxwYWdlSWQscmVxdWVzdERhdGEpLnN1YnNjcmliZSgocmVzcCkgPT57XG4gICAgICAgICAgICAgICAgdmFyIGRvd25sb2FkID0gJ2h0dHA6Ly9leHBvcnRlci5henVyZXdlYnNpdGVzLm5ldC9hcGkvZXhwb3J0L0dldEZpbGUvJyArIHJlc3AgO1xuICAgICAgICAgICAgICAgIGRvd25sb2FkICs9IFwiP2ZpbGVOYW1lPWFuZHJlaSZleHRlbnNpb249XCIrIGV4dGVuc2lvbjtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRvd25sb2FkIDtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgO1xuICAgICAgICAgICAgfSwoZSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZmlsZSBleHBvcnQgZXJyb3InLGUpIDtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pLnVuc3Vic2NyaWJlKCkgOyAgICBcbiAgfVxuXG4gIGhhc0ltYWdlRW1iZWRlZCgpOiBib29sZWFue1xuICAgIHJldHVybiB0aGlzLmVtYmVkUGljdHVyZXMuaGFzT3duUHJvcGVydHkoXCJpbmRleFwiKSA7XG4gIH1cblxuICBnZXRJbWFnZSgpe1xuICAgICAgY29uc29sZS5sb2coJ2VvZW9lJylcbiAgICAvLyAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKSA7XG4gICAgLy8gICBpbWcuc3JjID0gaW1hZ2VTcmMgO1xuICAgIC8vICAgaW1nLm9ubG9hZCA9ICgoZSk9PntcbiAgICAvLyAgICAgICByZXR1cm4gaW1hZ2VTcmMgO1xuICAgIC8vICAgfSkgO1xuICAgIC8vICAgaW1nLm9uZXJyb3IgPSAoKGUpPT57XG4gICAgLy8gICAgIHJldHVybiB0aGlzLmVtYmVkUGljdHVyZXMuZmFsbGJhY2tVcmwgO1xuICAgIC8vICAgfSlcbiAgfVxuXG4gIEpTT05Ub0NTVkNvbnZlcnRvcihKU09ORGF0YSwgUmVwb3J0VGl0bGUsIFNob3dMYWJlbCkge1xuICAgIC8vSWYgSlNPTkRhdGEgaXMgbm90IGFuIG9iamVjdCB0aGVuIEpTT04ucGFyc2Ugd2lsbCBwYXJzZSB0aGUgSlNPTiBzdHJpbmcgaW4gYW4gT2JqZWN0XG4gICAgdmFyIGFyckRhdGEgPSB0eXBlb2YgSlNPTkRhdGEgIT0gJ29iamVjdCcgPyBKU09OLnBhcnNlKEpTT05EYXRhKSA6IEpTT05EYXRhO1xuICAgIFxuICAgIHZhciBDU1YgPSAnJzsgICAgXG4gICAgLy9TZXQgUmVwb3J0IHRpdGxlIGluIGZpcnN0IHJvdyBvciBsaW5lXG4gICAgXG4gICAgQ1NWICs9IFJlcG9ydFRpdGxlICsgJ1xcclxcblxcbic7XG5cbiAgICAvL1RoaXMgY29uZGl0aW9uIHdpbGwgZ2VuZXJhdGUgdGhlIExhYmVsL0hlYWRlclxuICAgIGlmIChTaG93TGFiZWwpIHtcbiAgICAgICAgdmFyIHJvdyA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICAvL1RoaXMgbG9vcCB3aWxsIGV4dHJhY3QgdGhlIGxhYmVsIGZyb20gMXN0IGluZGV4IG9mIG9uIGFycmF5XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGFyckRhdGFbMF0pIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9Ob3cgY29udmVydCBlYWNoIHZhbHVlIHRvIHN0cmluZyBhbmQgY29tbWEtc2VwcmF0ZWRcbiAgICAgICAgICAgIHJvdyArPSBpbmRleCArICcsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCAtMSk7XG4gICAgICAgIFxuICAgICAgICAvL2FwcGVuZCBMYWJlbCByb3cgd2l0aCBsaW5lIGJyZWFrXG4gICAgICAgIENTViArPSByb3cgKyAnXFxyXFxuJztcbiAgICB9XG4gICAgXG4gICAgLy8xc3QgbG9vcCBpcyB0byBleHRyYWN0IGVhY2ggcm93XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByb3cgPSBcIlwiO1xuICAgICAgICBcbiAgICAgICAgLy8ybmQgbG9vcCB3aWxsIGV4dHJhY3QgZWFjaCBjb2x1bW4gYW5kIGNvbnZlcnQgaXQgaW4gc3RyaW5nIGNvbW1hLXNlcHJhdGVkXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGFyckRhdGFbaV0pIHtcbiAgICAgICAgICAgIHJvdyArPSAnXCInICsgYXJyRGF0YVtpXVtpbmRleF0gKyAnXCIsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdy5zbGljZSgwLCByb3cubGVuZ3RoIC0gMSk7XG4gICAgICAgIFxuICAgICAgICAvL2FkZCBhIGxpbmUgYnJlYWsgYWZ0ZXIgZWFjaCByb3dcbiAgICAgICAgQ1NWICs9IHJvdyArICdcXHJcXG4nO1xuICAgIH1cblxuICAgIGlmIChDU1YgPT0gJycpIHsgICAgICAgIFxuICAgICAgICBhbGVydChcIkludmFsaWQgZGF0YVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gICBcbiAgICBcbiAgICAvL0dlbmVyYXRlIGEgZmlsZSBuYW1lXG4gICAgdmFyIGZpbGVOYW1lID0gXCJNeVJlcG9ydF9cIjtcbiAgICAvL3RoaXMgd2lsbCByZW1vdmUgdGhlIGJsYW5rLXNwYWNlcyBmcm9tIHRoZSB0aXRsZSBhbmQgcmVwbGFjZSBpdCB3aXRoIGFuIHVuZGVyc2NvcmVcbiAgICBmaWxlTmFtZSArPSBSZXBvcnRUaXRsZS5yZXBsYWNlKC8gL2csXCJfXCIpOyAgIFxuICAgIFxuICAgIC8vSW5pdGlhbGl6ZSBmaWxlIGZvcm1hdCB5b3Ugd2FudCBjc3Ygb3IgeGxzXG4gICAgdmFyIHVyaSA9ICdkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsJyArIGVzY2FwZShDU1YpO1xuICAgIFxuICAgIC8vIE5vdyB0aGUgbGl0dGxlIHRyaWNreSBwYXJ0LlxuICAgIC8vIHlvdSBjYW4gdXNlIGVpdGhlcj4+IHdpbmRvdy5vcGVuKHVyaSk7XG4gICAgLy8gYnV0IHRoaXMgd2lsbCBub3Qgd29yayBpbiBzb21lIGJyb3dzZXJzXG4gICAgLy8gb3IgeW91IHdpbGwgbm90IGdldCB0aGUgY29ycmVjdCBmaWxlIGV4dGVuc2lvbiAgICBcbiAgICBcbiAgICAvL3RoaXMgdHJpY2sgd2lsbCBnZW5lcmF0ZSBhIHRlbXAgPGEgLz4gdGFnXG4gICAgdmFyIGxpbms6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpOyAgICBcbiAgICBsaW5rLmhyZWYgPSB1cmk7XG4gICAgXG4gICAgLy9zZXQgdGhlIHZpc2liaWxpdHkgaGlkZGVuIHNvIGl0IHdpbGwgbm90IGVmZmVjdCBvbiB5b3VyIHdlYi1sYXlvdXRcbiAgICBsaW5rLnN0eWxlID0gXCJ2aXNpYmlsaXR5OmhpZGRlblwiO1xuICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlTmFtZSArIFwiLmNzdlwiO1xuICAgIFxuICAgIC8vdGhpcyBwYXJ0IHdpbGwgYXBwZW5kIHRoZSBhbmNob3IgdGFnIGFuZCByZW1vdmUgaXQgYWZ0ZXIgYXV0b21hdGljIGNsaWNrXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbn1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBuZXdEYXRhIFxuICAgKi9cbiAgY2hhbmdlRGlzcGxheURhdGEobmV3RGF0YSkge1xuICAgIHRoaXMuYmVoYXZpb3IubmV4dChuZXdEYXRhKTtcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgaWYodGhpcy5pc0xhenlsb2FkaW5nRW5hYmxlZCgpKXtcbiAgICAgICAgdGhpcy5yZWxvYWRVcmwgPSB0aGlzLmRhdGFVcmwrJyYnK3RoaXMubGF6eWxvYWRpbmdDb25maWcuYXBpT2Zmc2V0S2V5Kyc9MCYnK3RoaXMubGF6eWxvYWRpbmdDb25maWcuYXBpU2VhcmNoS2V5Kyc9JyA7XG4gICAgfWVsc2V7XG4gICAgICAgIHRoaXMucmVsb2FkVXJsID0gdGhpcy5kYXRhVXJsIDtcbiAgICB9XG4gICAgICB0aGlzLnNlYXJjaEZvcm0gPSB0aGlzLl9fZm9ybS5ncm91cCh7XG4gICAgICAgICAgc2VhcmNoU3RyaW5nOlsnJyxWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgfSk7XG4gICAgICB0aGlzLnNlYXJjaEZvcm0gPSB0aGlzLl9fZm9ybS5ncm91cCh7XG4gICAgICAgIHNlYXJjaFN0cmluZzogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuICAgIHRoaXMuc2VydmljZS5saW1pdCA9IHRoaXMubGltaXQ7XG4gICAgdGhpcy5zZXJ2aWNlLnNldExhenlsb2FkaW5nQ29uZmlnKHRoaXMubGF6eWxvYWRpbmdDb25maWcpIDtcbiAgICB0aGlzLnNlcnZpY2Uuc2V0RGF0YVVybCh0aGlzLmRhdGFVcmwpO1xuICAgIHRoaXMuc2VydmljZS5zZXREYXRhU3JjS2V5KHRoaXMuZGF0YVNyY0tleSk7XG4gICAgbGV0IHVybCA9ICh0aGlzLmlzTGF6eWxvYWRpbmdFbmFibGVkKCkpID8gdGhpcy5kYXRhVXJsKycmJyt0aGlzLmxhenlsb2FkaW5nQ29uZmlnLmFwaU9mZnNldEtleSsnPTAmJyt0aGlzLmxhenlsb2FkaW5nQ29uZmlnLmFwaVNlYXJjaEtleSsnPScgOiAgdGhpcy5kYXRhVXJsIDtcbiAgICB0aGlzLnNlcnZpY2UubG9hZEZseERhdGFUYWJsZURhdGEodXJsKTtcbiAgICAgIHRoaXMuc2VydmljZS5mbHhEYXRhLnN1YnNjcmliZSgocmVzcCkgPT4ge1xuICAgICAgICB0aGlzLnREYXRhID0gcmVzcCA7XG4gICAgICAgIGxldCBvYmo6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMudERhdGEubGVuZ3RoID4gdGhpcy5saW1pdCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbWl0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmoucHVzaCh0aGlzLnREYXRhW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgLy8gdGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQgPSB0aGlzLmxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvdW50ZXI6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmoucHVzaCh0aGlzLnREYXRhW2ldKTtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIC8vIHRoaXMuc2VydmljZS5kYXRhT2Zmc2V0ID0gb2JqLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaERhdGFUZW1wT2Zmc2V0ID0gb2JqO1xuICAgICAgICB0aGlzLmNoYW5nZURpc3BsYXlEYXRhKG9iaik7XG4gICAgfSlcbiAgfVxuXG5zZWFyY2hEYXRhSW5BcGkodmFsdWVzLGZvcm0pe1xuICAgIHRoaXMuc2VydmljZS5jaGFnZURhdGFUYWJsZShbXSkgOyAgICAgICAgICAgXG4gICAgdGhpcy5zZXJ2aWNlLmxvYWRGbHhEYXRhVGFibGVEYXRhKHRoaXMuZGF0YVVybCsnJicrdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlPZmZzZXRLZXkrJz0wJicrdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlTZWFyY2hLZXkrJz0nK3ZhbHVlcy5zZWFyY2hTdHJpbmcpIDtcbn1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcbi8vIGFsZXJ0KHdpbmRvdy5pbm5lcldpZHRoKVxuICB9XG5cbiAgYWN0aW9uQnV0dG9uQ2xpY2tlZChpbmRleDpudW1iZXIsYnV0dG9uSW5kZXg6bnVtYmVyKXtcbiAgICBpZiAoYnV0dG9uSW5kZXggPT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJzdEFjdGlvbkJ1dHRvbkNsaWNrZWQuZW1pdCh7IGluZGV4OiBpbmRleCwgZGF0YTogdGhpcy50RGF0YVtpbmRleF0gfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbkluZGV4ID09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kQWN0aW9uQnV0dG9uQ2xpY2tlZC5lbWl0KHsgaW5kZXg6IGluZGV4LCBkYXRhOiB0aGlzLnREYXRhW2luZGV4XSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMudGhpcmRBY3Rpb25CdXR0b25DbGlja2VkLmVtaXQoeyBpbmRleDogaW5kZXgsIGRhdGE6IHRoaXMudERhdGFbaW5kZXhdIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZEJ1dHRvbkNsaWNrKCl7XG4gICAgdGhpcy5hZGRCdXR0b25DbGlja2VkLmVtaXQoKSA7XG4gIH1cblxuICBjb25maXJtRGVsZXRlKCl7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGVTZWxlY3RDbGlja2VkLmVtaXQodGhpcy5zZXJ2aWNlLm11bHRpcGxlRGVsZXRpb24pO1xuICB9XG5cbiAgYWRkUmVtb3ZlKGNoZWNrZWQ6Ym9vbGVhbil7XG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGF0YS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBjb3VudGVyOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLm11bHRpcGxlRGVsZXRpb24ucHVzaChpW3RoaXMubXVsdGlwbGVTZWxlY3RLZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZpY2UubXVsdGlwbGVEZWxldGlvbikgO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5tdWx0aXBsZURlbGV0aW9uID0gW107XG4gICAgfSAgICAgICAgXG4gIH1cblxuICBhZGRSZW1vdmVEZWxldGVJdGVtKGRhdGFLZXl2YWx1ZTphbnksIGluZGV4Om51bWJlciwgc2VsZWN0ZWQ6Ym9vbGVhbil7XG4gICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2VydmljZS5tdWx0aXBsZURlbGV0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YUtleXZhbHVlID09IHRoaXMuc2VydmljZS5tdWx0aXBsZURlbGV0aW9uW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLm11bHRpcGxlRGVsZXRpb24uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXlEYXRhLnN1YnNjcmliZSgocmVzcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLm11bHRpcGxlRGVsZXRpb24ucHVzaChyZXNwW2luZGV4XVt0aGlzLm11bHRpcGxlU2VsZWN0S2V5XSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgIC8vIGNvbnNvbGUubG9nKCdsZWZ0ICcrZGF0YUtleXZhbHVlLHRoaXMuc2VydmljZS5tdWx0aXBsZURlbGV0aW9uKSA7XG4gIH1cblxuICBnZXRTZWFyY2hDb2x1bW5zKCl7XG4gICAgcmV0dXJuICh0aGlzLmhhc0FkZEJ1dHRvbikgPyAodGhpcy5lbmFibGVEYXRhRXhwb3J0cykgPyAnY29sLW1kLTYgc2VhcmNoLWNvbnRhaW5lcicgOiAnY29sLW1kLTcgc2VhcmNoLWNvbnRhaW5lcicgOlxuICAgICh0aGlzLmVuYWJsZURhdGFFeHBvcnRzKSA/ICdjb2wtbWQtNyBzZWFyY2gtY29udGFpbmVyJyA6ICdjb2wtbWQtOCBzZWFyY2gtY29udGFpbmVyJztcbiAgfVxuXG4gIGRpc2FibGVQcmV2dEJ1dHRvbigpe1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnNlcnZpY2UuZGF0YU9mZnNldC90aGlzLmxpbWl0KTw9MSA7XG4gIH1cblxuICBkaXNhYmxlTmV4dEJ1dHRvbigpe1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnNlcnZpY2UuZGF0YU9mZnNldC90aGlzLmxpbWl0KT09TWF0aC5jZWlsKHRoaXMuc2VydmljZS50b3RhbEl0ZW1zL3RoaXMubGltaXQpIDtcbiAgfVxuXG4gIGlzTGF6eWxvYWRpbmdFbmFibGVkKCk6IGJvb2xlYW57XG4gICAgICByZXR1cm4gdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImFwaU9mZnNldEtleVwiKSAmJiB0aGlzLmxhenlsb2FkaW5nQ29uZmlnLmFwaU9mZnNldEtleSA7XG4gIH1cblxuICBuZXh0UHJldkl0ZW0odHlwZTpzdHJpbmcpe1xuICAgIGlmKHRoaXMuaXNMYXp5bG9hZGluZ0VuYWJsZWQoKSl7XG4gICAgICAgIHRoaXMuc2VydmljZS5sb2FkRmluaXNoID0gZmFsc2UgO1xuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGF0YUxlbmd0aCgpLnRoZW4oZGF0YUxlbmd0aD0+eyAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5jaGFnZURhdGFUYWJsZShbXSkgOyAgIFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQgPSAodHlwZT09J3ByZXYnKSA/ICgodGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQgLSB0aGlzLmxpbWl0KSAtIHRoaXMubGltaXQpIDogdGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQ7ICBcbiAgICAgICAgICAgIGxldCB1cmwgPSAodGhpcy5pc0xhenlsb2FkaW5nRW5hYmxlZCgpKSA/IHRoaXMuZGF0YVVybCsnJicrdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlPZmZzZXRLZXkrJz0nKyB0aGlzLnNlcnZpY2UuZGF0YU9mZnNldCArJyYnK3RoaXMubGF6eWxvYWRpbmdDb25maWcuYXBpU2VhcmNoS2V5Kyc9JyA6ICB0aGlzLmRhdGFVcmwgOyAgXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9hZEZseERhdGFUYWJsZURhdGEodXJsKSA7XG4gICAgICAgIH0pLmNhdGNoKGU9PntcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Vycm9yJyxlKSA7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiA7XG4gICAgfVxuXG4gICAgLy8gUGFnaW5hdGUgaWYgbGF6eWxvYWRpbmcgaXMgZGlzYWJsZWRcbiAgICBpZiAodHlwZSA9PSAncHJldicpIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0ZURhdGF0YWJsZVJlY29yZCgodGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQgLSB0aGlzLmxpbWl0KSAtIHRoaXMubGltaXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5kYXRhT2Zmc2V0IDwgdGhpcy5saW1pdCkge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZURhdGF0YWJsZVJlY29yZCh0aGlzLnNlcnZpY2UuZGF0YU9mZnNldCArICh0aGlzLmxpbWl0IC0gMSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZURhdGF0YWJsZVJlY29yZCh0aGlzLnNlcnZpY2UuZGF0YU9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaWx0ZXJEYXRhKHNlYXJjaFN0cmluZyA9ICcnKSB7XG4gICAgdGhpcy5jaGFuZ2VEaXNwbGF5RGF0YShbXSk7XG4gICAgdGhpcy5zZXJ2aWNlLmZseERhdGEuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBzZWFyY2hSZXN1bHRzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIC8vSWYgbm8gc3RyaW5nIHByb3ZpZGVkLiBSZWdpc3RlciBhbGwgdGhlIHByZXZpb3VzIGRhdGEgdG8gdGhlIGRhdGFzZXRcbiAgICAgICAgaWYgKHNlYXJjaFN0cmluZy50cmltKCkgPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlzcGxheURhdGEodGhpcy5zZWFyY2hEYXRhVGVtcE9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayBpZiBzZWFyY2hLZXlzIGFyZSBzZXQgZWxzZSB1c2UgZGF0YUtleXMgYXMgc2VhcmNoS2V5c1xuICAgICAgICBsZXQgc2VhcmNoS2V5czogQXJyYXk8c3RyaW5nPiA9ICh0aGlzLnNlYXJjaEtleXMubGVuZ3RoIDwgMSkgPyB0aGlzLmRhdGFLZXlzIDogdGhpcy5zZWFyY2hLZXlzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vVmFyaWFibGUgdG8gY2hlY2sgaWYgYSBkYXRhIGlzIGZvdW5kXG4gICAgICAgICAgICBsZXQgZm91bmQgPSAtMTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2VhcmNoS2V5cy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV1bU3RyaW5nKHNlYXJjaEtleXNbeF0pXS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLnRvTG9jYWxlTG93ZXJDYXNlKCkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9JZiBmb3VuZCBwdXNoIHRoZSBpbmRleCBvZiB0aGUgZGF0YSB0byB0aGUgc2VhcmNoUmVzdWx0cyB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGZvdW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnB1c2goZGF0YVtmb3VuZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vUmVnaXN0ZXIgdGhlIHJlc3VsdHMgdG8gdGhlIGRhdGFzZXRcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXNwbGF5RGF0YShzZWFyY2hSZXN1bHRzKTtcbiAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmFsdWUgb2Zmc2V0IHZhbHVlXG4gICAgICovXG4gICAgcGFnaW5hdGVEYXRhdGFibGUodmFsdWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgbGF6eSBsb2FkaW5nIGlzIGVuYWJsZWRcbiAgICAgICAgaWYodGhpcy5pc0xhenlsb2FkaW5nRW5hYmxlZCgpKXtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2FkRmluaXNoID0gZmFsc2UgO1xuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGdldCB0aGUgZGF0YSBsZW5ndGhcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5nZXREYXRhTGVuZ3RoKCkudGhlbigoKT0+eyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuY2hhZ2VEYXRhVGFibGUoW10pIDtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgaXMgc2VsZWN0ZWQgdG8gcHJldmVudCBOQU4gdmFsdWUgICBcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSE9J2FsbCcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZGF0YU9mZnNldCA9IHBhcnNlSW50KHZhbHVlKSA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHVybFxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAodGhpcy5pc0xhenlsb2FkaW5nRW5hYmxlZCgpKSA/IHRoaXMuZGF0YVVybCsnJicrdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlPZmZzZXRLZXkrJz0nKyB2YWx1ZSArJyYnK3RoaXMubGF6eWxvYWRpbmdDb25maWcuYXBpU2VhcmNoS2V5Kyc9JyA6IHRoaXMuZGF0YVVybCA7XG4gICAgICAgICAgICAgICAgLy8gcGFnaW5hdGVcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9hZEZseERhdGFUYWJsZURhdGEodXJsLGZhbHNlKSA7XG4gICAgICAgICAgICB9KS5jYXRjaChlPT57XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZXJyb3InLGUpIDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHRoaXMucGFnaW5hdGVEYXRhdGFibGVSZWNvcmQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIHBhZ2luYXRpb24gbnVtYmVyXG4gICAgICogUGVyZm9ybSBwYWdpbmF0aW9uIHRvIHRoZSBkYXRhc2V0XG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIHBhZ2luYXRlRGF0YXRhYmxlUmVjb3JkKHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMubGF6eWxvYWRpbmdDb25maWcuaGFzT3duUHJvcGVydHkoXCJhcGlPZmZzZXRLZXlcIikgJiYgdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlPZmZzZXRLZXkpeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2FkRmluaXNoID0gZmFsc2UgO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERhdGFMZW5ndGgoKS50aGVuKGRhdGFMZW5ndGg9PnsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmNoYWdlRGF0YVRhYmxlKFtdKSA7IFxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5kYXRhT2Zmc2V0ID0gcGFyc2VJbnQodmFsdWUpK3RoaXMubGltaXQgOyAgICAgICAgICBcbiAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2FkRmx4RGF0YVRhYmxlRGF0YSh0aGlzLmRhdGFVcmwrJyYnK3RoaXMubGF6eWxvYWRpbmdDb25maWcuYXBpT2Zmc2V0S2V5Kyc9Jyt2YWx1ZSsnJicrdGhpcy5sYXp5bG9hZGluZ0NvbmZpZy5hcGlTZWFyY2hLZXkrJz0nKSA7XG4gICAgICAgICAgICB9KS5jYXRjaChlPT57XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZXJyb3InLGUpIDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bTpudW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGlmIChudW0gPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmRhdGFPZmZzZXQgPSB0aGlzLmxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBudW0gKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5kYXRhT2Zmc2V0ID0gbnVtICsgdGhpcy5saW1pdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZpY2UuZmx4RGF0YS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGVSZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdmFsdWU7IGkgPCAodGhpcy5saW1pdCArIHBhcnNlSW50KHZhbHVlKSk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGVSZXN1bHQucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFnaW5hdGVSZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURpc3BsYXlEYXRhKHBhZ2luYXRlUmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURpc3BsYXlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoRGF0YVRlbXBPZmZzZXQgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmltcG9ydCB7RGlyZWN0aXZlLEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnIDtcbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZseC11aS1kYXRhdGFibGUtaW1nLWZhbGxiYWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VGYWxsQmFjayB7XG4gICAgQElucHV0KCdmbHgtdWktZGF0YXRhYmxlLWltZy1mYWxsYmFjaycpIGltZ1NyYzogc3RyaW5nO1xuICAgIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgaXNBcHBsaWVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBFVkVOVF9UWVBFOiBzdHJpbmcgPSAnZXJyb3InO1xuICBcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuICAgICAgdGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5FVkVOVF9UWVBFLCB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcbiAgICB9XG4gIFxuICAgIHByaXZhdGUgb25FcnJvcigpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gIFxuICAgICAgaWYgKCF0aGlzLmlzQXBwbGllZCkge1xuICAgICAgICB0aGlzLmlzQXBwbGllZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLmltZ1NyYyk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50cygpIHtcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLkVWRU5UX1RZUEUsIHRoaXMub25FcnJvcik7XG4gICAgfVxuICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gICAgfVxufSJdfQ==