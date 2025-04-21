import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private apiUrl = '/api/email'; // Proxied to https://example.com/api/email to avoid CORS issues

  constructor(private http: HttpClient) {}

  // Mock email sending API call
  sendEmail(to: string, subject: string, body: string): Observable<any> { // Observable<any>, allowing asychronous handling of the HTTP response

    // Create headers with Content-Type and Authorization
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set Content-Type to application/json
      'Authorization': 'Set you Auth token here....' // Add Authorization if token exists
    });
    
    return this.http.post(this.apiUrl, {
      to,
      from: 'no-reply@company.com',
      subject,
      body
    },
    {
      headers
    });
  }
}
