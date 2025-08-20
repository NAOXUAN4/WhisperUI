import { type Ref, onMounted, onUnmounted } from 'vue';

export default function useClickOutside(elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent)=> void){
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) { /// e：mouseEvent 触发位置不是 elementRef 的子元素， 触发callback()
      if(!elementRef.value.contains(e.target as HTMLElement)){
        callback(e);
        // console.log('handle');

      }
    }
  };

  onMounted(()=>{
    document.addEventListener('click', handler);
  });
  onUnmounted(()=>{
    document.removeEventListener('click', handler);
  });

}
