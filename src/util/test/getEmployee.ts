import { employee } from "@prisma/client";

interface GetEmployeeArgs {
  id: number;
}

export const getEmployee = ({ id }: GetEmployeeArgs): employee => ({
  id,
  name: 'Bob Dole',
  email: 'bob.dole@cleaning.com',
  phone_number: '1234567890',
  created_at: new Date(),
})