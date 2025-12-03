import { GeneratedEmail, GeneratorOptions } from '../types';

const generateRandomCase = (text: string): string => {
  return text
    .split('')
    .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
    .join('');
};

export const generateEmails = (options: GeneratorOptions): GeneratedEmail[] => {
  const { baseEmail, quantity, useRandomCase, useNumbers, usePlusSign } = options;
  const results: GeneratedEmail[] = [];
  
  if (!baseEmail.includes('@')) return [];

  const [username, domain] = baseEmail.split('@');
  
  // Prevent infinite loops or excessive processing
  const safeQuantity = Math.min(Math.max(1, quantity), 1000); 

  for (let i = 0; i < safeQuantity; i++) {
    let currentUsername = username;

    if (useRandomCase) {
      currentUsername = generateRandomCase(currentUsername);
    }

    if (useNumbers) {
      const randomNum = Math.floor(Math.random() * 10000);
      if (usePlusSign) {
        currentUsername = `${currentUsername}+${randomNum}`;
      } else {
        currentUsername = `${currentUsername}${randomNum}`;
      }
    }

    const email = `${currentUsername}@${domain}`;
    
    results.push({
      id: crypto.randomUUID(),
      email,
      copyCount: 0,
    });
  }

  return results;
};
