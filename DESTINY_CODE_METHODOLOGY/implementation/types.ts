// Proposed contracts. Resolve actual application types during repository discovery.
export type ArcanaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;
export type NodeId = 'day' | 'month' | 'year' | 'bottom' | 'core' | 'nw' | 'ne' | 'se' | 'sw' | 'family_center' | 'day_inner' | 'day_mid' | 'month_inner' | 'month_mid' | 'year_inner' | 'year_mid' | 'bottom_inner' | 'bottom_mid' | 'nw_inner' | 'nw_mid' | 'ne_inner' | 'ne_mid' | 'se_inner' | 'se_mid' | 'sw_inner' | 'sw_mid' | 'heart_earth' | 'heart_sky' | 'bridge' | 'money_center' | 'love_center' | 'earth' | 'sky' | 'purpose_personal' | 'paternal' | 'maternal' | 'purpose_social' | 'purpose_spiritual';
export type SourceId = 'A' | 'B' | 'C';
export type EvidenceClass = 'shared' | 'source_specific' | 'conflicting' | 'editorial_synthesis' | 'unsupported';
export type CalculationProfile = 'C-family-center-v1' | 'AB-personal-center-v1';
export interface SourceRef { sourceId: SourceId; pdfPages: number[] }
export interface Provenance { classification: EvidenceClass; sourceRefs: SourceRef[]; editorialNote: string }
export type Domain = 'portrait' | 'core' | 'talent' | 'money' | 'relationship' | 'family' | 'growth' | 'desire' | 'balance' | 'purpose';
export interface CalculationRule { id: NodeId; name: string; inputs: Array<NodeId | 'dayOfMonth' | 'monthOfYear' | 'yearNumber'>; operation: 'identity' | 'reduce' | 'digit_sum_then_reduce' | 'sum_reduce'; reduction: string; provenance: Provenance; status: 'verified_for_proposed_C_profile' }
export interface TraceStep { formulaId: NodeId; inputs: string[]; operands: number[]; rawValue: number; reductionSteps: number[]; result: ArcanaNumber }
export interface MatrixResult { date: string; methodologyVersion: string; calculationProfile: CalculationProfile; values: Record<NodeId, ArcanaNumber>; trace: TraceStep[] }
export interface PositionDefinition { id: NodeId; displayName: string; formulaId: NodeId; domain: Domain; diagramCoordinates: [number, number] | null; role: string; readingConstraint: string; provenance: Provenance }
export interface ChannelDefinition { id: string; name: string; physicalOrder: NodeId[]; interpretationOrder: NodeId[]; provenance: Provenance; repetitionRule: string }
export interface ArcanaDefinition { id: string; number: ArcanaNumber; name: string; coreSymbolicMeaning: string; archetypalThemes: string[]; constructiveManifestations: string[]; shadowManifestations: string[]; domainReadings: Record<Domain, string>; sourceRefs: SourceRef[]; provenance: Provenance; reflectivePractice: string }
export interface PatternDefinition { id: string; match: { channelId: 'karmic_tail'; orderedValues: [ArcanaNumber, ArcanaNumber, ArcanaNumber]; nodeOrder: ['bottom', 'bottom_inner', 'bottom_mid'] }; title: string; symbolicReading: string; practice: string; provenance: Provenance }
export interface ReportBlock { kind: 'paragraph' | 'position' | 'pattern' | 'practice' | 'calculation_table'; text: string; nodeIds: NodeId[]; formulaIds: NodeId[]; ruleIds: string[]; provenance: Provenance }
export interface ReportSection { id: string; title: string; blocks: ReportBlock[] }
export interface ReportModel { dateOnly: string; methodologyVersion: string; calculationProfile: CalculationProfile; contentVersion: string; reportSchemaVersion: string; sourceDataHash: string; locale: 'en-US'; values: Record<NodeId, ArcanaNumber>; sections: ReportSection[] }
export interface FreePreview { dateOnly: string; methodologyVersion: string; calculationProfile: CalculationProfile; contentVersion: string; positions: Array<{id: 'day' | 'core'; number: ArcanaNumber; coreSymbolicMeaning: string}>; disclosure: string }
// Prices and entitlement decisions remain owned by the existing server application.
