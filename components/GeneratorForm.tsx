import React, { useState } from 'react';
import { GeneratorOptions } from '../types';

interface GeneratorFormProps {
  onGenerate: (options: GeneratorOptions) => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [baseEmail, setBaseEmail] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [useRandomCase, setUseRandomCase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [usePlusSign, setUsePlusSign] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      baseEmail,
      quantity,
      useRandomCase,
      useNumbers,
      usePlusSign
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Base Gmail Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="example@gmail.com"
            value={baseEmail}
            onChange={(e) => setBaseEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Quantity Slider/Input */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity: <span className="text-blue-600 font-bold">{quantity}</span>
          </label>
          <input
            id="quantity"
            type="range"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={useRandomCase}
              onChange={(e) => setUseRandomCase(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 font-medium">Randomize Casing</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 font-medium">Add Numbers</span>
          </label>
          
          {useNumbers && (
             <label className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors sm:col-span-2">
             <input
               type="checkbox"
               checked={usePlusSign}
               onChange={(e) => setUsePlusSign(e.target.checked)}
               className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
             />
             <div className="flex flex-col">
                <span className="text-sm text-gray-700 font-medium">Use Gmail Alias (+)</span>
                <span className="text-xs text-gray-500">e.g. name+123@gmail.com</span>
             </div>
           </label>
          )}
        </div>

        <button
          type="submit"
          disabled={isGenerating || !baseEmail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Variations'}
        </button>
      </form>
    </div>
  );
};
