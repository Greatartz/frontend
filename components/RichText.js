import parse from "html-react-parser";
import mark from "markdown-it";
export default function RichText({ doc }) {
  let md = new mark({
    html: true,
    typographer: true,
    linkify: true,
    breaks: true,
  });
  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    let token = tokens[idx];
    token.attrPush(["id", "content_image"]);
    token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(
      token.children,
      options,
      env
    );

    return slf.renderToken(tokens, idx, options);
  };
  let result = md.render(doc);
  return <>{parse(result)}</>;
}
