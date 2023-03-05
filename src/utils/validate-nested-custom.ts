import { registerDecorator, validateOrReject } from 'class-validator';

let messageError: string;

export function ValidateNestedCustom(property: any) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateNestedCustom',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        async validate(value: object) {
          const dto = new property();

          const validated = Object.assign(dto, { ...value });

          await validateOrReject(validated).catch((errors) => {
            messageError =
              errors[0].constraints[Object.keys(errors[0].constraints)[0]];
            return false;
          });

          if (messageError) return false;
          return true;
        },

        defaultMessage() {
          return messageError;
        },
      },
    });
  };
}
