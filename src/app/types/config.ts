interface CameraConfig {
  source: number;
  type: string;
  rotation: number;
  language: string;
}

export interface Config {
  cameras: CameraConfig[];
  model: string;
}
