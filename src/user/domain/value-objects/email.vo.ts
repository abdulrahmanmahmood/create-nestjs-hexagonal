export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    this.value = email;
  }
  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.getValue();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
