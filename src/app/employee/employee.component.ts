import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  employee: any[] = [];
  newEmployee: any = {id: '', name: '', faculty: '' };
  employeeId!: number;
  name!: string;
  faculty!: string;


  @ViewChild('newEmployee') newEmployeeForm!: NgForm

  constructor(private employeeService: EmployeeServiceService){}

  ngOnInit(): void {
      this.retriveAllEmployee();
  }

  retriveAllEmployee(): void {
    this.employeeService.getAll().subscribe(
      (data: any[]) => { 
        this.employee = data.map(emp => ({ ...emp, editMode: false })); // Set editMode to false for each employee
        console.log(data);
      }
    );
  }
  

  addEmployee(newEmployeeData: any): void {
    this.employeeService.createEmployee(newEmployeeData).subscribe(
      response => {
        this.retriveAllEmployee(); // Refresh the employee list 
        console.log('New employee added:', response);
      },
      error => {
        console.error('Error adding new employee:', error);
      }
    );
  }

  updateEmployee(emp: any): void {
    const updateData = {
      name: this.name,
      faculty: this.faculty
    };
    // Make sure employeeId is set before calling updateEmployee
  
      this.employeeService.updateEmployee(emp.id, emp).subscribe(
        (response: any) => {
          console.log('Employee updated successfully:', response);
          // Optionally, you can retrieve all employees again to refresh the list
          this.retriveAllEmployee();
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );


  }

  toggleEditMode(employee: any): void {
    employee.editMode = !employee.editMode; // Toggle edit mode
  }

  saveEmployee(employee: any): void {
    const updatedData = {
      name: employee.name,
      faculty: employee.faculty
    };

    // Call the updateEmployee method from your service
    this.employeeService.updateEmployee(employee.id, updatedData).subscribe(
      (response: any) => {
        console.log('Employee updated successfully:', response);
        employee.editMode = false; // Disable edit mode after saving
        this.retriveAllEmployee(); // Refresh employee list
      },
      error => {
        console.error('Error updating employee:', error);
      }
    );
  }

  deleteEmployee(emp: any):void {
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(emp.id).subscribe(
        () => {
          this.retriveAllEmployee(); //Refresh list
          console.log('Employee deleting successfully');
        },
        error => {
          console.error('Error deleting employee', error)
        }
      );
    }
  }
}
