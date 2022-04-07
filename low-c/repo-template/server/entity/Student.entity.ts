

import { Entity, Column, PrimaryColumn } from 'typeorm';
    


@Entity("Student")
export default class Student {
    
@Column()
usernick: string
= "";

                    
@Column()
pwd: string
= "";

                    
@PrimaryColumn()
userID: string
= "";


};            
            