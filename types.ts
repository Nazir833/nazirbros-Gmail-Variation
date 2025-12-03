export interface GeneratedEmail {
  id: string;
  email: string;
  copyCount: number;
}

export interface GeneratorOptions {
  baseEmail: string;
  quantity: number;
  useRandomCase: boolean;
  useNumbers: boolean;
  usePlusSign: boolean; // Option to use '+' alias standard for Gmail
}
