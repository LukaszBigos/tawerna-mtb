export interface GarageBike {
  id: string;
  brand: string;
  model: string;
  year: number;
  wheelSize?: number;
  rearWheelSize?: number;
  frameSize?: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl: string;
}