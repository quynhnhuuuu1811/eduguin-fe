"use client";

import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode, $createHeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  EditorState,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { IconButton, Tooltip, Divider } from "@mui/material";

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-2xl font-bold mb-4",
    h2: "text-xl font-bold mb-3",
    h3: "text-lg font-bold mb-2",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  list: {
    ul: "list-disc ml-6 mb-2",
    ol: "list-decimal ml-6 mb-2",
    listitem: "mb-1",
  },
  quote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2",
};

function onError(error: Error) {
  console.error(error);
}

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  };

  const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const insertBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const undo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-xl">
      <Tooltip title="Undo">
        <IconButton size="small" onClick={undo}>
          <UndoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo">
        <IconButton size="small" onClick={redo}>
          <RedoIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <Tooltip title="Bold (Ctrl+B)">
        <IconButton size="small" onClick={formatBold}>
          <FormatBoldIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic (Ctrl+I)">
        <IconButton size="small" onClick={formatItalic}>
          <FormatItalicIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline (Ctrl+U)">
        <IconButton size="small" onClick={formatUnderline}>
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <Tooltip title="Normal text">
        <IconButton
          size="small"
          onClick={formatParagraph}
          sx={{ fontSize: "12px", fontWeight: "bold", minWidth: "32px" }}
        >
          P
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 1">
        <IconButton
          size="small"
          onClick={() => formatHeading("h1")}
          sx={{ fontSize: "12px", fontWeight: "bold", minWidth: "32px" }}
        >
          H1
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 2">
        <IconButton
          size="small"
          onClick={() => formatHeading("h2")}
          sx={{ fontSize: "12px", fontWeight: "bold", minWidth: "32px" }}
        >
          H2
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 3">
        <IconButton
          size="small"
          onClick={() => formatHeading("h3")}
          sx={{ fontSize: "12px", fontWeight: "bold", minWidth: "32px" }}
        >
          H3
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <Tooltip title="Bullet List">
        <IconButton size="small" onClick={insertBulletList}>
          <FormatListBulletedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered List">
        <IconButton size="small" onClick={insertNumberedList}>
          <FormatListNumberedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

interface LexicalEditorProps {
  onChange: (html: string) => void;
  placeholder?: string;
}

const LexicalEditor: React.FC<LexicalEditorProps> = ({ onChange, placeholder }) => {
  const initialConfig = {
    namespace: "BlogEditor",
    theme,
    onError,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      onChange(textContent);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <ToolbarPlugin />
        <div className="relative min-h-[200px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[200px] p-4 outline-none font-quicksand text-gray-800"
              />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none font-quicksand">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleChange} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
