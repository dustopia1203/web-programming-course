'use strict';

class DatePicker {
	constructor(id, callback) {
		this.id = id;
		this.callback = callback;
		this.isSettedDate = false;
	}

	render(date) {
		if (!this.isSettedDate) {
			this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			this.isSettedDate = true;
		}
		console.log(this.date);
		//#create calendar
		const calendar = document.getElementById(this.id);
		//#add main content to calendar
		calendar.appendChild(this.createCalendar(date));
	}

	// eslint-disable-next-line class-methods-use-this
	createCalendar(date) {
		//# main content
		const table = document.createElement("table");
		//## calendar header with arrows
		const th1 = table.insertRow();
		th1.id = "cal-header";
		//### left arrow
		const leftArrowCell = th1.insertCell();
		leftArrowCell.id = "left-arrow";
		leftArrowCell.className = "arrow";
		leftArrowCell.textContent = "<";
		leftArrowCell.addEventListener("click", () => {
			date.setMonth(date.getMonth() - 1);
			table.remove();
			this.render(date);
		});
		//### display current month and year
		const displayDay = th1.insertCell();
		displayDay.id = "display-day";
		displayDay.colSpan = "5";
		displayDay.textContent = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
		//### right arrow	
		const rightArrowCell = th1.insertCell();
		rightArrowCell.id = "right-arrow";
		rightArrowCell.className = "arrow";
		rightArrowCell.textContent = ">";
		rightArrowCell.addEventListener("click", () => {
			date.setMonth(date.getMonth() + 1);
			table.remove();
			this.render(date);
		});
		//## week days row
		const th2 = table.insertRow();
		th2.id = "weekday-row";
		const weeksDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		for (const i of weeksDay) {
			const tr = th2.insertCell();
			tr.textContent = i;
		}
		//## set day on month
		const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const movDay = new Date(startDay.getTime());
		movDay.setDate(-startDay.getDay() + 1);
		console.log(movDay);
		const curMonth = startDay.getMonth();
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const tr = table.insertRow();
			for (let i = 0; i < 7; i++) {
				const cell = tr.insertCell();
				cell.textContent = movDay.getDate();
				if (movDay.getDay() === i) {
					if (movDay.getMonth() === curMonth) {
						cell.className = "cur-month month-cell";
						const obj = {
							month: (movDay.getMonth() + 1).toString().padStart(2, '0'),
							day: (cell.textContent).padStart(2, '0'),
							year: movDay.getFullYear()
						};
						cell.addEventListener("click", () => this.callback(this.id, obj));
						if (movDay.getDate() === this.date.getDate() && curMonth === this.date.getMonth()) cell.id = "cur-day";
					} else {
						cell.className = "other-month month-cell";
					}
					movDay.setDate(movDay.getDate() + 1);
				} else {
					cell.className = "other-month month-cell";
				}
			}
			if (movDay.getMonth() !== curMonth) break;
		}
		return table;
	}
}
