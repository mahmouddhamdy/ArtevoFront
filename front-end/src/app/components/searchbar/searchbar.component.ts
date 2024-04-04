import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [FreelancerService, HttpClient],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchResults: any[] = [];
  name: any;
  query: string = '';
  filteredFreelancers: any[] = [];
  showDropdownFlag: boolean = false;

  constructor(
    private http: HttpClient,
    private freelancerService: FreelancerService
  ) {}
  ngOnInit() {
    this.freelancerService.getAllFreelancers().subscribe(
      (res: any) => {
        this.filteredFreelancers = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving freelancers:', error);
      }
    );
  }
  // toString(): string {
  //   return this.fullName;
  // }
  displayFn(freelancer: any): string {
    return freelancer && freelancer.fullName
      ? freelancer.fullName.toString()
      : '';
  }

  searchByFreelancer(query: string) {
    if (query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.freelancerService.searchFreelancers(query).subscribe(
      (res: any) => {
        console.log('Search Results:', res.data);
        this.searchResults = res.data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching for freelancers:', error);
      }
    );
  }

  showDropdown() {
    this.showDropdownFlag = true;
  }

  hideDropdown() {
    this.showDropdownFlag = false;
  }
}