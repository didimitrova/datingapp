import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = 'Dating App';
  //protected members: any;
  protected members = signal<any>([]);

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  // ngOnInit(): void {
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     next: (response) => {
  //       this.members.set(response);
  //       //this.members = response;
  //       //this.cdr.detectChanges();
  //     },
  //     error: (error) => console.log(error),
  //     complete: () => console.log('Http Request completed')
  //   });
  // }

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'))
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
