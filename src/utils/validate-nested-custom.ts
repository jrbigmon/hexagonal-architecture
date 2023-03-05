import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  validateOrReject,
} from 'class-validator';

export interface ErrorMessage {
  message: string;
  field: string;
}

let messageError: ErrorMessage;

export function ValidateNestedCustom(property: any) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateNestedCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [new property()],
      validator: {
        async validate(value: object) {
          const dto = new property();

          const validated = Object.assign(dto, value);

          await validateOrReject(validated).catch((errors) => {
            messageError = {
              message:
                errors[0].constraints[Object.keys(errors[0].constraints)[0]],
              field: errors[0].property,
            };
          });

          return false;
        },
        defaultMessage(args: ValidationArguments) {
          console.log(args);
          return '';
        },
      },
    });
  };
}
