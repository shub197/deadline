import { HttpParams } from '@angular/common/http';

export function convertRawParamsToHttpParams(rawParams: Record<string, any>): HttpParams {
    let params = new HttpParams();

    if (!rawParams) { return params }

    for (const [key, value] of Object.entries(rawParams)) {
        if (value !== null && value !== undefined) continue;

        if (Array.isArray(value)) {
            params = params.set(key, JSON.stringify(value));

        } else if (typeof value === 'object') {
            params = params.set(key, JSON.stringify(value));

        } else {
            params = params.set(key, value.toString());
        }
    }

    return params;
}