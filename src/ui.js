export class UI {
    constructor() {
        this.form = document.getElementById("employee-form");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.employeeList = document.getElementById("employees");
        this.updateEmployeeButton = document.getElementById("update");
        this.addEmployeeButton = document.getElementById("add");
    }

    addAllEmployees(employees) {
        let result = "";

        employees.forEach(employee => {
            result += `
                <tr>                          
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td class="text-right"><a href="#" id="update-employee" class="btn btn-warning text-white">Update</a></td> 
                    <td><a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
                </tr>
            `;
        });

        this.employeeList.innerHTML = result;
    }

    clearInputs() {
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }

    showAlert(type, message) {
        // <div class="alert alert-dark" role="alert">
        //     This is a dark alert—check it out!
        // </div>
        const alert = document.createElement("div");
        alert.className = `alert alert-${type} d-inline ml-5`;
        alert.textContent = message;

        this.form.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    addEmployee(employee) {
        this.employeeList.innerHTML += `
            <tr>                          
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td class="text-right"><a href="#" id="update-employee" class="btn btn-warning text-white">Update</a></td> 
                <td><a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
            </tr>
        `;
    }

    deleteEmployee(element) {
        element.remove();
    }

    toggleUpdateButton(target) {
        if (this.updateEmployeeButton.classList.contains("d-none")) {
            this.updateEmployeeButton.classList.remove("d-none");
            this.updateEmployeeButton.classList.add("d-block");

            this.addEmployeeButton.classList.add("d-none");
            this.addEmployeeButton.classList.remove("d-inline-block");

            this.addEmployeeInfosToInputs(target);
        } else {
            this.updateEmployeeButton.classList.add("d-none");
            this.updateEmployeeButton.classList.remove("d-block");
            
            this.addEmployeeButton.classList.remove("d-none");
            this.addEmployeeButton.classList.add("d-inline-block");

            this.clearInputs();
        }
    }

    addEmployeeInfosToInputs(target) {
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    updateEmployee(employee, parent) {
        parent.innerHTML = `
            <tr>                          
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td class="text-right"><a href="#" id="update-employee" class="btn btn-warning text-white">Update</a></td> 
                <td><a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
            </tr>
        `;
    }
}