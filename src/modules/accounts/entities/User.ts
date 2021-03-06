import { v4 as uuidv4 } from 'uuid';
import {  Column, PrimaryColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column({nullable: true})
    avatar: string;

    @CreateDateColumn()
    created_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

}

export { User }