import { create } from "zustand";

import { ChatApi } from "../api/ChatApi";

interface ChatState {
  chatData: any;
  loading: boolean;
  error: string | null;
  getHistoryChat: () => Promise<void>;
  clearError: () => void;
}

const getInitialState = (): Pick<
  ChatState,
  "chatData" | "loading" | "error"
> => {
  return {
    chatData: null,
    loading: false,
    error: null,
  };
};

export const useChatStore = create<ChatState>((set) => ({
  ...getInitialState(),

  async getHistoryChat() {
    set({ loading: true, error: null });
    try {
      const res = await ChatApi.getHistoryChat();
      const chatData = res.data?.data || null;
      set({ chatData, loading: false });
    } catch (error: any) {
      set({
        error:
          error.message || "An error occurred while fetching chat history.",
      });
    }
  },
  clearError() {
    set({ error: null });
  },
}));
