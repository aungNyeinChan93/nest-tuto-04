export class CreatePostDto {
  id?: number;
  title: string;
  body: string;
  author_name: string;
  created_at: Date;
  updated_at?: Date;
}
