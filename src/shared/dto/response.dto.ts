export class ResponseDto<T> {
  statusCode: number;
  data: T;

  constructor(data: { statusCode: number; data: T }) {
    this.statusCode = data.statusCode;
    this.data = data.data;
  }
}
