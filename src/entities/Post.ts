import { Column, Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { v4 as uuid } from "uuid"

@Entity("post")
class Post {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    category_id: string;
    
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;


    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Post }