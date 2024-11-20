export type PostTypeWithoutId = Omit<PostEntity,"id">

export class PostEntity {
    readonly id: number
    title: string
    content: string
    authorId: number

    static countPosts:number = 0

constructor(data: PostTypeWithoutId){
    this.id= ++PostEntity.countPosts;
    Object.assign(this, data)
}
}