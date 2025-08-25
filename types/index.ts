// Clean, production-ready types for Dakshin Vaarahi

// Core types with minimal required properties
export interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Allow any additional properties
}

export interface Project {
  id: string;
  name: string;
  type: string;
  [key: string]: any; // Allow any additional properties
}

// Basic interfaces for core functionality
export interface Wall {
  id: string;
  [key: string]: any;
}

export interface Room {
  id: string;
  name: string;
  [key: string]: any;
}

export interface Level {
  id: string;
  name: string;
  [key: string]: any;
}

export interface Zone {
  id: string;
  name: string;
  [key: string]: any;
}

export interface InfrastructureLine {
  id: string;
  [key: string]: any;
}

export interface ProjectData {
  id: string;
  name: string;
  type: string;
  [key: string]: any;
}

export interface PlanNorthDirection {
  [key: string]: any;
}

export interface TerrainMesh {
  [key: string]: any;
}

export interface SunPosition {
  [key: string]: any;
}

export interface Layer {
  id: string;
  name: string;
  [key: string]: any;
}

export interface Placement {
  id: string;
  [key: string]: any;
}

export interface PlacedModel {
  id: string;
  [key: string]: any;
}

export interface DimensionLine {
  id: string;
  [key: string]: any;
}

export interface AppComment {
  id: string;
  [key: string]: any;
}

export interface SelectedObject {
  id: string;
  [key: string]: any;
}

// Flexible string-based types for tool systems
export type SketcherTool = string;
export type EditorMode = string;
export type PhoenixEngineTab = string;
export type TimeOfDay = string;
export type AppView = string;
export type PanelId = string;

