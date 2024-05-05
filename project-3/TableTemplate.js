'use strict';

class TableTemplate {
    static fillIn(id, dict, columnName) {
        const tbl = document.getElementById(id);
        tbl.style.visibility = "visible";
        const rows = tbl.rows;
        const tbh = rows.item(0);
        const proc1 = new TemplateProcessor(tbh.innerHTML);
        tbh.innerHTML = proc1.fillIn(dict);

        if (columnName) {
            let idx;
            for (let i = 0; i < tbh.cells.length; i++) {
                if (tbh.cells[i].innerHTML === columnName) {
                    idx = i;
                    break;
                }
            }
            for (let i = 1; i < tbl.rows.length; i++) {
                const row = rows[i];
                const cell = row.cells[idx];
                const proc2 = new TemplateProcessor(cell.innerHTML);
                cell.innerHTML = proc2.fillIn(dict);
            }
        } else {
            for (let i = 1; i < tbl.rows.length; i++) {
                const row = rows[i];
                for (let j = 0; j < tbh.cells.length; j++) {
                    const cell = row.cells[j];
                    const proc2 = new TemplateProcessor(cell.innerHTML);
                    cell.innerHTML = proc2.fillIn(dict);
                }
            }
        }
    }
}