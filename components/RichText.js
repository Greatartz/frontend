import parse from "html-react-parser";
import mark from "markdown-it";
import { API_URL } from "../config/index";
export default function RichText({ doc }) {
  let md = new mark();
  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    let token = tokens[idx];
    //should be comment for production
    token.attrSet("src", `${API_URL}${token.attrGet("src")}`);
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
