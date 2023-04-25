import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({description: 'The title of a post.'})
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({description: 'The content of a post.'})
    @IsString()
    @IsNotEmpty()
    content: string

    @ApiProperty({description: 'The relevant topic of a post.'})
    @IsString()
    @IsNotEmpty()
    topic: string
}
