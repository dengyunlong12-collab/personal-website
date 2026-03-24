import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useCallback, useEffect } from 'react'
import * as api from '../../lib/api'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const addImage = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !editor) return

      try {
        const url = await api.uploadImage(file)
        editor.chain().focus().setImage({ src: url }).run()
      } catch {
        // Fallback: use base64 data URL if upload fails
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result as string
          editor.chain().focus().setImage({ src: dataUrl }).run()
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }, [editor])

  const addImageByUrl = useCallback(() => {
    if (!editor) return
    const url = window.prompt('输入图片链接:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50/50 rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
          editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="加粗"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-lg text-xs italic font-medium transition-colors ${
          editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="斜体"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-lg text-xs line-through font-medium transition-colors ${
          editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="删除线"
      >
        S
      </button>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="标题"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="小标题"
      >
        H3
      </button>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="无序列表"
      >
        • 列表
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
          editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="有序列表"
      >
        1. 列表
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
          editor.isActive('blockquote') ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="引用"
      >
        引用
      </button>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={addImage}
        className="p-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
        title="上传图片"
      >
        📷 上传图片
      </button>
      <button
        type="button"
        onClick={addImageByUrl}
        className="p-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
        title="图片链接"
      >
        🔗 图片链接
      </button>
    </div>
  )
}

export default function RichTextEditor({ content, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-4',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none px-4 py-3 min-h-[200px] focus:outline-none',
      },
      handleDrop: (_view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0]
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            handleDropImage(file)
            return true
          }
        }
        return false
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items
        if (items) {
          for (const item of items) {
            if (item.type.startsWith('image/')) {
              event.preventDefault()
              const file = item.getAsFile()
              if (file) handleDropImage(file)
              return true
            }
          }
        }
        return false
      },
    },
  })

  const handleDropImage = useCallback(async (file: File) => {
    if (!editor) return
    try {
      const url = await api.uploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        editor.chain().focus().setImage({ src: dataUrl }).run()
      }
      reader.readAsDataURL(file)
    }
  }, [editor])

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <div className="relative">
        <EditorContent editor={editor} />
        {editor && editor.isEmpty && placeholder && (
          <p className="absolute top-3 left-4 text-sm text-gray-400 pointer-events-none">
            {placeholder}
          </p>
        )}
      </div>
    </div>
  )
}
