import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, TableInheritance} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

/**
 * User entity represents a user of the application.
 */
// No Class Table Inheritance =(
// Single Table Inheritance
//@Entity()
//@TableInheritance({ column: { type: "varchar", name: "type" } })
// Concrete Table Inheritance
export abstract class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: false })
    is2FAEnabled: boolean;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    @Column()
    lastSeenAt: number;

    constructor(id: number, name: string, email: string, password: string, role: UserRole) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.is2FAEnabled = false;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.lastSeenAt = Date.now();
    }

    abstract auth(): void;
    abstract logout(): void;

    enable2FA(): void {
        this.is2FAEnabled = true;
    }

    disable2FA(): void {
        this.is2FAEnabled = false;
    }
}
