import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';

import { User } from '../../../../models/user';
import { UserLog } from '../../../../models/user-log';

import { UserService } from '../../../../core/services/user.service';
import { UserLogService } from '../../../../core/services/user-log.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {

  users: User[] = [];
  logs: UserLog[] = [];

  loadingUsers = false;
  loadingLogs = false;

  usersError = '';
  logsError = '';

  constructor(
    private userService: UserService,
    private userLogService: UserLogService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadLogs();
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.usersError = '';

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loadingUsers = false;
        this.cdr.detectChanges();
      },
      

      error: (error) => {
        console.error(
          'Error loading users:',
          error
        );

        this.usersError =
          error.error?.message ??
          'Failed to load users';

        this.loadingUsers = false;
      }
      
    });
  }

  loadLogs(): void {
    this.loadingLogs = true;
    this.logsError = '';

    this.userLogService.getLogs().subscribe({
      next: (logs) => {
        this.logs = [...logs]
          .sort((first, second) => {
            const firstTime = new Date(
              first.timestamp ??
              first.createdAt ??
              0
            ).getTime();

            const secondTime = new Date(
              second.timestamp ??
              second.createdAt ??
              0
            ).getTime();

            return secondTime - firstTime;
          })
          .slice(0, 6);

        this.loadingLogs = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Error loading logs:',
          error
        );

        this.logsError =
          error.error?.message ??
          'Failed to load user logs';

        this.loadingLogs = false;
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/users/add']);
  }

  editUser(id: string): void {
    this.router.navigate([
      '/users/edit',
      id
    ]);
  }

  deleteUser(id: string): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.loadLogs();
      },

      error: (error) => {
        console.error(
          'Error deleting user:',
          error
        );

        alert(
          error.error?.message ??
          'Failed to delete user'
        );
      }
    });
  }

  getLogUserName(log: UserLog): string {
    if (log.user?.name) {
      return log.user.name;
    }

    if (
      typeof log.userId === 'object' &&
      log.userId?.name
    ) {
      return log.userId.name;
    }

    return (
      log.userName ??
      log.username ??
      'Unknown user'
    );
  }

  getLogUserId(log: UserLog): string {
    if (log.user?._id) {
      return log.user._id;
    }

    if (typeof log.userId === 'string') {
      return log.userId;
    }

    if (
      typeof log.userId === 'object' &&
      log.userId?._id
    ) {
      return log.userId._id;
    }

    return '-';
  }

  getLogTimestamp(
    log: UserLog
  ): string | null {

    return (
      log.timestamp ??
      log.createdAt ??
      null
    );
  }
}