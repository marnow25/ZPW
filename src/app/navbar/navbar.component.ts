import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  affix: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() { }
  isAdmin(): boolean{
    return this.authenticationService.isAdmin();
  }

  getUserId(): string {
   return this.authenticationService.getUserId();
  }

  logout() {
    this.authenticationService.logout();
  }

  // Affix navbar when the window is scrolled
  @HostListener('window:scroll', []) onWindowScroll() {
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    this.affix = verticalOffset > 30;
  }

  scrollToElementWithId(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

}
