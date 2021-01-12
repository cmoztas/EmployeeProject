import { Request } from "./requests";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const req = new Request("http://localhost:3000/employees")
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeeList.addEventListener("click", updateOrDelete);
    updateEmployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() {
    req.get()
    .then(employees => {
        ui.addAllEmployees(employees);
    })
    .catch(err => console.log(err));
}

function addEmployee(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const department = departmentInput.value.trim();
    const salary = salaryInput.value.trim();

    if (name === "" || department === "" || salary == "") {
        ui.showAlert("danger", "Please fill out the entire form.");
    } else {
        req.post({
            name: name,
            department: department,
            salary: Number(salary)
        })
        .then(employee => ui.addEmployee(employee))
        .catch(err => console.log(err));
    }

    ui.clearInputs();
}

function updateOrDelete(e) {
    if (e.target.id === "delete-employee") {
        deleteEmployee(e.target);
    } else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    req.delete(id)
    .then(data => ui.deleteEmployee(targetEmployee.parentElement.parentElement))
    .catch(err => console.log(err));
}

function updateEmployeeController(targetEmployee) { // tr element geldi
    ui.toggleUpdateButton(targetEmployee);

    if (updateState === null) {
        updateState = {
            updateId: targetEmployee.children[3].textContent,
            updateParent: targetEmployee
        };
    } else {
        updateState = null;
    }
}

function updateEmployee(e) {
    if (updateState !== null) {
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())
        }

        req.put(updateState.updateId, data)
        .then(updatedEmployee => {
            ui.updateEmployee(updatedEmployee, updateState.updateParent);
            ui.toggleUpdateButton();
            updateState = null;
        })
        .catch(err => console.log(err));
    }
}