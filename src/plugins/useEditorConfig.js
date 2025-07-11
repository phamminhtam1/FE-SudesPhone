// composables/useEditorConfig.js
import { computed } from 'vue'
import { useCKEditorCloud } from '@ckeditor/ckeditor5-vue'

export function useEditorConfig() {
  const cloud = useCKEditorCloud({
    version: '45.2.0',
    premium: true,
  })

  const editor = computed(() => cloud.data.value?.CKEditor.ClassicEditor || null)

  const config = computed(() => {
    if (!cloud.data.value) return null

    const { Essentials, Paragraph, Bold, Italic, Underline, Alignment, List, Heading } =
      cloud.data.value.CKEditor

    return {
      licenseKey:
        'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODE5MTM1OTksImp0aSI6ImRhMzk5NTdmLTVmYzItNGNhYS04YmVhLTQwNzQ2OGEyODEzZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkUyUCIsIkUyVyJdLCJ2YyI6ImU0NWI4ZDdkIn0.kjIlog13mMDc2OoDKmuQi8UGF2hVaKggVxC_utjiO0eVfVqgYIjeP7PeEO9-7nScpn-rtLAUN64aY33kc7OzSw',
      plugins: [Essentials, Paragraph, Bold, Italic, Underline, Alignment, List, Heading],
      toolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        'bold',
        'italic',
        'underline',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        '|',
      ],
    }
  })

  return { editor, config }
}
