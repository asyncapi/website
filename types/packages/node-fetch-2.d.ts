declare module 'node-fetch-2' {
  export default function fetch(url: string, options?: RequestInit): Promise<Response>;
}
