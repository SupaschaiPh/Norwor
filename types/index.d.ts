export { userSession, HttpFlvData };
declare global {
  interface userSession {
    displayName?: String;
    id?: Number;
    username?: String;
  }

  // Define interfaces for various data structures

  interface HttpFlvData {
    "http-flv": {
      nginx_version: string;
      nginx_http_flv_version: string;
      compiler: string;
      built: string;
      pid: number;
      uptime: number;
      naccepted: number;
      bw_in: number;
      bytes_in: number;
      bw_out: number;
      bytes_out: number;
      servers: Server[];
    };
  }

  interface Server {
    port: number;
    server_index: number;
    applications: Application[];
  }

  interface Application {
    name: string;
    live: Live;
    recorders: Recorders;
  }

  interface Live {
    streams: Stream[];
    nclients: number;
  }

  interface Stream {
    name: string;
    time: number;
    bw_in: number;
    bytes_in: number;
    bw_out: number;
    bytes_out: number;
    bw_audio?: number; // Optional for the second state where streams are empty
    bw_video?: number; // Optional for the second state where streams are empty
    clients: Client[];
    records: unknown[]; // Assuming records are an array of unknown type
    meta: Meta;
    nclients: number;
    publishing: boolean;
    active: boolean;
  }

  interface Client {
    id: number;
    address: string;
    time: number;
    flashver: string;
    dropped: number;
    avsync: number;
    timestamp: number;
    publishing: boolean;
    active: boolean;
  }

  interface Meta {
    video: Video;
    audio: Audio;
  }

  interface Video {
    width: number;
    height: number;
    frame_rate: number;
    codec: string;
    profile: string;
    level: number;
  }

  interface Audio {
    codec: string;
    profile: string;
    channels: number;
    sample_rate: number;
  }

  interface Recorders {
    count: number;
    lists: RecorderList[];
  }

  interface RecorderList {
    id: string;
    flags: string[];
    unique: boolean;
    append: boolean;
    lock_file: boolean;
    notify: boolean;
    path: string;
    max_size: number;
    max_frames: number;
    interval: number;
    suffix: string;
  }
}
