function createEmployeeRecord(employeeArray) {
    let [firstName, familyName, title, payPerHour] = employeeArray;
  
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let payRate = employeeRecord.payPerHour;
    let wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  
    return totalPayroll;
  }
  
