// Application state management using React context
import React, { createContext, useContext, useState, useCallback } from 'react';
import { DEMO_CASE, DEMO_HEIRS, DEMO_TIMELINE } from '../data/demoData';
import type { LandCase, Plot, Heir, TimelineEvent } from '../data/demoData';
import { generateAllPlans } from '../engine/partitionEngine';
import type { PartitionPlan } from '../engine/partitionEngine';

interface AppState {
  landCase: LandCase;
  heirs: Heir[];
  timeline: TimelineEvent[];
  selectedPlotId: string | null;
  selectedPlanId: string | null;
  plans: PartitionPlan[];
  isGeneratingPlans: boolean;
  uploadedMapFile: File | null;
  sidebarOpen: boolean;
}

interface AppContextType extends AppState {
  selectPlot: (id: string | null) => void;
  selectPlan: (id: string | null) => void;
  updateHeirs: (heirs: Heir[]) => void;
  generatePlans: () => void;
  resetDemo: () => void;
  setUploadedMapFile: (file: File | null) => void;
  setSidebarOpen: (open: boolean) => void;
  getSelectedPlot: () => Plot | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [landCase, setLandCase] = useState<LandCase>(DEMO_CASE);
  const [heirs, setHeirs] = useState<Heir[]>(DEMO_HEIRS);
  const [timeline] = useState<TimelineEvent[]>(DEMO_TIMELINE);
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>('plot-001');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('plan-area');
  const [plans, setPlans] = useState<PartitionPlan[]>(() => generateAllPlans(DEMO_CASE.plots, DEMO_HEIRS));
  const [isGeneratingPlans, setIsGeneratingPlans] = useState(false);
  const [uploadedMapFile, setUploadedMapFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectPlot = useCallback((id: string | null) => setSelectedPlotId(id), []);
  const selectPlan = useCallback((id: string | null) => setSelectedPlanId(id), []);

  const updateHeirs = useCallback((newHeirs: Heir[]) => {
    setHeirs(newHeirs);
    // Regenerate plans with new entitlements
    const newPlans = generateAllPlans(landCase.plots, newHeirs);
    setPlans(newPlans);
  }, [landCase.plots]);

  const generatePlans = useCallback(() => {
    setIsGeneratingPlans(true);
    setTimeout(() => {
      const newPlans = generateAllPlans(landCase.plots, heirs);
      setPlans(newPlans);
      setSelectedPlanId('plan-area');
      setIsGeneratingPlans(false);
    }, 800); // simulate processing time
  }, [landCase.plots, heirs]);

  const resetDemo = useCallback(() => {
    setLandCase(DEMO_CASE);
    setHeirs(DEMO_HEIRS);
    setSelectedPlotId('plot-001');
    setSelectedPlanId('plan-area');
    setPlans(generateAllPlans(DEMO_CASE.plots, DEMO_HEIRS));
    setUploadedMapFile(null);
  }, []);

  const getSelectedPlot = useCallback(() => {
    return landCase.plots.find(p => p.id === selectedPlotId);
  }, [landCase.plots, selectedPlotId]);

  return (
    <AppContext.Provider value={{
      landCase, heirs, timeline, selectedPlotId, selectedPlanId, plans,
      isGeneratingPlans, uploadedMapFile, sidebarOpen,
      selectPlot, selectPlan, updateHeirs, generatePlans, resetDemo,
      setUploadedMapFile, setSidebarOpen, getSelectedPlot,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
