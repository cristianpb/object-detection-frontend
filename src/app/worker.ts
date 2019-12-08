export class Worker {
  name: {
    conf: {
      broker_url: string;
      beat_schedule: {
        taskName: {
          task: string;
          schedule: string;
          args: string;
        };
        broker_name: string;
      };
    };
    stats: {
      total: {
        taskName: number;
      };
      pid: number
    };
  };
}
