import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } 
   from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: string;
  user: User;
  updated = false;

  constructor(private route: ActivatedRoute,
     private router: Router,
      private userService: UserService) { }

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
      }, error => console.log(error));
  }

  updateUser() {
    this.userService.updateUser(this.id, this.user)
      .subscribe(data => {
        console.log(data);
        this.user = new User();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateUser(); 
    this.updated = true;   
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}