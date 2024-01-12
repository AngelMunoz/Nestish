import { StreamableFile } from "@nestjs/common";
import { ArrayBufferSink } from "bun";

export async function fromStreamableFileToText(file: StreamableFile) {
  const decoder = new TextDecoder();
  const sink = new ArrayBufferSink();

  sink.start({
    asUint8Array: true,
  });

  for await (const chunk of file.getStream()) {
    sink.write(chunk);
  }
  const content = sink.end();
  const textified = decoder.decode(content);
  return textified;
}
