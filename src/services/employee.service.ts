import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://randomuser.me/api/?results=50';

  constructor(private http: HttpClient) {}

  // BehaviourSubject holds the currently selected employee and emits it to the subscribers
  private selectedEmployee = new BehaviorSubject<Employee | null>(null);

  // Providing an observable (selectedEmployee$) for components to subscribe to
  // $ suffix is a convention indicating that the variable is an Observable
  selectedEmployee$ = this.selectedEmployee.asObservable();

  // Fetch the employees from the randomUser api and transforming to the model
  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.map((employee: any) => ({
        id: employee.login.uuid,
        name: `${employee.name.first} ${employee.name.last}`,
        avatar: employee.picture.thumbnail,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        address: `${employee.location.city}, ${employee.location.country}`,
        isFlag: employee.isFlag ?? false // Default state
      })))
    );
  }

  // Updates the selected employee
  selectEmployee(employee: Employee): void {
    this.selectedEmployee.next(employee); // next() -> Dynamically update the value by the BehaviourSubject
  }

}
