import { GrpcMessageEvent } from "@/proto/bundle.js";

export const decodeProtobuf = (buffer) => {
  console.log(buffer)
  console.log(GrpcMessageEvent)
  let decoded = GrpcMessageEvent.decode(buffer);
  console.log(decoded)
  return decoded
}