interface CameraConfig {
  name: string;
  rotation: number;
  source: number;
}

export interface Config {
  cameras: CameraConfig[];
  model: string;
}
