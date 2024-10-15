import { DirResponse } from "./DirResponse";

export default interface ErrorResponse extends DirResponse {
  stack?: string;
}
