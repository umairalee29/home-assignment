import { Employee } from './employee.model';

describe('Employee Interface', () => {
  // Sample valid Employee object
  const validEmployee: Employee = {
    id: 1,
    name: '',
    avatar: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    isFlag: true
  };
  
  it('should create an instance', () => {
    expect(validEmployee).toBeTruthy();
  });
});
