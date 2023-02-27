import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  year: number;
  @ValidateIf((validate) => validate.artistId !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  artistId: string | null;
}
