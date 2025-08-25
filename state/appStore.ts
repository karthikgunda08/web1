
// src/state/appStore.ts
import { create } from 'zustand';
import { AppStore } from '../types/index';

export const useAppStore = create<AppStore>((set, get) => ({
  // Basic state
  currentUser: null,
  view: 'dashboard',
  globalLoadingMessage: '',
  hasUnsavedChanges: false,
  
  // Modal states
  isProfilePageOpen: false,
  isHelpModalOpen: false,
  isFeedbackModalOpen: false,
  isSupportModalOpen: false,
  isBuyCreditsModalOpen: false,
  isExportModalOpen: false,
  isTokenizeModalOpen: false,
  isNewProjectModalOpen: false,
  isWelcomeModalOpen: false,
  isHotspotEditorOpen: false,
  isCommandPaletteOpen: false,
  
  // Auth
  authModal: null,
  isLoadingAuth: false,
  authError: null,
  userAnalytics: null,
  guilds: [],
  myGuild: null,
  strategicInsights: null,
  
  // Project
  currentProject: null,
  projects: [],
  projectError: null,
  isProjectLoading: false,
  saveStatus: '',
  
  // AI and Tools
  isLaunchSequenceActive: false,
  isBrahmaAstraRunning: false,
  brahmaAstraReport: null,
  isSingularityRunning: false,
  singularityReport: null,
  isJuggernautModeActive: false,
  juggernautPredictions: null,
  isDigitalTwinModeActive: false,
  digitalTwinData: null,
  isCinematicTourPlaying: false,
  activeTool: 'select',
  showVastuGrid: false,
  isBrahmandaAstraActive: false,
  cinematicTourData: null,
  lokaSimulatorReport: null,
  navagrahaReport: null,
  akashaReport: null,
  samsaraReport: null,
  shilpaSutraReport: null,
  prithviAstraReport: null,
  agniAstraReport: null,
  nexusReport: null,
  svaDharmaReport: null,
  atmanSignatureReport: null,
  paramAstraReport: null,
  sanjeevaniReport: null,
  activeDataOverlays: [],
  activeTimelineWeek: null,
  isSimulatingLiveData: false,
  atmanSignature: '',
  atmanSparringHistory: [],
  
  // Editor state
  levels: [],
  activeLevelIndex: 0,
  planNorthDirection: { angle: 0 },
  propertyLines: [],
  terrainMesh: null,
  stagingSettings: { timeOfDay: 'midday' },
  savedCameraViews: [],
  holocron: null,
  storyboard: null,
  zones: [],
  infrastructure: [],
  selectedObject: null,
  activeSketcherTool: 'select',
  editorMode: 'sketch',
  currentPlacingModelKey: null,
  sunPosition: { x: 0, y: 0, z: 0 },
  isWalkthroughActive: false,
  isHolocronAuthoringMode: false,
  focusedCommentId: null,
  hotspots: [],
  onHotspotClick: null,
  onAddHotspot: null,
  
  // Undo/Redo
  undoStack: [],
  redoStack: [],
  canUndo: false,
  canRedo: false,
  
  // AI
  sutras: [],
  runningSutraId: null,
  sutraExecutionLogs: [],
  samaranganSolutions: null,
  aiFixPreview: null,
  lastAiToolRun: null,
  
  // Collaboration
  chatHistory: [],
  collaborators: [],
  liveCursors: {},
  liveSelections: {},
  companionState: 'idle',
  companionTranscript: null,
  
  // Reports
  billOfQuantities: null,
  sustainabilityReport: null,
  vastuGridAnalysis: null,
  advancedStructuralReport: null,
  constructionSequence: null as any,
  
  // Global
  globalRfqs: [],
  
  // UI State
  panels: {},
  panelStates: {
    phoenixEngine: { id: 'phoenixEngine', x: 100, y: 80, width: 450, height: 700, zIndex: 10, isVisible: true },
    propertiesPanel: { id: 'propertiesPanel', x: 100, y: 80, width: 350, height: 500, zIndex: 10, isVisible: false },
    projectHub: { id: 'projectHub', x: 100, y: 100, width: 800, height: 600, zIndex: 10, isVisible: false },
    layersPanel: { id: 'layersPanel', x: 100, y: 80, width: 350, height: 300, zIndex: 10, isVisible: false },
    chatPanel: { id: 'chatPanel', x: 150, y: 150, width: 400, height: 550, zIndex: 10, isVisible: false },
    analyticsPanel: { id: 'analyticsPanel', x: 200, y: 200, width: 600, height: 450, zIndex: 10, isVisible: false },
    digitalTwinPanel: { id: 'digitalTwinPanel', x: 250, y: 250, width: 380, height: 400, zIndex: 10, isVisible: false },
    integrationsPanel: { id: 'integrationsPanel', x: 300, y: 300, width: 500, height: 400, zIndex: 10, isVisible: false }
  },
  contextMenu: null,
  hotspotEditorTarget: null,
  proactiveSuggestions: [],
  seenSpotlights: [],
  onboardingChecklist: {},
  selectedCreditPack: null,
  projectToTokenize: null,
  onboardingStep: -1,
  notifications: [],
  
  // Methods
  setExportModalOpen: (open) => set({ isExportModalOpen: open }),
  setTokenizeModalOpen: (open, project) => set({ isTokenizeModalOpen: open, projectToTokenize: project }),
  setHotspotEditorOpen: (open, target) => set({ isHotspotEditorOpen: open, hotspotEditorTarget: target }),
  setIsCommandPaletteOpen: (updater) => set({ isCommandPaletteOpen: typeof updater === 'function' ? updater(get().isCommandPaletteOpen) : updater }),
  setBuyCreditsModalOpen: (open, pack = null) => set({ isBuyCreditsModalOpen: open, selectedCreditPack: pack }),
  setNewProjectModalOpen: (open) => set({ isNewProjectModalOpen: open }),
  setAuthModal: (modal) => set({ authModal: modal }),
  setView: (view) => set({ view, hasUnsavedChanges: view === 'auraOS' ? get().hasUnsavedChanges : false }),
  addNotification: (message, type) => {
    const { addNotification: addNotif } = require('./notificationStore').useNotificationStore.getState();
    addNotif(message, type);
  },
  setPanelStates: (updater) => set({ panelStates: typeof updater === 'function' ? updater(get().panelStates) : updater }),
  focusPanel: (panelId) => set((state) => ({
    panelStates: {
      ...state.panelStates,
      [panelId]: { ...state.panelStates[panelId], isVisible: true, zIndex: 100 }
    }
  })),
  setContextMenu: (menu) => set({ contextMenu: menu }),
  addProactiveSuggestion: (suggestion) => set((state) => ({
    proactiveSuggestions: [...state.proactiveSuggestions, suggestion]
  })),
  dismissProactiveSuggestion: (id) => set((state) => ({
    proactiveSuggestions: state.proactiveSuggestions.filter(s => s.id !== id)
  })),
  markSpotlightSeen: (spotlightId) => set((state) => ({
    seenSpotlights: [...state.seenSpotlights, spotlightId]
  })),
  completeOnboardingChecklistItem: (item) => set((state) => ({
    onboardingChecklist: { ...state.onboardingChecklist, [item]: true }
  })),
  setGlobalLoading: (message) => set({ globalLoadingMessage: message }),
  setupSocketListeners: () => {
    // Socket setup logic here
  },
  autoSaveProject: () => {
    // Auto-save logic here
  },
  saveProjectVersion: async (message) => {
    // Save version logic here
  },
  updateCurrentProject: (updates) => set((state) => ({
    currentProject: state.currentProject ? { ...state.currentProject, ...updates } : null
  })),
  refreshCurrentUser: () => {
    // Refresh user logic here
  },
  endInteractiveTutorial: () => set({ onboardingStep: -1 }),
  logout: async () => {
    set({
      currentUser: null,
      view: 'landing',
      currentProject: null,
      projects: []
    });
  },
  setLevels: (levels) => set({ levels }),
  setSingleLevelProp: (prop, value) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, [prop]: value } : level
    )
  })),
  setSelectedObject: (payload) => set({ selectedObject: payload }),
  addLayer: (name) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, layers: [...(level.layers || []), { id: Date.now().toString(), name }] } : level
    )
  })),
  updateLayer: (id, updates) => set((state) => ({
    levels: state.levels.map(level => ({
      ...level,
      layers: level.layers?.map(layer => layer.id === id ? { ...layer, ...updates } : layer) || []
    }))
  })),
  deleteLayer: (id) => set((state) => ({
    levels: state.levels.map(level => ({
      ...level,
      layers: level.layers?.filter(layer => layer.id !== id) || []
    }))
  })),
  addWall: (wall) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, walls: [...(level.walls || []), wall] } : level
    )
  })),
  updateWall: (wallId, updates) => set((state) => ({
    levels: state.levels.map(level => ({
      ...level,
      walls: level.walls?.map(wall => wall.id === wallId ? { ...wall, ...updates } : wall) || []
    }))
  })),
  addPlacement: (placement) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, placements: [...(level.placements || []), placement] } : level
    )
  })),
  addDimensionLine: (line) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, dimensionLines: [...(level.dimensionLines || []), line] } : level
    )
  })),
  addComment: (comment) => set((state) => ({
    levels: state.levels.map((level, index) => 
      index === state.activeLevelIndex ? { ...level, comments: [...(level.comments || []), comment] } : level
    )
  })),
  onViewCommentThread: (commentId) => set({ focusedCommentId: commentId }),
  addZone: (zone) => set((state) => ({ zones: [...state.zones, zone] })),
  addInfrastructure: (line) => set((state) => ({ infrastructure: [...state.infrastructure, line] })),
  setActiveSketcherTool: (tool) => set({ activeSketcherTool: tool }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  setCurrentPlacingModelKey: (key) => set({ currentPlacingModelKey: key }),
  setSunPosition: (updater) => set((state) => ({
    sunPosition: typeof updater === 'function' ? updater(state.sunPosition) : updater
  })),
  setStagingSettings: (updater) => set((state) => ({
    stagingSettings: typeof updater === 'function' ? updater(state.stagingSettings) : updater
  })),
  setIsWalkthroughActive: (active) => set({ isWalkthroughActive: active }),
  setIsHolocronAuthoringMode: (active) => set({ isHolocronAuthoringMode: active }),
  setFocusedCommentId: (id) => set({ focusedCommentId: id }),
  pushToUndoStack: () => {
    // Undo logic here
  },
  undo: () => {
    // Undo logic here
  },
  redo: () => {
    // Redo logic here
  },
  setVastuGridAnalysis: (analysis) => set({ vastuGridAnalysis: analysis }),
  setBillOfQuantities: (boq) => set({ billOfQuantities: boq }),
  setAdvancedStructuralReport: (report) => set({ advancedStructuralReport: report }),
  setLastAiToolRun: (tool) => set({ lastAiToolRun: tool }),
  setSamaranganSolutions: (solutions) => set({ samaranganSolutions: solutions }),
  setChatHistory: (messages) => set({ chatHistory: messages }),
  addChatMessage: (message) => set((state) => ({
    chatHistory: [...state.chatHistory, message]
  })),
  setCollaborators: (collaborators) => set({ collaborators }),
  setLiveCursors: (updater) => set((state) => ({
    liveCursors: typeof updater === 'function' ? updater(state.liveCursors) : updater
  })),
  setLiveSelections: (updater) => set((state) => ({
    liveSelections: typeof updater === 'function' ? updater(state.liveSelections) : updater
  })),
  updateRoomsFromWalls: () => {
    // Room update logic here
  },
  setActiveTool: (tool) => set({ activeTool: tool }),
  newProject: (type) => {
    // New project logic here
  },
  loadProject: async (projectId) => {
    // Load project logic here
  },
  deleteProject: async (projectId) => {
    // Delete project logic here
  },
  exportCometPackage: async (sketcherRef, view3dRef) => {
    // Export logic here
  },
  
  // Helper method to create ProjectData with required properties
  createProjectData: (data) => ({
    id: data.id || `project_${Date.now()}`,
    name: data.name || 'Untitled Project',
    type: data.type || 'building',
    ...data
  }),
  
  // Initialize application
  initApp: async () => {
    try {
      set({ globalLoadingMessage: 'Initializing Universe...' });
      
      // Check if user is already logged in (e.g., from localStorage or session)
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          set({ currentUser: user, isLoadingAuth: false });
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
      
      // Setup socket listeners if needed
      get().setupSocketListeners();
      
      set({ globalLoadingMessage: '', isLoadingAuth: false });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      set({ globalLoadingMessage: '', isLoadingAuth: false });
    }
  }
}));