

import { Entity, Column, PrimaryColumn } from 'typeorm';
    


@Entity("User")
export default class User {
    
@PrimaryColumn()
userID: string
= "";


@Column()
pwd: string
= "";

                    
@Column()
usernick: string
= "";

                    
};            
            