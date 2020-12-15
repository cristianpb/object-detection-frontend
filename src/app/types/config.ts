interface CameraConfig {
  name: string;
  rotation: number;
  source: number;
}

export interface Config {
  cameras: CameraConfig[];
  model: string;
}

export interface JobsTable {
  jobs: {
    name: string;
    camera: string;
    running: boolean;
    start: string;
    end?: string;
  }[]
}
