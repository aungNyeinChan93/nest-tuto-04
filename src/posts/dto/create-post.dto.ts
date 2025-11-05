/* eslint-disable prettier/prettier */
export class CreatePostDto {
    id?: number;
    title: string;
    body: string;
    created_at: Date;
    updated_at?: Date;
}
