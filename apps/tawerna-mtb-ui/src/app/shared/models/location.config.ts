import { DifficultyLevel, Location, PlaceType } from './location.model';

export const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; classes: string }> = {
  [DifficultyLevel.GREEN]: {
    label: 'Green',
    classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
  [DifficultyLevel.BLUE_FLOW]: {
    label: 'Blue',
    classes: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  },
  [DifficultyLevel.RED_TECH]: {
    label: 'Red',
    classes: 'bg-red-500/15 text-red-400 border-red-500/20',
  },
  [DifficultyLevel.BLACK_DH]: {
    label: 'Black',
    classes: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  },
};

export const PLACE_TYPE_CONFIG: Record<
  PlaceType,
  {
    label: string;
    bgClass: string;
    textClass: string;
    markerIcon: string;
    markerColor: string;
    imageUrl: string;
  }
> = {
  [PlaceType.BIKE_PARK]: {
    label: 'Bike park',
    bgClass: 'border-emerald-500/20 bg-emerald-500/10',
    textClass: 'text-emerald-400',
    markerIcon: '🚠',
    markerColor: '#10b981',
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=960&q=80',
  },
  [PlaceType.MOUNTAIN_TRAIL]: {
    label: 'Mountain trail',
    bgClass: 'border-orange-500/20 bg-orange-500/10',
    textClass: 'text-orange-400',
    markerIcon: '⛰️',
    markerColor: '#f97316',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=960&q=80',
  },
  [PlaceType.TRAIL_CENTER]: {
    label: 'Trail center',
    bgClass: 'border-sky-500/20 bg-sky-500/10',
    textClass: 'text-sky-400',
    markerIcon: '🌲',
    markerColor: '#38bdf8',
    imageUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=960&q=80',
  },
};

export type { Location };
