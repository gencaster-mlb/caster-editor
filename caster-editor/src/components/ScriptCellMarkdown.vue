<template>
  <div class="block block-markdown">
    <div
      :class="{
        'editor-comment': cellType === CellType.Comment,
        'editor-markdown': cellType === CellType.Markdown
      }"
    >
      <div ref="editorDom" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Docs : https://github.com/nhn/tui.editor/tree/master/docs/en
// Custom Markdown Commands: https://github.com/nhn/tui.editor/blob/master/docs/en/plugin.md
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import Editor from "@toast-ui/editor";
import type { EditorOptions, Editor as EditorType } from "@toast-ui/editor";
import { storeToRefs } from "pinia";
import { CellType } from "@/graphql";
import { computed, onMounted, onUnmounted, ref, type Ref } from "vue";
import { useInterfaceStore } from "@/stores/InterfaceStore";


const props = defineProps<{
    text: string,
    cellType: CellType.Markdown | CellType.Comment
}>();

const emit = defineEmits<{
  (e: 'update:text', text: string): void
}>();

// Store
const { scriptCellsModified } = storeToRefs(useInterfaceStore());

// Variables
const editorDom: Ref<HTMLElement | undefined> = ref();
const editor: Ref<EditorType | undefined> = ref();

const scriptCellText = computed<string>({
  get() {
      return props.text;
  },
  set(value) {
      emit('update:text', value);
      return value;
  }
});

onMounted(() => {
const options: EditorOptions = {
    el: editorDom.value as HTMLElement,
    height: "auto",
    initialEditType: "markdown",
    usageStatistics: false,
    initialValue: props.text,
    previewStyle: "tab",
    toolbarItems: [],
    hideModeSwitch: true,
    autofocus: false,
};

editor.value = new Editor(options);

// add events
editor.value.on("change", () => {
    scriptCellsModified.value = true;
    scriptCellText.value = editor.value?.getMarkdown() || "";
});
});

onUnmounted(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});

</script>