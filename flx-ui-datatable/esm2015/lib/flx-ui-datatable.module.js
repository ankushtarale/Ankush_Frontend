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
export class FlxUiDatatableModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx4LXVpLWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbHgtdWktZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2ZseC11aS1kYXRhdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUMsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUU7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFDLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFFO0FBQ3RGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUU7QUFDNUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUU7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBRTtBQVlwQyxNQUFNOzs7WUFWTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsVUFBVTtpQkFDeEQ7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHVCQUF1QixFQUFDLElBQUksRUFBQyxhQUFhO2lCQUMzQztnQkFDRCxPQUFPLEVBQUMsQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUM7Z0JBQ3RDLFNBQVMsRUFBQyxDQUFDLHFCQUFxQixDQUFDO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnIDtcbmltcG9ydCB7IEZseFVpRGF0YXRhYmxlQ29tcG9uZW50LEltYWdlRmFsbEJhY2sgfSBmcm9tICcuL2ZseC11aS1kYXRhdGFibGUuY29tcG9uZW50JyA7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCcgO1xuaW1wb3J0IHsgRmx4VWlEYXRhdGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9mbHgtdWktZGF0YXRhYmxlLnNlcnZpY2UnIDtcbmltcG9ydCB7IENlaWwgfSBmcm9tICcuL2NlaWwucGlwZScgO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFJlYWN0aXZlRm9ybXNNb2R1bGUsRm9ybXNNb2R1bGUsSHR0cE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGbHhVaURhdGF0YWJsZUNvbXBvbmVudCxDZWlsLEltYWdlRmFsbEJhY2tcbiAgXSxcbiAgZXhwb3J0czpbRmx4VWlEYXRhdGFibGVDb21wb25lbnQsQ2VpbF0sXG4gIHByb3ZpZGVyczpbRmx4VWlEYXRhdGFibGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGbHhVaURhdGF0YWJsZU1vZHVsZSB7XG4gIFxufVxuIl19