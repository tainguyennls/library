import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    constructor(private apiService: ApiService) { }

    upload(file: File, saveBookTitle): any {
        const formData = new FormData();
        const xhr = new XMLHttpRequest();
        formData.append('photo', file, file.name);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    saveBookTitle(xhr.responseText);
                } else {
                    console.log(xhr.responseText);
                }
            }
        };
        xhr.open('POST', `${this.apiService.apiUrl.upload}`, true);
        xhr.send(formData);
    }
}
