export class UserDto {
  id: number;

  name: string;

  secondName?: string;

  lastname: string;

  sencondLastname?: string;

  bornDate: string;

  email: string;

  phone: string;
}

export class UserResponseDto extends UserDto {
  success: boolean;
}
