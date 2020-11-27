import { MessageService } from './../helpers/message.service';
import { catchError, map, tap, last } from 'rxjs/operators';
import {
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleError } from './http-logging-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  constructor(
    public http: HttpClient,
    private messageService: MessageService
  ) {}

  upload(file: any) {
    const req = new HttpRequest('POST', '/upload/file', file, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map((event) => this.getEventMessage(event, file)),
      tap((message) => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(handleError(this.log, 'uploadFile'))
    );
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round((100 * event.loaded) / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private showProgress(message) {
    this.log(message);
  }

  private log(message: string) {
    this.messageService.add(`Location Service: ${message}`);
  }
}
