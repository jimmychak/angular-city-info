export interface City {
  id: number;
  name: string;
  description: string;
  pointsOfInterest: PointOfInterest[];
}

export interface PointOfInterest {
    id?: number;
    name: string;
    description: string;
}
