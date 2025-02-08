import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ messagingState, setMessagingState, errors, watchMessaging }: any) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={messagingState}
        onChange={(event, editor) => {
          const data = editor.getData();
          setMessagingState(data);
        }}
        config={{
          removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", 'ImageInsert', 'ImageUpload', "List", "Indent", "BlockQuote", "Table", "TableToolbar"]
        }}
      />
      {errors.messaging &&
        <p className="font-normal text-xs text-red-500 absolute mb-4">
          {errors.messaging.message}
        </p>}
      <div className="text-xs font-light text-gray-600 text-right flex justify-between items-center">
        {!errors.messaging ? <span>{watchMessaging ? 1000 - watchMessaging : 1000} character(s) left</span> : <span></span>}

      </div>
    </>
  )
}

export default Editor