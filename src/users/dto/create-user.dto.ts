import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  ValidationArguments,
} from 'class-validator';

const message = (args: ValidationArguments): string => {
  const qMessage: Array<any> = [];
  if (!args.value.match(/(?=.*?[A-Z])/)) {
    qMessage.push('upper case letter');
  }
  if (!args.value.match(/(?=.*?[a-z])/)) {
    qMessage.push('lower case letter');
  }
  if (!args.value.match(/(?=.*?[0-9])/)) {
    qMessage.push('digit');
  }
  if (!args.value.match(/(?=.*?[#?!@$%^&*-])/)) {
    qMessage.push('special character');
  }
  return `Passwort must contain(s) one or more ${qMessage.join(', ')}`;
};

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'), {
    message,
  })
  password: string;
}
