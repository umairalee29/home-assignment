import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit {
  employee: Employee | null = null;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private employeeService: EmployeeService, private emailService: EmailService) {}

  ngOnInit(): void {
    // Component subscribe to the selectedEmployee$ to get the currently selected employee
    this.employeeService.selectedEmployee$.subscribe((employee) => {
      this.employee = employee;
    });
  }

  flagEmployee(flag: boolean) {
    // Checking if employee is selected
    if(this.employee != null) {

      // If flagging (flag = true) and email is a valid string, send an email
      if(flag === true){
        // Call EmailService to send an email notification
        this.emailService.sendEmail(
          this.employee?.email,
          'Flag Status',
          'You have been flagged!'
        ).subscribe({
          next: () => {
            this.showAlert = true;
            this.alertMessage = 'Email sent successfully to ' + this.employee?.email;
            this.alertType = 'success';
            this.setEmployeeFlag(true);
            // Hide alert after 3 seconds
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          },
          error: (error) => {
            this.showAlert = true;
            this.alertMessage = 'Failed to send email to: ' + this.employee?.email;
            this.alertType = 'error';
            this.setEmployeeFlag(true)
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          }
        });
      }
      // Update the employee's flag status directly (for unflag or if no email is sent)
      this.employee.isFlag = flag;
    }
  }

  setEmployeeFlag(flag: boolean) {
    if(this.employee != null) {
      this.employee.isFlag = flag;
    }
  }
}
