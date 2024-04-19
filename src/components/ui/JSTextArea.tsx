import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", javascript);

interface JSTextAreaProps {
  disabled: boolean;
  typeHandler?: (code: string) => void;
  observerHandler?: (code: string) => string;
}

export const JSTextArea: React.FC<JSTextAreaProps> = ({
  disabled,
  typeHandler,
  observerHandler,
}) => {
  const [code, setCode] = useState<string>("");

  //handle the change of the text area
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
    typeHandler && typeHandler(event.target.value);
  };

  const highlightedCode = hljs.highlightAuto(code, ["javascript"]).value;

  //get the code from the socket when observerHandler is updated
  useEffect(() => {
    observerHandler && setCode(observerHandler);
  }, [observerHandler]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "500px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
        fontFamily: "monospace",
        bgcolor: "#f6f8fa",
      }}
    >
      <textarea
        value={code}
        disabled={disabled}
        onChange={handleChange}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          color: "transparent",
          caretColor: "black",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          padding: "10px",
          fontFamily: "monospace",
          lineHeight: "1.5",
        }}
      />
      <pre
        style={{
          whiteSpace: "pre-wrap",
          overflowY: "scroll",
          margin: 0,
          padding: "10px",
          height: "100%",
          pointerEvents: "none",
        }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Box>
  );
};
