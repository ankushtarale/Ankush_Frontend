"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _env = (typeof process == 'object' && process.env) || {};
const _platform = (typeof process == 'object' && process.platform) || '';
const _versions = (typeof process == 'object' && process.versions) || { node: '' };
const _os = (typeof os == 'object' && os) || { release: () => '' };
const streamMap = new WeakMap();
const ciVars = ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'];
function _getColorLevel(stream) {
    if ('FORCE_COLOR' in _env) {
        if (_env.FORCE_COLOR === '1') {
            return 3;
        }
        else if (_env.FORCE_COLOR === '0') {
            return 0;
        }
    }
    if (stream && !stream.isTTY && !_env.MSYSTEM) {
        return 0;
    }
    if (_platform.startsWith('win32') && !_env.MSYSTEM) {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
        // release that supports 256 colors.
        const osRelease = _os.release().split('.');
        if (Number(_versions.node.split('.')[0]) >= 8
            && Number(osRelease[0]) >= 10
            && Number(osRelease[2]) >= 10586) {
            return 2;
        }
        return 1;
    }
    if ('CI' in _env) {
        if (ciVars.some(sign => sign in _env) || _env.CI_NAME === 'codeship') {
            return 1;
        }
        return 0;
    }
    if ('TEAMCITY_VERSION' in _env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(_env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ('TERM_PROGRAM' in _env) {
        const version = parseInt((_env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch (_env.TERM_PROGRAM) {
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Hyper':
                return 3;
            case 'Apple_Terminal':
                return 2;
            // No default
        }
    }
    if (/-256(color)?$/i.test(_env.TERM)) {
        return 2;
    }
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(_env.TERM)) {
        return 1;
    }
    if ('COLORTERM' in _env) {
        return 1;
    }
    if (_env.TERM === 'dumb') {
        return 0;
    }
    return 0;
}
function _getRows() {
    return process.stdout.rows || null;
}
function _getColumns() {
    return process.stdout.columns || null;
}
function _createCapabilities(stream, isTerminalStream) {
    const level = _getColorLevel(stream);
    return {
        readable: stream.readable,
        writable: stream.writable,
        text: true,
        colors: level > 0,
        color256: level > 1,
        color16m: level > 2,
        rows: isTerminalStream ? _getRows() : null,
        columns: isTerminalStream ? _getColumns() : null,
    };
}
function getCapabilities(stream, isTerminalStream = !!stream.isTTY) {
    let maybeCaps = streamMap.get(stream);
    if (!maybeCaps) {
        maybeCaps = _createCapabilities(stream, isTerminalStream);
        streamMap.set(stream, maybeCaps);
    }
    return maybeCaps;
}
exports.getCapabilities = getCapabilities;
exports.stdin = getCapabilities(process.stdin);
exports.stdout = getCapabilities(process.stdout);
exports.stderr = getCapabilities(process.stderr);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwcy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdGVybWluYWwvY2Fwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQStCQSxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQy9ELE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxPQUFPLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLE9BQU8sSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ25GLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBRW5FLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO0FBdUN4RCxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRS9ELFNBQVMsY0FBYyxDQUFDLE1BQWM7SUFDcEMsSUFBSSxhQUFhLElBQUksSUFBSSxFQUFFO1FBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxHQUFHLEVBQUU7WUFDNUIsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxHQUFHLEVBQUU7WUFDbkMsT0FBTyxDQUFDLENBQUM7U0FDVjtLQUNGO0lBRUQsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8s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LENBQUMsUUFBUTtRQUN6QixJQUFJLEVBQUUsSUFBSTtRQUVWLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQztRQUNqQixRQUFRLEVBQUUsS0FBSyxHQUFHLENBQUM7UUFDbkIsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDO1FBRW5CLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDMUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtLQUNqRCxDQUFDO0FBQ0osQ0FBQztBQUdELFNBQWdCLGVBQWUsQ0FDN0IsTUFBYyxFQUNkLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztJQUVqQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxTQUFTLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBWEQsMENBV0M7QUFHWSxRQUFBLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQWUsQ0FBQyxDQUFDO0FBQ2pELFFBQUEsTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsUUFBQSxNQUFNLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCBSZWFkYWJsZVN0cmVhbSA9IE5vZGVKUy5SZWFkYWJsZVN0cmVhbTtcbmltcG9ydCBXcml0ZVN0cmVhbSA9IE5vZGVKUy5Xcml0ZVN0cmVhbTtcbmltcG9ydCBTb2NrZXQgPSBOb2RlSlMuU29ja2V0O1xuXG5cbi8qKlxuICogTm9kZSBzcGVjaWZpYyBzdHVmZi5cbiAqL1xuZGVjbGFyZSBjb25zdCBwcm9jZXNzOiB7XG4gIGVudjogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gIHBsYXRmb3JtOiBzdHJpbmc7XG4gIHZlcnNpb25zOiB7XG4gICAgbm9kZTogc3RyaW5nO1xuICB9O1xuXG4gIHN0ZGluOiBSZWFkYWJsZVN0cmVhbTtcbiAgc3Rkb3V0OiBXcml0ZVN0cmVhbTtcbiAgc3RkZXJyOiBXcml0ZVN0cmVhbTtcbn07XG5kZWNsYXJlIGNvbnN0IG9zOiB7XG4gIHJlbGVhc2U6ICgpID0+IHN0cmluZztcbn07XG5cblxuY29uc3QgX2VudiA9ICh0eXBlb2YgcHJvY2VzcyA9PSAnb2JqZWN0JyAmJiBwcm9jZXNzLmVudikgfHwge307XG5jb25zdCBfcGxhdGZvcm0gPSAodHlwZW9mIHByb2Nlc3MgPT0gJ29iamVjdCcgJiYgcHJvY2Vzcy5wbGF0Zm9ybSkgfHwgJyc7XG5jb25zdCBfdmVyc2lvbnMgPSAodHlwZW9mIHByb2Nlc3MgPT0gJ29iamVjdCcgJiYgcHJvY2Vzcy52ZXJzaW9ucykgfHwgeyBub2RlOiAnJyB9O1xuY29uc3QgX29zID0gKHR5cGVvZiBvcyA9PSAnb2JqZWN0JyAmJiBvcykgfHwgeyByZWxlYXNlOiAoKSA9PiAnJyB9O1xuXG5jb25zdCBzdHJlYW1NYXAgPSBuZXcgV2Vha01hcDx7fSwgU3RyZWFtQ2FwYWJpbGl0aWVzPigpO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtQ2FwYWJpbGl0aWVzIHtcbiAgcmVhZGFibGU6IGJvb2xlYW47XG4gIHdyaXRhYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTdXBwb3J0cyB0ZXh0LiBUaGlzIHNob3VsZCBiZSB0cnVlIGZvciBhbnkgc3RyZWFtcy5cbiAgICovXG4gIHRleHQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFN1cHBvcnRzIGNvbG9ycyAoMTYgY29sb3JzKS5cbiAgICovXG4gIGNvbG9yczogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3VwcG9ydHMgMjU2IGNvbG9ycy5cbiAgICovXG4gIGNvbG9yMjU2OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTdXBwb3J0cyAxNiBtaWxsaW9ucyAoM3g4LWJpdCBjaGFubmVscykgY29sb3JzLlxuICAgKi9cbiAgY29sb3IxNm06IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiB0aGUgdGVybWluYWwuIElmIHRoZSBzdHJlYW0gaXMgbm90IHRpZWQgdG8gYSB0ZXJtaW5hbCwgd2lsbCBiZSBudWxsLlxuICAgKi9cbiAgcm93czogbnVtYmVyIHwgbnVsbDtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHRlcm1pbmFsLiBJZiB0aGUgc3RyZWFtIGlzIG5vdCB0aWVkIHRvIGEgdGVybWluYWwsIHdpbGwgYmUgbnVsbC5cbiAgICovXG4gIGNvbHVtbnM6IG51bWJlciB8IG51bGw7XG59XG5cblxuY29uc3QgY2lWYXJzID0gWydUUkFWSVMnLCAnQ0lSQ0xFQ0knLCAnQVBQVkVZT1InLCAnR0lUTEFCX0NJJ107XG5cbmZ1bmN0aW9uIF9nZXRDb2xvckxldmVsKHN0cmVhbTogU29ja2V0KTogMCB8IDEgfCAyIHwgMyB7XG4gIGlmICgnRk9SQ0VfQ09MT1InIGluIF9lbnYpIHtcbiAgICBpZiAoX2Vudi5GT1JDRV9DT0xPUiA9PT0gJzEnKSB7XG4gICAgICByZXR1cm4gMztcbiAgICB9IGVsc2UgaWYgKF9lbnYuRk9SQ0VfQ09MT1IgPT09ICcwJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0cmVhbSAmJiAhc3RyZWFtLmlzVFRZICYmICFfZW52Lk1TWVNURU0pIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChfcGxhdGZvcm0uc3RhcnRzV2l0aCgnd2luMzInKSAmJiAhX2Vudi5NU1lTVEVNKSB7XG4gICAgLy8gTm9kZS5qcyA3LjUuMCBpcyB0aGUgZmlyc3QgdmVyc2lvbiBvZiBOb2RlLmpzIHRvIGluY2x1ZGUgYSBwYXRjaCB0b1xuICAgIC8vIGxpYnV2IHRoYXQgZW5hYmxlcyAyNTYgY29sb3Igb3V0cHV0IG9uIFdpbmRvd3MuIEFueXRoaW5nIGVhcmxpZXIgYW5kIGl0XG4gICAgLy8gd29uJ3Qgd29yay4gSG93ZXZlciwgaGVyZSB3ZSB0YXJnZXQgTm9kZS5qcyA4IGF0IG1pbmltdW0gYXMgaXQgaXMgYW4gTFRTXG4gICAgLy8gcmVsZWFzZSwgYW5kIE5vZGUuanMgNyBpcyBub3QuIFdpbmRvd3MgMTAgYnVpbGQgMTA1ODYgaXMgdGhlIGZpcnN0IFdpbmRvd3NcbiAgICAvLyByZWxlYXNlIHRoYXQgc3VwcG9ydHMgMjU2IGNvbG9ycy5cbiAgICBjb25zdCBvc1JlbGVhc2UgPSBfb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG4gICAgaWYgKE51bWJlcihfdmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4XG4gICAgICAgICYmIE51bWJlcihvc1JlbGVhc2VbMF0pID49IDEwXG4gICAgICAgICYmIE51bWJlcihvc1JlbGVhc2VbMl0pID49IDEwNTg2KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG5cbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmICgnQ0knIGluIF9lbnYpIHtcbiAgICBpZiAoY2lWYXJzLnNvbWUoc2lnbiA9PiBzaWduIGluIF9lbnYpIHx8IF9lbnYuQ0lfTkFNRSA9PT0gJ2NvZGVzaGlwJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIF9lbnYpIHtcbiAgICByZXR1cm4gL14oOVxcLigwKlsxLTldXFxkKilcXC58XFxkezIsfVxcLikvLnRlc3QoX2Vudi5URUFNQ0lUWV9WRVJTSU9OKSA/IDEgOiAwO1xuICB9XG5cbiAgaWYgKCdURVJNX1BST0dSQU0nIGluIF9lbnYpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gcGFyc2VJbnQoKF9lbnYuVEVSTV9QUk9HUkFNX1ZFUlNJT04gfHwgJycpLnNwbGl0KCcuJylbMF0sIDEwKTtcblxuICAgIHN3aXRjaCAoX2Vudi5URVJNX1BST0dSQU0pIHtcbiAgICAgIGNhc2UgJ2lUZXJtLmFwcCc6XG4gICAgICAgIHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcbiAgICAgIGNhc2UgJ0h5cGVyJzpcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICBjYXNlICdBcHBsZV9UZXJtaW5hbCc6XG4gICAgICAgIHJldHVybiAyO1xuXG4gICAgICAvLyBObyBkZWZhdWx0XG4gICAgfVxuICB9XG5cbiAgaWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChfZW52LlRFUk0pKSB7XG4gICAgcmV0dXJuIDI7XG4gIH1cblxuICBpZiAoL15zY3JlZW58Xnh0ZXJtfF52dDEwMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoX2Vudi5URVJNKSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKCdDT0xPUlRFUk0nIGluIF9lbnYpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChfZW52LlRFUk0gPT09ICdkdW1iJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cblxuZnVuY3Rpb24gX2dldFJvd3MoKSB7XG4gIHJldHVybiBwcm9jZXNzLnN0ZG91dC5yb3dzIHx8IG51bGw7XG59XG5mdW5jdGlvbiBfZ2V0Q29sdW1ucygpIHtcbiAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LmNvbHVtbnMgfHwgbnVsbDtcbn1cblxuXG5mdW5jdGlvbiBfY3JlYXRlQ2FwYWJpbGl0aWVzKHN0cmVhbTogU29ja2V0LCBpc1Rlcm1pbmFsU3RyZWFtOiBib29sZWFuKTogU3RyZWFtQ2FwYWJpbGl0aWVzIHtcbiAgY29uc3QgbGV2ZWwgPSBfZ2V0Q29sb3JMZXZlbChzdHJlYW0pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZGFibGU6IHN0cmVhbS5yZWFkYWJsZSxcbiAgICB3cml0YWJsZTogc3RyZWFtLndyaXRhYmxlLFxuICAgIHRleHQ6IHRydWUsXG5cbiAgICBjb2xvcnM6IGxldmVsID4gMCxcbiAgICBjb2xvcjI1NjogbGV2ZWwgPiAxLFxuICAgIGNvbG9yMTZtOiBsZXZlbCA+IDIsXG5cbiAgICByb3dzOiBpc1Rlcm1pbmFsU3RyZWFtID8gX2dldFJvd3MoKSA6IG51bGwsXG4gICAgY29sdW1uczogaXNUZXJtaW5hbFN0cmVhbSA/IF9nZXRDb2x1bW5zKCkgOiBudWxsLFxuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXBhYmlsaXRpZXMoXG4gIHN0cmVhbTogU29ja2V0LFxuICBpc1Rlcm1pbmFsU3RyZWFtID0gISFzdHJlYW0uaXNUVFksXG4pOiBTdHJlYW1DYXBhYmlsaXRpZXMge1xuICBsZXQgbWF5YmVDYXBzID0gc3RyZWFtTWFwLmdldChzdHJlYW0pO1xuICBpZiAoIW1heWJlQ2Fwcykge1xuICAgIG1heWJlQ2FwcyA9IF9jcmVhdGVDYXBhYmlsaXRpZXMoc3RyZWFtLCBpc1Rlcm1pbmFsU3RyZWFtKTtcbiAgICBzdHJlYW1NYXAuc2V0KHN0cmVhbSwgbWF5YmVDYXBzKTtcbiAgfVxuXG4gIHJldHVybiBtYXliZUNhcHM7XG59XG5cblxuZXhwb3J0IGNvbnN0IHN0ZGluID0gZ2V0Q2FwYWJpbGl0aWVzKHByb2Nlc3Muc3RkaW4gYXMgU29ja2V0KTtcbmV4cG9ydCBjb25zdCBzdGRvdXQgPSBnZXRDYXBhYmlsaXRpZXMocHJvY2Vzcy5zdGRvdXQpO1xuZXhwb3J0IGNvbnN0IHN0ZGVyciA9IGdldENhcGFiaWxpdGllcyhwcm9jZXNzLnN0ZGVycik7XG4iXX0=