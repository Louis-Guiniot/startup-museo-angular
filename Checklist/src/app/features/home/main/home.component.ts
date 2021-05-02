import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  usernameLogged: string
  
  
  loggato(){
    //se getItem username non c'é non mostro logout se no si
    this.usernameLogged=sessionStorage.getItem("username");
    if(this.usernameLogged!=null) return true;
    else return false;
  }

  logout(){
    sessionStorage.removeItem("username")
    this.router.navigateByUrl("/login/user")
  }

}
