<template>
  <div class="block block-codemirror">
    <div
      :class="{
        'editor-supercollider': cellType === CellType.Supercollider,
        'editor-python': cellType === CellType.Python,
      }"
    >
      <!-- :disable="dragging" -->
      <Codemirror
        v-model="scriptText"
        placeholder="Code goes here..."
        :autofocus="false"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="[python()]"
        @ready="
          () => {
            domReady = true;
          }
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";
import { CellType } from "@/graphql";
import { useInterfaceStore } from "@/stores/InterfaceStore";

const props = defineProps<{
  text: string;
  cellType: CellType.Python | CellType.Supercollider;
  uuid: string;
}>();

const emit = defineEmits<{
  (e: "update:text", text: string): void;
}>();

const { newScriptCellUpdates } = storeToRefs(useInterfaceStore());

const domReady: Ref<boolean> = ref(false);

const scriptText = computed<string>({
  get() {
    return props.text;
  },
  set(value) {
    emit("update:text", value);

    let update = newScriptCellUpdates.value.get(props.uuid);

    if (update) {
      update.cellCode = value;
    } else {
      newScriptCellUpdates.value.set(props.uuid, {
        uuid: props.uuid,
        cellCode: value,
      });
    }
    return value;
  },
});
</script>
