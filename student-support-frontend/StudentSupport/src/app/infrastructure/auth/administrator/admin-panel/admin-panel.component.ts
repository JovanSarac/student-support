import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  constructor(
    private service: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getAllUsers().subscribe({
      next: (result: User[]) => {
        this.users = result;
      },
    });
  }

  activateUser(userId: number) {
    this.service.activateUser(userId).subscribe({
      next: (result: User) => {
        this.loadUsers();
        this.toastrService.success(
          'Uspešno ste aktivirali korisnika.',
          'Uspešno',
          {
            timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }

  deactivateUser(userId: number) {
    this.service.deactivateUser(userId).subscribe({
      next: (result: User) => {
        this.loadUsers();
        this.toastrService.success(
          'Uspešno ste deaktivirali korisnika.',
          'Uspešno',
          {
            timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }
}