// All other types as flexible objects
export interface AiSketchToPlanResponse { [key: string]: any; }
export interface AiResearchResponse { [key: string]: any; }
export interface AiFixResponse { [key: string]: any; }
export interface CodeComplianceReport { [key: string]: any; }
export interface MaterialAnalysisReport { [key: string]: any; }
export interface SustainabilityReport { [key: string]: any; }
export interface AdvancedStructuralReport { [key: string]: any; }
export interface BillOfQuantitiesReport { [key: string]: any; }
export interface BoqItem { [key: string]: any; }
export interface MultiConceptResponse { [key: string]: any; }
export interface ProjectCertificationReport { [key: string]: any; }
export interface VastuGridAnalysis { [key: string]: any; }
export interface ConstructionPhase { [key: string]: any; }
export interface PlumbingLine { [key: string]: any; }
export interface ElectricalLayout { [key: string]: any; }
export interface HvacLayout { [key: string]: any; }
export interface SiteAnalysisReport { [key: string]: any; }
export interface GFCDrawingSet { [key: string]: any; }
export interface MasterArchitectResponse { [key: string]: any; }
export interface InteriorSchemeResponse { [key: string]: any; }
export interface LandscapePlanResponse { [key: string]: any; }
export interface MasterPlanLayoutResponse { [key: string]: any; }
export interface FlowIssue { [key: string]: any; }
export interface PhoenixEyeReport { [key: string]: any; }
export interface CinematicTour { [key: string]: any; }
export interface ArSuggestionsResponse { [key: string]: any; }
export interface OracleAnalysisResponse { [key: string]: any; }
export interface CostSustainabilityReport { [key: string]: any; }
export interface BrahmaAstraMission { [key: string]: any; }
export interface BrahmaAstraReport { [key: string]: any; }
export interface FabricationFile { [key: string]: any; }
export interface IndraNetReport { [key: string]: any; }
export interface VarunaReport { [key: string]: any; }
export interface LokaSimulatorReport { [key: string]: any; }
export interface NavagrahaReport { [key: string]: any; }
export interface AkashaReport { [key: string]: any; }
export interface SamsaraReport { [key: string]: any; }
export interface ShilpaSutraReport { [key: string]: any; }
export interface SingularityReport { [key: string]: any; }
export interface StrategicAdviceReport { [key: string]: any; }
export interface ProjectAnalyticsData { [key: string]: any; }
export interface PrithviAstraReport { [key: string]: any; }
export interface AgniAstraReport { [key: string]: any; }
export interface NexusReport { [key: string]: any; }
export interface ProjectSummary { [key: string]: any; }
export interface AiCompanionCommandResponse { [key: string]: any; }
export interface AtmanSignatureResponse { [key: string]: any; }
export interface ParamAstraResponse { [key: string]: any; }
export interface SvaDharmaResponse { [key: string]: any; }
export interface SanjeevaniReport { [key: string]: any; }
export interface JuggernautReport { [key: string]: any; }
export interface JuggernautPrediction { [key: string]: any; }
export interface SamaranganSolution { [key: string]: any; }
export interface Guild { [key: string]: any; }
export interface GuildMember { [key: string]: any; }
export interface BrahmanTierProject { [key: string]: any; }
export interface RazorpayOptions { [key: string]: any; }
export interface RazorpayPaymentResponse { [key: string]: any; }
export interface CreditPack { [key: string]: any; }
export interface UpdateUserPayload { [key: string]: any; }
export interface ChangePasswordPayload { [key: string]: any; }
export interface ProjectStatus { [key: string]: any; }
export interface BudgetCategory { [key: string]: any; }
export interface ProjectTask { [key: string]: any; }
export interface ProjectVersion { [key: string]: any; }
export interface Collaborator { [key: string]: any; }
export interface GeneratedDocument { [key: string]: any; }
export interface GeneratedRender { [key: string]: any; }
export interface MarketplaceInfo { [key: string]: any; }
export interface HolocronData { [key: string]: any; }
export interface DigitalTwinData { [key: string]: any; }
export interface Rfq { [key: string]: any; }
export interface UserCorrection { [key: string]: any; }
export interface SketcherHandles { [key: string]: any; }
export interface View3DHandles { [key: string]: any; }
export interface Point3D { [key: string]: any; }
export interface ProactiveSuggestion { [key: string]: any; }
export interface OnboardingChecklist { [key: string]: any; }
export interface PanelState { [key: string]: any; }
export interface ContextMenuData { [key: string]: any; }
export interface MaterialDefinition { [key: string]: any; }
export interface Predefined3DModel { [key: string]: any; }
export interface KpiData { [key: string]: any; }
export interface Feedback { [key: string]: any; }
export interface KpiChartData { [key: string]: any; }
export interface StrategicInsight { [key: string]: any; }
export interface Supplier { [key: string]: any; }
export interface Quote { [key: string]: any; }
export interface AuthResponse { [key: string]: any; }
export interface UserAnalyticsData { [key: string]: any; }
export interface Submission { [key: string]: any; }
export interface LiveCursor { [key: string]: any; }
export interface LiveSelection { [key: string]: any; }
export interface PhoenixEnginePanelProps { [key: string]: any; }
export interface SuggestedItem { [key: string]: any; }
export interface SutraAction { [key: string]: any; }
export interface Sutra { [key: string]: any; }
export interface UndoableState { [key: string]: any; }
export interface Holocron { [key: string]: any; }
export interface StagingSettings { [key: string]: any; }
export interface Storyboard { [key: string]: any; }
export interface Notification { [key: string]: any; }
export interface ChatMessage { [key: string]: any; }
export interface AdjudicationReport { [key: string]: any; }
export interface Command { [key: string]: any; }
export interface HolocronHotspot { [key: string]: any; }
export interface SharedEditorProps { [key: string]: any; }
export interface GenerativeIP { [key: string]: any; }
export interface Transaction { [key: string]: any; }
export interface PropertyLine { [key: string]: any; }
export interface FloorPlanSketcherSectionProps { [key: string]: any; }
export interface ReadOnlySketcherProps { [key: string]: any; }
export interface Reply { [key: string]: any; }
export interface IndraNetVisual { [key: string]: any; }
export interface Scene { [key: string]: any; }
export interface DigitalTwinDataOverlay { [key: string]: any; }

