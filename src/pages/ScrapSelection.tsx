import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const scrapTypes = [
  { id: 'plastic', label: 'Plastic', icon: '🥤', description: 'Bottles, containers, bags' },
  { id: 'paper', label: 'Paper', icon: '📄', description: 'Newspapers, cardboard, books' },
  { id: 'metal', label: 'Metal', icon: '🔩', description: 'Aluminum, iron, copper' },
  { id: 'electronics', label: 'Electronics', icon: '📱', description: 'Old phones, cables, batteries' },
  { id: 'glass', label: 'Glass', icon: '🍶', description: 'Bottles, jars, broken glass' },
  { id: 'fiber', label: 'Fiber/Cloth', icon: '🧵', description: 'Old clothes, fabric scraps' },
  { id: 'rubber', label: 'Rubber/Tires', icon: '🛞', description: 'Old tires, rubber products' },
  { id: 'wood', label: 'Wood', icon: '🚪', description: 'Furniture, wooden items' }
];

const ScrapSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id) 
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length === 0) return;
    // Pass selected types to the next page via state
    navigate('/booking/scrap/weight', { state: { scrapTypes: selectedTypes } });
  };

  const clearAll = () => {
    setSelectedTypes([]);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('scrapSelection.title', 'Select Scrap Items')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('scrapSelection.subtitle', 'You can choose multiple options')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {scrapTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => toggleType(type.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                flex flex-col items-center text-center gap-3
                ${selectedTypes.includes(type.id)
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg scale-105'
                  : 'border-border bg-card hover:border-green-200 dark:hover:border-green-800 hover:shadow-md'
                }
              `}
            >
              {selectedTypes.includes(type.id) && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
                  <Check className="w-3 h-3" />
                </div>
              )}
              
              <div className="text-4xl mb-2">{type.icon}</div>
              <h3 className="font-bold text-lg">{t(`scrapTypes.${type.id}`, type.label)}</h3>
              <p className="text-xs text-muted-foreground">{t(`scrapTypes.desc.${type.id}`, type.description)}</p>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-40"
        >
          <div className="container mx-auto max-w-5xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {selectedTypes.length}
              </div>
              <span className="font-medium hidden sm:inline">
                {t('scrapSelection.selected', 'Selected types')}
              </span>
              {selectedTypes.length > 0 && (
                <p className="text-sm text-muted-foreground sm:hidden">
                  {selectedTypes.join(', ')}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {selectedTypes.length > 0 && (
                <Button variant="ghost" onClick={clearAll} className="text-muted-foreground hover:text-destructive">
                  {t('common.clearAll', 'Clear All')}
                </Button>
              )}
              
              <Button 
                size="lg" 
                onClick={handleContinue}
                disabled={selectedTypes.length === 0}
                className="gap-2"
              >
                {t('common.continue', 'Continue')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrapSelection;
