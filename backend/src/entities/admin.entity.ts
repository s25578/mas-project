import {Entity, Column, ChildEntity} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';
import {Notification} from "../enums/notification.enum";

//@ChildEntity(UserRole.ADMIN)
@Entity()
export class Admin extends User {
    @Column("simple-array")
    notificationPreferences: string[];

    /**
     * Create a new admin
     * @param id number - ID of the admin
     * @param name string - Name of the admin
     * @param email string - Email of the admin
     * @param password string - Password of the admin
     * @param notificationPreferences Notification[] - Notification preferences of the admin
     * @constructor
    */
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
