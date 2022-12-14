/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlxUiDatatableComponent, ImageFallBack } from './flx-ui-datatable.component';
import { HttpModule } from '@angular/http';
import { FlxUiDatatableService } from './flx-ui-datatable.service';
import { Ceil } from './ceil.pipe';
var FlxUiDatatableModule = /** @class */ (function () {
    function FlxUiDatatableModule() {
    }
    FlxUiDatatableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, ReactiveFormsModule, FormsModule, HttpModule
                    ],
                    declarations: [
                        FlxUiDatatableComponent, Ceil, ImageFallBack
                    ],
                    exports: [FlxUiDatatableComponent, Ceil],
                    providers: [FlxUiDatatableService]
                },] },
    ];
    return FlxUiDatatableModule;
}());
export { FlxUiDatatableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbHgtdWktZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2ZseC11aS1kYXRhdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUMsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUU7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFDLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFFO0FBQ3RGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUU7QUFDNUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUU7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBRTs7Ozs7Z0JBRW5DLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxVQUFVO3FCQUN4RDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osdUJBQXVCLEVBQUMsSUFBSSxFQUFDLGFBQWE7cUJBQzNDO29CQUNELE9BQU8sRUFBQyxDQUFDLHVCQUF1QixFQUFDLElBQUksQ0FBQztvQkFDdEMsU0FBUyxFQUFDLENBQUMscUJBQXFCLENBQUM7aUJBQ2xDOzsrQkFqQkQ7O1NBa0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSxGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJyA7XG5pbXBvcnQgeyBGbHhVaURhdGF0YWJsZUNvbXBvbmVudCxJbWFnZUZhbGxCYWNrIH0gZnJvbSAnLi9mbHgtdWktZGF0YXRhYmxlLmNvbXBvbmVudCcgO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnIDtcbmltcG9ydCB7IEZseFVpRGF0YXRhYmxlU2VydmljZSB9IGZyb20gJy4vZmx4LXVpLWRhdGF0YWJsZS5zZXJ2aWNlJyA7XG5pbXBvcnQgeyBDZWlsIH0gZnJvbSAnLi9jZWlsLnBpcGUnIDtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxSZWFjdGl2ZUZvcm1zTW9kdWxlLEZvcm1zTW9kdWxlLEh0dHBNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRmx4VWlEYXRhdGFibGVDb21wb25lbnQsQ2VpbCxJbWFnZUZhbGxCYWNrXG4gIF0sXG4gIGV4cG9ydHM6W0ZseFVpRGF0YXRhYmxlQ29tcG9uZW50LENlaWxdLFxuICBwcm92aWRlcnM6W0ZseFVpRGF0YXRhYmxlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRmx4VWlEYXRhdGFibGVNb2R1bGUge1xuICBcbn1cbiJdfQ==