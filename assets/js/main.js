const addNewEmployeeForm = document.getElementById("add-new-employee-form");
const addNewEmployeeSubmitbtn = document.getElementById("add-new-employee-submit-btn");
const addNewEmployeebtn = document.getElementById("add-new-employee-btn");
const employeeSectionAnchor = document.getElementById("employee-section-anchor");
const performanceSectionAnchor = document.getElementById("performance-section-anchor");
const rightArrowEmployee = document.getElementById("right-arrow-admin-employee");
const rightArrowPerformance = document.getElementById("right-arrow-admin-performance");
const adminViewEmployees = document.getElementById("adminview-employee-section");
const adminViewPerformance = document.getElementById("adminview-performance-section");

rightArrowPerformance.style.display="none";
adminViewPerformance.style.display="none";
performanceSectionAnchor.onclick = () => {
    rightArrowEmployee.style.display="none";
    rightArrowPerformance.style.display = "inline-block";
    adminViewPerformance.style.display="block";
    adminViewEmployees.style.display="none";

}
employeeSectionAnchor.onclick = () => {
    rightArrowPerformance.style.display="none";
    rightArrowEmployee.style.display = "inline-block";
    adminViewPerformance.style.display="none";
    adminViewEmployees.style.display="block";

}
console.log("update-employee-"+ "<%:user.id%>");

addNewEmployeeForm.style.display = "none";
//showing the add new employee form
addNewEmployeebtn.onclick = function(){
    addNewEmployeeForm.style.display = "block";
}

//hiding the add new employee form
addNewEmployeeSubmitbtn.onclick = function(){
    addNewEmployeeForm.style.display = "none";
}