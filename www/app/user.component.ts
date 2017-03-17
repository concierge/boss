import { Component }      from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';

@Component({
    moduleId: module.id,
    selector: 'user-management',
    templateUrl: './user.component.html'
})
export class UserConfigComponent extends ApiServiceUser {
    private username: string;
    private password: string;
    private password2: string;
    private usersList: string[] = [];

    constructor(private api: ApiService) {
        super(api);
        this.getAll('user_list', this.onUsersList.bind(this));
    }

    onUsersList(data: string[]): void {
        this.usersList = data;
    }

    isNotEmptyUsername(): boolean {
        return !!this.username && this.username.trim() !== '';
    }

    userDoesntExist(): boolean {
        return !this.usersList.includes(this.username);
    }

    isNewUser(): boolean {
        return this.isNotEmptyUsername() && this.userDoesntExist();
    }

    isExistingUser(): boolean {
        return this.isNotEmptyUsername() && !this.userDoesntExist();
    }

    passwordsDontMatch(): boolean {
        return this.password != this.password2;
    }

    usernameIsEmpty(): boolean {
        return !(this.username && this.username.trim() !== '');
    }

    userFieldText(): string {
        if (!(this.isExistingUser() || this.isNewUser()))
            return 'Username/New User';
        if (this.isExistingUser())
            return 'Username';
        return 'New User';
    }

    saveButtonText(): string {
        return this.isNewUser() ? 'Add User' : 'Update Password';
    }

    save(): void {
        this.emit('user_update', {
            username: this.username,
            password: this.password
        });
        this.clear();
    }

    delete(): void {
        this.emit('user_delete', this.username);
        this.clear();
    }

    clear(): void {
        this.username = '';
        this.password = '';
        this.password2 = '';
    }
}
