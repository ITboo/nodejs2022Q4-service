import { validate, version } from 'uuid';

export const valid = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};
