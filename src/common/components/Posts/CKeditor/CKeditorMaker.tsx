import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Compressor from 'compressorjs';
import DOMPurify from 'dompurify';

import '../../../../style/CKeditor/ckeditorwriter.css';
import '../../../../style/CKeditor/ckeditorbase.css';
import { toast } from 'react-toastify';

type TcKeditorMaker = {
  maxLength: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CKeditorMaker({
  maxLength,
  text,
  setText,
}: TcKeditorMaker): JSX.Element {
  function uploadAdapter(loader: any) {
    return {
      upload: async () => {
        try {
          const file = await loader.file;
          let result: File | Blob | undefined;
          await new Promise((resolve, reject) => {
            /* eslint-disable no-new */
            new Compressor(file, {
              convertTypes: ['image/png'],
              quality: 0.8,
              maxWidth: 400,
              maxHeight: 400,
              success: (compressedResult) => {
                resolve((result = compressedResult));
              },
              error: (e) => {
                reject(e);
              },
            });
          });

          return new Promise((resolve, reject) => {
            if (result !== undefined) {
              const reader = new FileReader();
              reader.readAsDataURL(result);

              reader.onloadend = () => {
                resolve({ default: reader.result });
              };
            } else {
              reject(Error('Failed to process your image'));
            }
          });
        } catch (error: any) {
          toast.error(error?.message);
          return { default: '' };
        }
      },
    };
  }

  function uploadPlugin(editor: any) {
    /* eslint-disable no-param-reassign */
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  const editorConfiguration = {
    extraPlugins: [uploadPlugin],
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={text}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();

        if (data.length >= maxLength) {
          editor.setData(DOMPurify.sanitize(text));
        } else {
          setText(DOMPurify.sanitize(data));
        }
      }}
    />
  );
}
