import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  duration: number;
  @ValidateIf((validation) => validation.artistId !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  artistId: string | null;
  @ValidateIf((validation) => validation.albumId !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  albumId: string | null;
}
