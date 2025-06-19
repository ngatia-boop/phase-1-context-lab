// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Create multiple employee records
function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

// Add time-in event
function createTimeInEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

// Add time-out event
function createTimeOutEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

// Calculate hours worked on a date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculate total wages for all dates
const allWagesFor = function () {
  const datesWorked = this.timeInEvents.map(event => event.date);
  return datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate.call(this, date);
  }, 0);
};

// Find employee by first name
function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find(record => record.firstName === firstNameString);
}

// Calculate payroll for multiple employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor.call(employee);
  }, 0);
}


