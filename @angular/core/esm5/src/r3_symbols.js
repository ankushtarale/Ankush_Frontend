/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This file exists to support compilation of @angular/core in Ivy mode.
 *
 * When the Angular compiler processes a compilation unit, it normally writes imports to
 * @angular/core. When compiling the core package itself this strategy isn't usable. Instead, the
 * compiler writes imports to this file.
 *
 * Only a subset of such imports are supported - core is not allowed to declare components or pipes.
 * A check in ngtsc's translator.ts validates this condition. The translator is responsible for
 * translating an external name (prefixed with ɵ) to the internal symbol name as exported below.
 *
 * The below symbols are used for @Injectable and @NgModule compilation.
 */
export { defineInjectable, defineInjector } from './di/defs';
export { inject } from './di/injector_compatibility';
export { defineNgModule } from './render3/definition';
export { setClassMetadata } from './render3/metadata';
export { NgModuleFactory } from './render3/ng_module_ref';
/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
export var ITS_JUST_ANGULAR = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3IzX3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsT0FBTyxFQUE2QixnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRW5ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHeEQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKlxuICogVGhpcyBmaWxlIGV4aXN0cyB0byBzdXBwb3J0IGNvbXBpbGF0aW9uIG9mIEBhbmd1bGFyL2NvcmUgaW4gSXZ5IG1vZGUuXG4gKlxuICogV2hlbiB0aGUgQW5ndWxhciBjb21waWxlciBwcm9jZXNzZXMgYSBjb21waWxhdGlvbiB1bml0LCBpdCBub3JtYWxseSB3cml0ZXMgaW1wb3J0cyB0b1xuICogQGFuZ3VsYXIvY29yZS4gV2hlbiBjb21waWxpbmcgdGhlIGNvcmUgcGFja2FnZSBpdHNlbGYgdGhpcyBzdHJhdGVneSBpc24ndCB1c2FibGUuIEluc3RlYWQsIHRoZVxuICogY29tcGlsZXIgd3JpdGVzIGltcG9ydHMgdG8gdGhpcyBmaWxlLlxuICpcbiAqIE9ubHkgYSBzdWJzZXQgb2Ygc3VjaCBpbXBvcnRzIGFyZSBzdXBwb3J0ZWQgLSBjb3JlIGlzIG5vdCBhbGxvd2VkIHRvIGRlY2xhcmUgY29tcG9uZW50cyBvciBwaXBlcy5cbiAqIEEgY2hlY2sgaW4gbmd0c2MncyB0cmFuc2xhdG9yLnRzIHZhbGlkYXRlcyB0aGlzIGNvbmRpdGlvbi4gVGhlIHRyYW5zbGF0b3IgaXMgcmVzcG9uc2libGUgZm9yXG4gKiB0cmFuc2xhdGluZyBhbiBleHRlcm5hbCBuYW1lIChwcmVmaXhlZCB3aXRoIMm1KSB0byB0aGUgaW50ZXJuYWwgc3ltYm9sIG5hbWUgYXMgZXhwb3J0ZWQgYmVsb3cuXG4gKlxuICogVGhlIGJlbG93IHN5bWJvbHMgYXJlIHVzZWQgZm9yIEBJbmplY3RhYmxlIGFuZCBATmdNb2R1bGUgY29tcGlsYXRpb24uXG4gKi9cblxuZXhwb3J0IHtJbmplY3RhYmxlRGVmLCBJbmplY3RvckRlZiwgZGVmaW5lSW5qZWN0YWJsZSwgZGVmaW5lSW5qZWN0b3J9IGZyb20gJy4vZGkvZGVmcyc7XG5leHBvcnQge2luamVjdH0gZnJvbSAnLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmV4cG9ydCB7TmdNb2R1bGVEZWYsIE5nTW9kdWxlRGVmV2l0aE1ldGF9IGZyb20gJy4vbWV0YWRhdGEvbmdfbW9kdWxlJztcbmV4cG9ydCB7ZGVmaW5lTmdNb2R1bGV9IGZyb20gJy4vcmVuZGVyMy9kZWZpbml0aW9uJztcbmV4cG9ydCB7c2V0Q2xhc3NNZXRhZGF0YX0gZnJvbSAnLi9yZW5kZXIzL21ldGFkYXRhJztcbmV4cG9ydCB7TmdNb2R1bGVGYWN0b3J5fSBmcm9tICcuL3JlbmRlcjMvbmdfbW9kdWxlX3JlZic7XG5cblxuLyoqXG4gKiBUaGUgZXhpc3RlbmNlIG9mIHRoaXMgY29uc3RhbnQgKGluIHRoaXMgcGFydGljdWxhciBmaWxlKSBpbmZvcm1zIHRoZSBBbmd1bGFyIGNvbXBpbGVyIHRoYXQgdGhlXG4gKiBjdXJyZW50IHByb2dyYW0gaXMgYWN0dWFsbHkgQGFuZ3VsYXIvY29yZSwgd2hpY2ggbmVlZHMgdG8gYmUgY29tcGlsZWQgc3BlY2lhbGx5LlxuICovXG5leHBvcnQgY29uc3QgSVRTX0pVU1RfQU5HVUxBUiA9IHRydWU7XG4iXX0=