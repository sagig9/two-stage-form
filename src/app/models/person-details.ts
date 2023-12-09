export class PersonDetails {
  firstName!: string;
  lastName!: string;
  email!: string;
  age!: number;
  companyName!: string;
  numberOfEmployees: number | null = null; 
  domain: string[] = [];
}
