import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData.ts';
import { sound } from '../utils/sound.ts';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const toggleAccordion = (index: number) => {
    sound.playBlip();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={() => {
          sound.playBlip();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="FAQ &amp; Dokumentasi"
        className="relative z-10 w-full max-w-2xl bg-[var(--bg-surface)] border-4 border-[var(--border-color)] shadow-[8px_8px_0_#000000] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#141d25] border-b-2 border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#10b981] border border-black flex items-center justify-center text-black">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-[#f5ebe0]">
                FAQ &amp; DOKUMENTASI TEKNIS
              </h2>
              <p className="text-[10px] text-[var(--text-muted)]">
                Panduan Baileys, Pairing Code, Puppeteer Ubuntu, dan Arsitektur ALYTHRA
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            aria-label="Tutup"
            className="pixel-btn p-1 bg-[#253442] text-[#f5ebe0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Accordion */}
        <div className="p-5 overflow-y-auto space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpenAccordion = openIndex === index;
            return (
              <div
                key={index}
                className="border-2 border-[var(--border-color)] bg-[#0e141a] transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#151f28] cursor-pointer"
                >
                  <span className="font-semibold text-xs sm:text-sm text-[#f5ebe0]">
                    {faq.question}
                  </span>
                  {isOpenAccordion ? (
                    <ChevronUp className="w-4 h-4 text-[#10b981] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  )}
                </button>
                {isOpenAccordion && (
                  <div className="p-3.5 pt-0 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)]/50 bg-[#090d11]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#121a22] border-t-2 border-[var(--border-color)] flex justify-end">
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="pixel-btn px-4 py-1.5 bg-[#253442] text-[#f5ebe0] text-xs cursor-pointer"
          >
            Tutup FAQ
          </button>
        </div>
      </div>
    </div>
  );
};
