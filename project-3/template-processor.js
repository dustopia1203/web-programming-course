'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }

    fillIn(dict) {
        let ans = this.template;
        // eslint-disable-next-line guard-for-in
        for (const i in dict) {
            const re = new RegExp("\\{\\{" + i + "\\}\\}");
            ans = ans.replace(re, dict[i]);
        }
        return ans.replace(/\{\{\w+\}\}/g, "");
    }
}