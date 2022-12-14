import { EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlxUiDatatableService } from './flx-ui-datatable.service';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class FlxUiDatatableComponent implements OnInit, AfterViewInit {
    __form: FormBuilder;
    service: FlxUiDatatableService;
    classes: any;
    headers: Array<string>;
    lazyloadingConfig: any;
    embedPictures: any;
    dataKeys: Array<string>;
    enableDataExports: boolean;
    dataExportsConfig: any;
    showBottomInfo: false;
    searchKeys: any[];
    dataSrcKey: string;
    hasActionButtons: boolean;
    hideNumbers: boolean;
    enableMultipleSelection: boolean;
    multipleSelectKey: string;
    hasAddButton: boolean;
    dataUrl: string;
    actionButtonStart: boolean;
    multipleSelectButton: {
        text: string;
        icon: string;
    };
    searchPlaceholder: string;
    actionHeader: string;
    limit: number;
    spinnerSrc: any;
    actionButtons: Array<Object>;
    paginationButtons: any;
    tableHeader: any;
    searchButton: any;
    addButton: any;
    searchBar: any;
    firstActionButtonClicked: EventEmitter<any>;
    secondActionButtonClicked: EventEmitter<any>;
    thirdActionButtonClicked: EventEmitter<any>;
    multipleSelectClicked: EventEmitter<any>;
    addButtonClicked: EventEmitter<any>;
    isExportAll: boolean;
    searchForm: FormGroup;
    tData: any;
    behavior: BehaviorSubject<any>;
    searchDataTempOffset: any[];
    displayData: Observable<any>;
    offset: number;
    reloadUrl: string;
    constructor(__form: FormBuilder, service: FlxUiDatatableService);
    reload(): void;
    /**
     *
     * @param checked Export all selection
     */
    checkToExportOption(checked: boolean): void;
    /**
     *
     * @param exportType Export type: print|pdf|excel|word
     */
    exportDocumentsAs(exportType: string): void;
    hasImageEmbeded(): boolean;
    getImage(): void;
    JSONToCSVConvertor(JSONData: any, ReportTitle: any, ShowLabel: any): void;
    /**
     *
     * @param newData
     */
    changeDisplayData(newData: any): void;
    ngOnInit(): void;
    searchDataInApi(values: any, form: any): void;
    ngAfterViewInit(): void;
    actionButtonClicked(index: number, buttonIndex: number): void;
    addButtonClick(): void;
    confirmDelete(): void;
    addRemove(checked: boolean): void;
    addRemoveDeleteItem(dataKeyvalue: any, index: number, selected: boolean): void;
    getSearchColumns(): "col-md-6 search-container" | "col-md-7 search-container" | "col-md-8 search-container";
    disablePrevtButton(): boolean;
    disableNextButton(): boolean;
    isLazyloadingEnabled(): boolean;
    nextPrevItem(type: string): void;
    filterData(searchString?: string): void;
    /**
     * @param value offset value
     */
    paginateDatatable(value: any): void;
    /**
     *
     * @param value pagination number
     * Perform pagination to the dataset
     * @return
     */
    paginateDatatableRecord(value: any): void;
}
import { ElementRef } from '@angular/core';
export declare class ImageFallBack {
    imgSrc: string;
    private el;
    private isApplied;
    private EVENT_TYPE;
    constructor(el: ElementRef);
    private onError();
    private removeEvents();
    ngOnDestroy(): void;
}
