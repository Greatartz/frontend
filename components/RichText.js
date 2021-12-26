import React from "react";
import ReactMarkdown from "react-markdown";

export default function RichText({ doc }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a className="text-blue-500" target="_blank" {...props} />
        ),
      }}
    >
      {doc}
    </ReactMarkdown>
  );
}
