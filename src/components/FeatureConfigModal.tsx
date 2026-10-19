import React, { useState } from 'react';
import { X, Sliders, Check, Shield, Save, RefreshCw } from 'lucide-react';
import type { BotFeature } from '../types/index.ts';
import { sound } from '../utils/sound.ts';

interface FeatureConfigModalProps {
  feature: BotFeature | null;
  onClose: () => void;
  onSaveConfig: (id: string, updatedConfig: Record<string, string | number | boolean>) => void;
}

export const FeatureConfigModal: React.FC<FeatureConfigModalProps> = ({
  feature,
  onClose,
  onSaveConfig,
}) => {
  if (!feature) return null;

  const [formState, setFormState] = useState<Record<string, string | number | boolean>>(
    feature.config || {}
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFieldChange = (key: string, value: string | number | boolean) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    sound.playSuccess();
    onSaveConfig(feature.id, formState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
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
        aria-label="Konfigurasi Fitur"
        className="relative z-10 w-full max-w-lg bg-[var(--bg-surface)] border-4 border-[var(--border-color)] shadow-[8px_8px_0_#000000] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#141d25] border-b-2 border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#06b6d4] border border-black flex items-center justify-center text-black">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] bg-gray-800 text-gray-300 px-1 border border-black">
                  #{String(feature.number).padStart(3, '0')}
                </span>
                <h3 className="font-bold text-sm text-[#f5ebe0] truncate max-w-[220px]">
                  {feature.name}
                </h3>
              </div>
              <p className="text-[10px] text-[#06b6d4] font-mono">{feature.category}</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            aria-label="Tutup"
            className="pixel-btn p-1 bg-[#253442] hover:bg-red-950 text-[#f5ebe0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3 bg-[#0d141a] border border-[var(--border-color)] text-xs text-[var(--text-muted)] leading-relaxed">
            {feature.description}
          </div>

          <div className="space-y-3">
            <h4 className="font-pixel text-[9px] text-[#f5ebe0]">
              PARAMETER RUNTIME MODUL:
            </h4>

            {Object.keys(formState).length === 0 ? (
              <p className="text-xs text-gray-400 font-mono italic">
                Modul ini berjalan dengan parameter otonom tanpa konfigurasi manual.
              </p>
            ) : (
              Object.entries(formState).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <label className="block text-xs font-mono text-[#06b6d4]">
                    {key}:
                  </label>
                  {typeof val === 'boolean' ? (
                    <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) => handleFieldChange(key, e.target.checked)}
                        className="accent-[#10b981]"
                      />
                      <span className="text-[#f5ebe0]">{val ? 'Enabled (Aktif)' : 'Disabled (Mati)'}</span>
                    </label>
                  ) : typeof val === 'number' ? (
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => handleFieldChange(key, Number(e.target.value))}
                      className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-1.5 text-xs text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(val)}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-1.5 text-xs text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#121a22] border-t-2 border-[var(--border-color)] flex justify-between items-center">
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="pixel-btn px-3 py-1.5 bg-[#253442] text-xs text-[#f5ebe0] cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            className="pixel-btn px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Parameter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
