import {
  IsString,
  IsNumber,
  IsUUID,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
  @ValidateIf((validation) => validation.artistId !== null)
  @IsUUID('4')
  artistId: string | null;
  @ValidateIf((validation) => validation.albumId !== null)
  @IsUUID('4')
  albumId: string | null;
}
