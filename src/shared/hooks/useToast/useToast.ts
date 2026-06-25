import { useToastStore } from '@shared/store';

/** Toast 노출 단일 진입점. `const show = useToast(); show({ message, variant });` */
const useToast = () => useToastStore((state) => state.show);

export default useToast;
