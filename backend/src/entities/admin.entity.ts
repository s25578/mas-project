import {Entity, Column, ChildEntity} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';
import {Notification} from "../enums/notification.enum";

//@ChildEntity(UserRole.ADMIN)
@Entity()
export class Admin extends User {
    @Column("simple-array")
    notificationPreferences: string[];

    constructor(id: number, name: string, email: string, password: string, notificationPreferences?: Notification[]) {
        super(id, name, email, password, UserRole.ADMIN);
        this.notificationPreferences = notificationPreferences || [];
    }

    auth(): void {
        // regular auth
    }

    logout(): void {
        // regular logout
    }

    updateSettings(settings: any[]): void {
        //
    }

    updateUser(userId: number, updates: any[]): void {
        //
    }
}
