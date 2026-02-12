export interface User {
  email: string;
  password: string | null;
  telephonumber_verified_at: string | null;
  id: string;
  onboarding: boolean;
  leftCalls: number;
  subscriptionPlan: string;
  telephonenumber: string;
  name: string;
  timezone: string;
  gender: string;
  medicationLimit: number;
}
