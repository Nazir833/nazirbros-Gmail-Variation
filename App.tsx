import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GeneratorForm } from './components/GeneratorForm';
import { ResultList } from './components/ResultList';
import { GeneratedEmail, GeneratorOptions } from './types';
import { generateEmails } from './utils/generator';

const App: React.FC = () => {
  const [emails, setEmails] = useState<GeneratedEmail[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback((options: GeneratorOptions) => {
    setIsGenerating(true);
    // Simulate a small delay for better UX feel
    setTimeout(() => {
      const results = generateEmails(options);
      setEmails(results);
      setIsGenerating(false);
    }, 400);
  }, []);

  const handleCopy = useCallback(async (id: string, email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      
      setEmails((prev) => 
        prev.map((item) => {
          if (item.id === id) {
            // Enforce limit of 2
            if (item.copyCount >= 2) return item;
            return { ...item, copyCount: item.copyCount + 1 };
          }
          return item;
        })
      );
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (emails.length === 0) return;

    const content = emails.map(e => e.email).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nazirbro-emails.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [emails]);

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Gmail Variation Generator</h2>
              <p className="text-gray-600">Create unique aliases instantly for your testing needs.</p>
            </div>

            <GeneratorForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
            
            <ResultList 
              emails={emails} 
              onCopy={handleCopy} 
              onDownload={handleDownload} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
