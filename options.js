const defaultSalary = "200000";
const defaultMonthHours = "220";
const defaultDayHours = "8";

function isNumber(obj) { 
    return !isNaN(parseFloat(obj)) 
}

function loadOptions() {
	var Salary = localStorage["Salary"];
    var MountHours = localStorage["hour_work_month"];
    var MountHours = localStorage["hour_work_day"];
	if (Salary == undefined || (!isNumber(Salary))) {
		Salary = defaultSalary;
	}
    if (MountHours == undefined || (!isNumber(MountHours))) {
		MountHours = defaultMonthHours;
	}
    document.getElementsByTagName("input")[0].value = Salary;
    document.getElementsByTagName("input")[1].value = MountHours;
}
function saveOptions() {
    var salary = document.getElementsByTagName("input")[0].value;
    console.log(salary);
    localStorage["Salary"] = salary;
    var mountHours = document.getElementsByTagName("input")[1].value;
    console.log(mountHours);
    localStorage["MonthHours"] = mountHours;
}
function eraseOptions() {
	localStorage.removeItem("Salary");
    localStorage.removeItem("MonthTime");
	location.reload();
}
