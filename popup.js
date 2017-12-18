
function saveChanges() {
  const formSalary = document.getElementById('salary');
  const formDay = document.getElementById('hour_work_day');
  const formMonth = document.getElementById('hour_work_month');

  const salary = formSalary.value;
  const hour_day = formDay.value;
  const hour_month = formMonth.value;
  if (!salary || !hour_day || !hour_month) {
    message('Error: No value specified');
    return;
  }

  chrome.storage.sync.set({
    'salary': salary,
    'hour_day' : hour_day,
    'hour_month' : hour_month
  }, function() {
    message('Settings saved');
  });
}

document.getElementById("set").onclick = function() {
  saveChanges();
  window.close();
}
