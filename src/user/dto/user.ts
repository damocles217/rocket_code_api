export class UserDto {
  name: string;

  secondName?: string;

  lastname: string;

  sencondLastname?: string;

  bornDate: string;

  email: string;

  phone: string;
}

export class UserResponseDto extends UserDto {
  id: number;
  success: boolean;
}
