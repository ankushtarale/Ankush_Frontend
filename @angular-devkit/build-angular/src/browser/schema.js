"use strict";
// THIS FILE IS AUTOMATICALLY GENERATED. TO UPDATE THIS FILE YOU NEED TO CHANGE THE
// CORRESPONDING JSON SCHEMA FILE, THEN RUN devkit-admin build (or bazel build ...).
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The type of budget.
 */
var Type;
(function (Type) {
    Type["All"] = "all";
    Type["AllScript"] = "allScript";
    Type["Any"] = "any";
    Type["AnyScript"] = "anyScript";
    Type["Bundle"] = "bundle";
    Type["Initial"] = "initial";
})(Type = exports.Type || (exports.Type = {}));
/**
 * Define the output filename cache-busting hashing mode.
 */
var OutputHashing;
(function (OutputHashing) {
    OutputHashing["All"] = "all";
    OutputHashing["Bundles"] = "bundles";
    OutputHashing["Media"] = "media";
    OutputHashing["None"] = "none";
})(OutputHashing = exports.OutputHashing || (exports.OutputHashing = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJkaXN0LXNjaGVtYS9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9icm93c2VyL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUZBQW1GO0FBQ25GLG9GQUFvRjs7QUE4UXBGOztHQUVHO0FBQ0gsSUFBWSxJQU9YO0FBUEQsV0FBWSxJQUFJO0lBQ1osbUJBQVcsQ0FBQTtJQUNYLCtCQUF1QixDQUFBO0lBQ3ZCLG1CQUFXLENBQUE7SUFDWCwrQkFBdUIsQ0FBQTtJQUN2Qix5QkFBaUIsQ0FBQTtJQUNqQiwyQkFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBUFcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBT2Y7QUF5QkQ7O0dBRUc7QUFDSCxJQUFZLGFBS1g7QUFMRCxXQUFZLGFBQWE7SUFDckIsNEJBQVcsQ0FBQTtJQUNYLG9DQUFtQixDQUFBO0lBQ25CLGdDQUFlLENBQUE7SUFDZiw4QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFMVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt4QiIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gVEhJUyBGSUxFIElTIEFVVE9NQVRJQ0FMTFkgR0VORVJBVEVELiBUTyBVUERBVEUgVEhJUyBGSUxFIFlPVSBORUVEIFRPIENIQU5HRSBUSEVcbi8vIENPUlJFU1BPTkRJTkcgSlNPTiBTQ0hFTUEgRklMRSwgVEhFTiBSVU4gZGV2a2l0LWFkbWluIGJ1aWxkIChvciBiYXplbCBidWlsZCAuLi4pLlxuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGVcbi8vIHRzbGludDpkaXNhYmxlXG5cbi8qKlxuICogQnJvd3NlciB0YXJnZXQgb3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gICAgLyoqXG4gICAgICogQnVpbGQgdXNpbmcgQWhlYWQgb2YgVGltZSBjb21waWxhdGlvbi5cbiAgICAgKi9cbiAgICBhb3Q/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygc3RhdGljIGFwcGxpY2F0aW9uIGFzc2V0cy5cbiAgICAgKi9cbiAgICBhc3NldHM/OiBBc3NldFBhdHRlcm5bXTtcbiAgICAvKipcbiAgICAgKiBCYXNlIHVybCBmb3IgdGhlIGFwcGxpY2F0aW9uIGJlaW5nIGJ1aWx0LlxuICAgICAqL1xuICAgIGJhc2VIcmVmPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJ1ZGdldCB0aHJlc2hvbGRzIHRvIGVuc3VyZSBwYXJ0cyBvZiB5b3VyIGFwcGxpY2F0aW9uIHN0YXkgd2l0aGluIGJvdW5kYXJpZXMgd2hpY2ggeW91XG4gICAgICogc2V0LlxuICAgICAqL1xuICAgIGJ1ZGdldHM/OiBCdWRnZXRbXTtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzICdAYW5ndWxhci1kZXZraXQvYnVpbGQtb3B0aW1pemVyJyBvcHRpbWl6YXRpb25zIHdoZW4gdXNpbmcgdGhlICdhb3QnIG9wdGlvbi5cbiAgICAgKi9cbiAgICBidWlsZE9wdGltaXplcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVXNlIGEgc2VwYXJhdGUgYnVuZGxlIGNvbnRhaW5pbmcgY29kZSB1c2VkIGFjcm9zcyBtdWx0aXBsZSBidW5kbGVzLlxuICAgICAqL1xuICAgIGNvbW1vbkNodW5rPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIG91dHB1dCBwYXRoIGJlZm9yZSBidWlsZGluZy5cbiAgICAgKi9cbiAgICBkZWxldGVPdXRwdXRQYXRoPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBVUkwgd2hlcmUgZmlsZXMgd2lsbCBiZSBkZXBsb3llZC5cbiAgICAgKi9cbiAgICBkZXBsb3lVcmw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBjb25kaXRpb25hbGx5IGxvYWRlZCBFUzIwMTUgcG9seWZpbGxzLlxuICAgICAqL1xuICAgIGVzNUJyb3dzZXJTdXBwb3J0PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBPdXRwdXQgaW4tZmlsZSBldmFsIHNvdXJjZW1hcHMuXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBldmFsU291cmNlTWFwPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IGNzcyBmcm9tIGdsb2JhbCBzdHlsZXMgaW50byBjc3MgZmlsZXMgaW5zdGVhZCBvZiBqcyBvbmVzLlxuICAgICAqL1xuICAgIGV4dHJhY3RDc3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgYWxsIGxpY2Vuc2VzIGluIGEgc2VwYXJhdGUgZmlsZS5cbiAgICAgKi9cbiAgICBleHRyYWN0TGljZW5zZXM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgZmlsZXMgd2l0aCBvdGhlciBmaWxlcyBpbiB0aGUgYnVpbGQuXG4gICAgICovXG4gICAgZmlsZVJlcGxhY2VtZW50cz86IEZpbGVSZXBsYWNlbWVudFtdO1xuICAgIC8qKlxuICAgICAqIFJ1biB0aGUgVHlwZVNjcmlwdCB0eXBlIGNoZWNrZXIgaW4gYSBmb3JrZWQgcHJvY2Vzcy5cbiAgICAgKi9cbiAgICBmb3JrVHlwZUNoZWNrZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIExvY2FsaXphdGlvbiBmaWxlIHRvIHVzZSBmb3IgaTE4bi5cbiAgICAgKi9cbiAgICBpMThuRmlsZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgb2YgdGhlIGxvY2FsaXphdGlvbiBmaWxlIHNwZWNpZmllZCB3aXRoIC0taTE4bi1maWxlLlxuICAgICAqL1xuICAgIGkxOG5Gb3JtYXQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTG9jYWxlIHRvIHVzZSBmb3IgaTE4bi5cbiAgICAgKi9cbiAgICBpMThuTG9jYWxlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEhvdyB0byBoYW5kbGUgbWlzc2luZyB0cmFuc2xhdGlvbnMgZm9yIGkxOG4uXG4gICAgICovXG4gICAgaTE4bk1pc3NpbmdUcmFuc2xhdGlvbj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgaW5kZXggSFRNTCBmaWxlLlxuICAgICAqL1xuICAgIGluZGV4OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBhZGRpdGlvbmFsIE5nTW9kdWxlIGZpbGVzIHRoYXQgd2lsbCBiZSBsYXp5IGxvYWRlZC4gTGF6eSByb3V0ZXIgbW9kdWxlcyB3aWxsIGJlXG4gICAgICogZGlzY292ZXJlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAqL1xuICAgIGxhenlNb2R1bGVzPzogc3RyaW5nW107XG4gICAgLyoqXG4gICAgICogVGhlIGZ1bGwgcGF0aCBmb3IgdGhlIG1haW4gZW50cnkgcG9pbnQgdG8gdGhlIGFwcCwgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya3NwYWNlLlxuICAgICAqL1xuICAgIG1haW46IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBVc2UgZmlsZSBuYW1lIGZvciBsYXp5IGxvYWRlZCBjaHVua3MuXG4gICAgICovXG4gICAgbmFtZWRDaHVua3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFBhdGggdG8gbmdzdy1jb25maWcuanNvbi5cbiAgICAgKi9cbiAgICBuZ3N3Q29uZmlnUGF0aD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIG9wdGltaXphdGlvbiBvZiB0aGUgYnVpbGQgb3V0cHV0LlxuICAgICAqL1xuICAgIG9wdGltaXphdGlvbj86IE9wdGltaXphdGlvblVuaW9uO1xuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgb3V0cHV0IGZpbGVuYW1lIGNhY2hlLWJ1c3RpbmcgaGFzaGluZyBtb2RlLlxuICAgICAqL1xuICAgIG91dHB1dEhhc2hpbmc/OiBPdXRwdXRIYXNoaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBmdWxsIHBhdGggZm9yIHRoZSBuZXcgb3V0cHV0IGRpcmVjdG9yeSwgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya3NwYWNlLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgd3JpdGVzIG91dHB1dCB0byBhIGZvbGRlciBuYW1lZCBkaXN0LyBpbiB0aGUgY3VycmVudCBwcm9qZWN0LlxuICAgICAqL1xuICAgIG91dHB1dFBhdGg6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBFbmFibGUgYW5kIGRlZmluZSB0aGUgZmlsZSB3YXRjaGluZyBwb2xsIHRpbWUgcGVyaW9kIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgKi9cbiAgICBwb2xsPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBmdWxsIHBhdGggZm9yIHRoZSBwb2x5ZmlsbHMgZmlsZSwgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya3NwYWNlLlxuICAgICAqL1xuICAgIHBvbHlmaWxscz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBEbyBub3QgdXNlIHRoZSByZWFsIHBhdGggd2hlbiByZXNvbHZpbmcgbW9kdWxlcy5cbiAgICAgKi9cbiAgICBwcmVzZXJ2ZVN5bWxpbmtzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBPdXRwdXQgcHJvZmlsZSBldmVudHMgZm9yIENocm9tZSBwcm9maWxlci5cbiAgICAgKi9cbiAgICBwcm9maWxlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBMb2cgcHJvZ3Jlc3MgdG8gdGhlIGNvbnNvbGUgd2hpbGUgYnVpbGRpbmcuXG4gICAgICovXG4gICAgcHJvZ3Jlc3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENoYW5nZSByb290IHJlbGF0aXZlIFVSTHMgaW4gc3R5bGVzaGVldHMgdG8gaW5jbHVkZSBiYXNlIEhSRUYgYW5kIGRlcGxveSBVUkwuIFVzZSBvbmx5XG4gICAgICogZm9yIGNvbXBhdGliaWxpdHkgYW5kIHRyYW5zaXRpb24uIFRoZSBiZWhhdmlvciBvZiB0aGlzIG9wdGlvbiBpcyBub24tc3RhbmRhcmQgYW5kIHdpbGwgYmVcbiAgICAgKiByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICByZWJhc2VSb290UmVsYXRpdmVDc3NVcmxzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgcGF0aCB3aGVyZSBzdHlsZSByZXNvdXJjZXMgd2lsbCBiZSBwbGFjZWQsIHJlbGF0aXZlIHRvIG91dHB1dFBhdGguXG4gICAgICovXG4gICAgcmVzb3VyY2VzT3V0cHV0UGF0aD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBHbG9iYWwgc2NyaXB0cyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgYnVpbGQuXG4gICAgICovXG4gICAgc2NyaXB0cz86IEV4dHJhRW50cnlQb2ludFtdO1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHNlcnZpY2Ugd29ya2VyIGNvbmZpZyBmb3IgcHJvZHVjdGlvbiBidWlsZHMuXG4gICAgICovXG4gICAgc2VydmljZVdvcmtlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdyBjaXJjdWxhciBkZXBlbmRlbmN5IHdhcm5pbmdzIG9uIGJ1aWxkcy5cbiAgICAgKi9cbiAgICBzaG93Q2lyY3VsYXJEZXBlbmRlbmNpZXM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEZsYWcgdG8gcHJldmVudCBidWlsZGluZyBhbiBhcHAgc2hlbGwuXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBza2lwQXBwU2hlbGw/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE91dHB1dCBzb3VyY2VtYXBzLlxuICAgICAqL1xuICAgIHNvdXJjZU1hcD86IFNvdXJjZU1hcFVuaW9uO1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhICdzdGF0cy5qc29uJyBmaWxlIHdoaWNoIGNhbiBiZSBhbmFseXplZCB1c2luZyB0b29scyBzdWNoIGFzXG4gICAgICogJ3dlYnBhY2stYnVuZGxlLWFuYWx5emVyJy5cbiAgICAgKi9cbiAgICBzdGF0c0pzb24/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgdG8gcGFzcyB0byBzdHlsZSBwcmVwcm9jZXNzb3JzLlxuICAgICAqL1xuICAgIHN0eWxlUHJlcHJvY2Vzc29yT3B0aW9ucz86IFN0eWxlUHJlcHJvY2Vzc29yT3B0aW9ucztcbiAgICAvKipcbiAgICAgKiBHbG9iYWwgc3R5bGVzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICAgKi9cbiAgICBzdHlsZXM/OiBFeHRyYUVudHJ5UG9pbnRbXTtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRoZSB1c2Ugb2Ygc3VicmVzb3VyY2UgaW50ZWdyaXR5IHZhbGlkYXRpb24uXG4gICAgICovXG4gICAgc3VicmVzb3VyY2VJbnRlZ3JpdHk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFRoZSBmdWxsIHBhdGggZm9yIHRoZSBUeXBlU2NyaXB0IGNvbmZpZ3VyYXRpb24gZmlsZSwgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya3NwYWNlLlxuICAgICAqL1xuICAgIHRzQ29uZmlnOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVXNlIGEgc2VwYXJhdGUgYnVuZGxlIGNvbnRhaW5pbmcgb25seSB2ZW5kb3IgbGlicmFyaWVzLlxuICAgICAqL1xuICAgIHZlbmRvckNodW5rPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIHZlbmRvciBwYWNrYWdlcyBzb3VyY2VtYXBzLlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgdmVuZG9yU291cmNlTWFwPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBBZGRzIG1vcmUgZGV0YWlscyB0byBvdXRwdXQgbG9nZ2luZy5cbiAgICAgKi9cbiAgICB2ZXJib3NlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSdW4gYnVpbGQgd2hlbiBmaWxlcyBjaGFuZ2UuXG4gICAgICovXG4gICAgd2F0Y2g/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBBc3NldFBhdHRlcm4gPSBBc3NldFBhdHRlcm5DbGFzcyB8IHN0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBBc3NldFBhdHRlcm5DbGFzcyB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhdHRlcm4gdG8gbWF0Y2guXG4gICAgICovXG4gICAgZ2xvYjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGdsb2JzIHRvIGlnbm9yZS5cbiAgICAgKi9cbiAgICBpZ25vcmU/OiBzdHJpbmdbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgaW5wdXQgZGlyZWN0b3J5IHBhdGggaW4gd2hpY2ggdG8gYXBwbHkgJ2dsb2InLiBEZWZhdWx0cyB0byB0aGUgcHJvamVjdCByb290LlxuICAgICAqL1xuICAgIGlucHV0OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQWJzb2x1dGUgcGF0aCB3aXRoaW4gdGhlIG91dHB1dC5cbiAgICAgKi9cbiAgICBvdXRwdXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdWRnZXQge1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlbGluZSBzaXplIGZvciBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGJhc2VsaW5lPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSB0aHJlc2hvbGQgZm9yIGVycm9yIHJlbGF0aXZlIHRvIHRoZSBiYXNlbGluZSAobWluICYgbWF4KS5cbiAgICAgKi9cbiAgICBlcnJvcj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSB0aHJlc2hvbGQgZm9yIGVycm9yIHJlbGF0aXZlIHRvIHRoZSBiYXNlbGluZS5cbiAgICAgKi9cbiAgICBtYXhpbXVtRXJyb3I/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gdGhyZXNob2xkIGZvciB3YXJuaW5nIHJlbGF0aXZlIHRvIHRoZSBiYXNlbGluZS5cbiAgICAgKi9cbiAgICBtYXhpbXVtV2FybmluZz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbWluaW11bSB0aHJlc2hvbGQgZm9yIGVycm9yIHJlbGF0aXZlIHRvIHRoZSBiYXNlbGluZS5cbiAgICAgKi9cbiAgICBtaW5pbXVtRXJyb3I/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG1pbmltdW0gdGhyZXNob2xkIGZvciB3YXJuaW5nIHJlbGF0aXZlIHRvIHRoZSBiYXNlbGluZS5cbiAgICAgKi9cbiAgICBtaW5pbXVtV2FybmluZz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYnVuZGxlLlxuICAgICAqL1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgYnVkZ2V0LlxuICAgICAqL1xuICAgIHR5cGU6IFR5cGU7XG4gICAgLyoqXG4gICAgICogVGhlIHRocmVzaG9sZCBmb3Igd2FybmluZyByZWxhdGl2ZSB0byB0aGUgYmFzZWxpbmUgKG1pbiAmIG1heCkuXG4gICAgICovXG4gICAgd2FybmluZz86IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgdHlwZSBvZiBidWRnZXQuXG4gKi9cbmV4cG9ydCBlbnVtIFR5cGUge1xuICAgIEFsbCA9IFwiYWxsXCIsXG4gICAgQWxsU2NyaXB0ID0gXCJhbGxTY3JpcHRcIixcbiAgICBBbnkgPSBcImFueVwiLFxuICAgIEFueVNjcmlwdCA9IFwiYW55U2NyaXB0XCIsXG4gICAgQnVuZGxlID0gXCJidW5kbGVcIixcbiAgICBJbml0aWFsID0gXCJpbml0aWFsXCIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVJlcGxhY2VtZW50IHtcbiAgICByZXBsYWNlPzogICAgIHN0cmluZztcbiAgICByZXBsYWNlV2l0aD86IHN0cmluZztcbiAgICBzcmM/OiAgICAgICAgIHN0cmluZztcbiAgICB3aXRoPzogICAgICAgIHN0cmluZztcbn1cblxuLyoqXG4gKiBFbmFibGVzIG9wdGltaXphdGlvbiBvZiB0aGUgYnVpbGQgb3V0cHV0LlxuICovXG5leHBvcnQgdHlwZSBPcHRpbWl6YXRpb25VbmlvbiA9IGJvb2xlYW4gfCBPcHRpbWl6YXRpb25DbGFzcztcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpbWl6YXRpb25DbGFzcyB7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvcHRpbWl6YXRpb24gb2YgdGhlIHNjcmlwdHMgb3V0cHV0LlxuICAgICAqL1xuICAgIHNjcmlwdHM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb3B0aW1pemF0aW9uIG9mIHRoZSBzdHlsZXMgb3V0cHV0LlxuICAgICAqL1xuICAgIHN0eWxlcz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVmaW5lIHRoZSBvdXRwdXQgZmlsZW5hbWUgY2FjaGUtYnVzdGluZyBoYXNoaW5nIG1vZGUuXG4gKi9cbmV4cG9ydCBlbnVtIE91dHB1dEhhc2hpbmcge1xuICAgIEFsbCA9IFwiYWxsXCIsXG4gICAgQnVuZGxlcyA9IFwiYnVuZGxlc1wiLFxuICAgIE1lZGlhID0gXCJtZWRpYVwiLFxuICAgIE5vbmUgPSBcIm5vbmVcIixcbn1cblxuZXhwb3J0IHR5cGUgRXh0cmFFbnRyeVBvaW50ID0gRXh0cmFFbnRyeVBvaW50Q2xhc3MgfCBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0cmFFbnRyeVBvaW50Q2xhc3Mge1xuICAgIC8qKlxuICAgICAqIFRoZSBidW5kbGUgbmFtZSBmb3IgdGhpcyBleHRyYSBlbnRyeSBwb2ludC5cbiAgICAgKi9cbiAgICBidW5kbGVOYW1lPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBmaWxlIHRvIGluY2x1ZGUuXG4gICAgICovXG4gICAgaW5wdXQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgYnVuZGxlIHdpbGwgYmUgbGF6eSBsb2FkZWQuXG4gICAgICovXG4gICAgbGF6eT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogT3V0cHV0IHNvdXJjZW1hcHMuXG4gKi9cbmV4cG9ydCB0eXBlIFNvdXJjZU1hcFVuaW9uID0gYm9vbGVhbiB8IFNvdXJjZU1hcENsYXNzO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZU1hcENsYXNzIHtcbiAgICAvKipcbiAgICAgKiBPdXRwdXQgc291cmNlbWFwcyB1c2VkIGZvciBlcnJvciByZXBvcnRpbmcgdG9vbHMuXG4gICAgICovXG4gICAgaGlkZGVuPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBPdXRwdXQgc291cmNlbWFwcyBmb3IgYWxsIHNjcmlwdHMuXG4gICAgICovXG4gICAgc2NyaXB0cz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogT3V0cHV0IHNvdXJjZW1hcHMgZm9yIGFsbCBzdHlsZXMuXG4gICAgICovXG4gICAgc3R5bGVzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIHZlbmRvciBwYWNrYWdlcyBzb3VyY2VtYXBzLlxuICAgICAqL1xuICAgIHZlbmRvcj86IGJvb2xlYW47XG59XG5cbi8qKlxuICogT3B0aW9ucyB0byBwYXNzIHRvIHN0eWxlIHByZXByb2Nlc3NvcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBQYXRocyB0byBpbmNsdWRlLiBQYXRocyB3aWxsIGJlIHJlc29sdmVkIHRvIHByb2plY3Qgcm9vdC5cbiAgICAgKi9cbiAgICBpbmNsdWRlUGF0aHM/OiBzdHJpbmdbXTtcbn1cbiJdfQ==