// Simple slice interfaces
export interface AISlice { [key: string]: any; }
export interface AuthSlice { [key: string]: any; }
export interface CollaborationSlice { [key: string]: any; }
export interface EditorSlice { [key: string]: any; }
export interface ProjectSlice { [key: string]: any; }
export interface UISlice { [key: string]: any; }

// Clean AppStore interface
export interface AppStore {
  // Basic state
  currentUser: User | null;
  view: string;
  globalLoadingMessage: string;
  hasUnsavedChanges: boolean;
  
  // Modal states
  isProfilePageOpen: boolean;
  isHelpModalOpen: boolean;
  isFeedbackModalOpen: boolean;
  isSupportModalOpen: boolean;
  isBuyCreditsModalOpen: boolean;
  isExportModalOpen: boolean;
  isTokenizeModalOpen: boolean;
  isNewProjectModalOpen: boolean;
  isWelcomeModalOpen: boolean;
  isHotspotEditorOpen: boolean;
  isCommandPaletteOpen: boolean;
  
  // Auth
  authModal: any;
  isLoadingAuth: boolean;
  authError: any;
  userAnalytics: any;
  guilds: any[];
  myGuild: any;
  strategicInsights: any;
  
  // Project
  currentProject: Project | null;
  projects: Project[];
  projectError: any;
  isProjectLoading: boolean;
  saveStatus: string;
  
  // AI and Tools
  isLaunchSequenceActive: boolean;
  isBrahmaAstraRunning: boolean;
  brahmaAstraReport: any;
  isSingularityRunning: boolean;
  singularityReport: any;
  isJuggernautModeActive: boolean;
  juggernautPredictions: any;
  isDigitalTwinModeActive: boolean;
  digitalTwinData: any;
  isCinematicTourPlaying: boolean;
  activeTool: string;
  showVastuGrid: boolean;
  isBrahmandaAstraActive: boolean;
  cinematicTourData: any;
  lokaSimulatorReport: any;
  navagrahaReport: any;
  akashaReport: any;
  samsaraReport: any;
  shilpaSutraReport: any;
  prithviAstraReport: any;
  agniAstraReport: any;
  nexusReport: any;
  svaDharmaReport: any;
  atmanSignatureReport: any;
  paramAstraReport: any;
  sanjeevaniReport: any;
  activeDataOverlays: any;
  activeTimelineWeek: any;
  isSimulatingLiveData: boolean;
  atmanSignature: string;
  atmanSparringHistory: any[];
  
  // Editor state
  levels: Level[];
  activeLevelIndex: number;
  planNorthDirection: PlanNorthDirection;
  propertyLines: any[];
  terrainMesh: TerrainMesh | null;
  stagingSettings: any;
  savedCameraViews: any[];
  holocron: any;
  storyboard: any;
  zones: Zone[];
  infrastructure: InfrastructureLine[];
  selectedObject: SelectedObject | null;
  activeSketcherTool: string;
  editorMode: string;
  currentPlacingModelKey: any;
  sunPosition: SunPosition;
  isWalkthroughActive: boolean;
  isHolocronAuthoringMode: boolean;
  focusedCommentId: any;
  
  // Undo/Redo
  undoStack: any[];
  redoStack: any[];
  canUndo: boolean;
  canRedo: boolean;
  
  // AI
  sutras: any[];
  runningSutraId: string | null;
  sutraExecutionLogs: any[];
  samaranganSolutions: any;
  aiFixPreview: any;
  lastAiToolRun: any;
  
  // Collaboration
  chatHistory: any[];
  collaborators: any[];
  liveCursors: any;
  liveSelections: any;
  companionState: string;
  companionTranscript: string | null;
  
