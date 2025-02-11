// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useStyles from "./styles.js";

// ** Third Party Imports
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Dynamically importing "react-draft-wysiwyg" package
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function ReactDraft(props) {
  const { classes } = useStyles();

  const [editorState, setEditorState] = useState(undefined);

  useEffect(() => {
    if (props.value.length > 1 && editorState === undefined) {
      const content = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.value))
      );

      setEditorState(content);
    }
  }, [props.value]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    if (props.onChange) {
      return props.onChange(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName={classes.wrapper}
      toolbarClassName={classes.toolbar}
      onEditorStateChange={onEditorStateChange}
      placeholder={props.placeholder}
    />
  );
}
