export enum DifficultyLevel {
  GREEN = 'GREEN',
  BLUE_FLOW = 'BLUE_FLOW',
  RED_TECH = 'RED_TECH',
  BLACK_DH = 'BLACK_DH',
}

export enum PlaceType {
  BIKE_PARK = 'BIKE_PARK',
  MOUNTAIN_TRAIL = 'MOUNTAIN_TRAIL',
  TRAIL_CENTER = 'TRAIL_CENTER',
}

export interface Trail {
  id: number;
  name: string;
  lengthInMeters: number;
  difficulty: DifficultyLevel;
  trailforksUrl: string | null;
  youtubeVideoUrl: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface CreateLocationRequest {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type: PlaceType;
  youtubeVideoUrl?: string | null;
  imageUrl?: string | null;
  websiteUrl?: string | null;
}

export interface CreateTrailRequest {
  name: string;
  lengthInMeters: number;
  difficulty: DifficultyLevel;
  trailforksUrl?: string | null;
  youtubeVideoUrl?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type: PlaceType;
  youtubeVideoUrl: string | null;
  imageUrl: string | null;
  websiteUrl: string | null;
  trails: Trail[];
}
