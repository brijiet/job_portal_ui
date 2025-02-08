import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

const MceEditor = ({ initialValue, setInitialValue, fieldName }: any) => {
  return (
    <>
      <Editor
        apiKey="p0d57y2los4xnqtmow1mbep7hui3q7dctvms5ahjp0httmr4"
        value={initialValue || ''}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "wordcount",
          ],
          toolbar:
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | "

        }}

        onEditorChange={(e) => {
          setInitialValue(fieldName, e);
        }}
      />
    </>
  )
}

export default MceEditor