
import { onBeforeUnmount, onMounted, type Ref, isRef, watch} from "vue";

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => void
) {

  if(isRef(target)){
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  }
  else{
    onMounted(() => {
      target.addEventListener(event, handler);
    });

    onBeforeUnmount(()=>{
      target.removeEventListener(event, handler);
    });
  }

}
