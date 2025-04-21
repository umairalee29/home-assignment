import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  employees$!: Observable<Employee[]>; // ! indicates, it will be intialized in ngOnInit
  selectedEmployee: Employee | null = null; // Stores the currently selected employee or null if not selected
  loading = true; // Track loading state for accessibility
  error: string | null = null;

  // DI for Employee Service
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // Fetch employees on component initialization
    this.employees$ = this.employeeService.getEmployees();

    // Subscribe to employee$ to manage loading state
    this.employees$.subscribe({
      next: () => this.loading = false, // Update loading state
      error: (err) => {
        this.loading = false // Handle errors gracefully
        this.error = 'Failed to load employees :('
      }
    });

    // Subscribe to selectedEmployee$ from employeeService to update the selectedEmployee
    this.employeeService.selectedEmployee$.subscribe((employee) => {
      this.selectedEmployee = employee; // stores the currently selected employee, updated via the service's observable
    });
  }

  // Updates the selected employee in the service when an employee is clicked
  onSelectEmployee(employee: Employee): void {
    this.employeeService.selectEmployee(employee);
  }
}
