import {Entity, Column, ChildEntity} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';

//@ChildEntity(UserRole.MANAGER)
@Entity()
export class Manager extends User {
    @Column({ default: false })
    isCertified: boolean;

    @Column({ nullable: true })
    assistPhoneNumber: number;

    @Column()
    hiredAt: number;

    @Column()
    lastReviewDate: number;

    constructor(id: number, name: string, email: string, password: string, assistPhoneNumber: number, hiredAt: number, lastReviewDate: number, isCertified?: boolean) {
        super(id, name, email, password, UserRole.MANAGER);
        this.isCertified = isCertified || false;
        this.assistPhoneNumber = assistPhoneNumber;
        this.hiredAt = hiredAt;
        this.lastReviewDate = lastReviewDate;
    }

    auth(): void {
        //
    }

    logout(): void {
        //
    }

    acceptWithdraw(withdrawId: number): void {
        //
    }
}