  // Reports
  billOfQuantities: any;
  sustainabilityReport: any;
  vastuGridAnalysis: any;
  advancedStructuralReport: any;
  constructionSequence: any;
  
  // Global
  globalRfqs: any[];
  
  // UI State
  panels: any;
  panelStates: any;
  contextMenu: any;
  hotspotEditorTarget: any;
  proactiveSuggestions: any[];
  seenSpotlights: string[];
  onboardingChecklist: any;
  selectedCreditPack: any;
  projectToTokenize: any;
  onboardingStep: number;
  notifications: any[];
  
  // Methods
  setExportModalOpen: (open: boolean) => void;
  setTokenizeModalOpen: (open: boolean, project?: any) => void;
  setHotspotEditorOpen: (open: boolean, target?: any) => void;
  setIsCommandPaletteOpen: (updater: any) => void;
  setBuyCreditsModalOpen: (open: boolean, pack?: any) => void;
  setNewProjectModalOpen: (open: boolean) => void;
  setAuthModal: (modal: any) => void;
  setView: (view: string) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  setPanelStates: (updater: any) => void;
  focusPanel: (panelId: string) => void;
  setContextMenu: (menu: any) => void;
  addProactiveSuggestion: (suggestion: any) => void;
  dismissProactiveSuggestion: (id: string) => void;
  markSpotlightSeen: (spotlightId: string) => void;
  completeOnboardingChecklistItem: (item: string) => void;
  setGlobalLoading: (message: string) => void;
  setupSocketListeners: () => void;
  autoSaveProject: () => void;
  saveProjectVersion: (message: string) => Promise<void>;
  updateCurrentProject: (updates: any) => void;
  refreshCurrentUser: () => void;
  endInteractiveTutorial: () => void;
  logout: () => Promise<void>;
  setLevels: (levels: any[]) => void;
  setSingleLevelProp: (prop: string, value: any) => void;
  setSelectedObject: (payload: any) => void;
  addLayer: (name: string) => void;
  updateLayer: (id: string, updates: any) => void;
  deleteLayer: (id: string) => void;
  addWall: (wall: any) => void;
  updateWall: (wallId: string, updates: any) => void;
  addPlacement: (placement: any) => void;
  addDimensionLine: (line: any) => void;
  addComment: (comment: any) => void;
  onViewCommentThread: (commentId: string) => void;
  addZone: (zone: any) => void;
  addInfrastructure: (line: any) => void;
  setActiveSketcherTool: (tool: any) => void;
  setEditorMode: (mode: any) => void;
  setCurrentPlacingModelKey: (key: any) => void;
  setSunPosition: (updater: any) => void;
  setStagingSettings: (updater: any) => void;
  setIsWalkthroughActive: (active: boolean) => void;
  setIsHolocronAuthoringMode: (active: boolean) => void;
  setFocusedCommentId: (id: any) => void;
  pushToUndoStack: () => void;
  undo: () => void;
  redo: () => void;
  setVastuGridAnalysis: (analysis: any) => void;
  setBillOfQuantities: (boq: any) => void;
  setAdvancedStructuralReport: (report: any) => void;
  setLastAiToolRun: (tool: any) => void;
  setSamaranganSolutions: (solutions: any) => void;
  setChatHistory: (messages: any[]) => void;
  addChatMessage: (message: any) => void;
  setCollaborators: (collaborators: any[]) => void;
  setLiveCursors: (updater: any) => void;
  setLiveSelections: (updater: any) => void;
  updateRoomsFromWalls: () => void;
  setActiveTool: (tool: string) => void;
  newProject: (type: string) => void;
  loadProject: (projectId: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  exportCometPackage: (sketcherRef: any, view3dRef: any) => Promise<void>;
  
  // Helper method to create ProjectData with required properties
  createProjectData: (data: any) => ProjectData;
  
  // Initialize application
  initApp: () => Promise<void>;
  
  // Allow any additional properties and methods
  [key: string]: any;
}