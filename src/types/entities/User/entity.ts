export type UserEntity = {
  id: number;
  email: string;
  firstName: string | null;
  secondName: string | null;
  birthDate: string | null;
  phoneNumber: string | null;
  residence: string;
  block: string;
  flat: string;
  roleId: number;
};
