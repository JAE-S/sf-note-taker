// Application note props
export interface NoteProps {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

// API expects the body to be stringified
export interface ApiNoteProps {
  id: number;
  body:
    | string
    | {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      }; // This is JSON.stringify(InternalNoteProps['body'])
}
