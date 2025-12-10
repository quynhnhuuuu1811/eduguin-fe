import instance from "@/lib/httpService";

export class ChatApi {
  static getHistoryChat(): Promise<any> {
    return instance.get("/chat-messages");
  }
}
